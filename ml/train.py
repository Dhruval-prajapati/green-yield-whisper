"""
AgroSmart crop yield ML training (RandomForest).
Generates synthetic agronomy-informed dataset, trains a RandomForestClassifier,
and exports both a joblib model and a JSON tree representation for in-browser
inference (no Python required at runtime).

Run:
    pip install -r requirements.txt
    python train.py

Outputs:
    model.joblib            - full Python model (for Python inference / retraining)
    ../src/server/model.json - tree dump shipped with the web app
"""
import json, os, numpy as np, pandas as pd, joblib
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report

rng = np.random.default_rng(42)

SOILS = ["Alluvial", "Black (Regur)", "Red", "Loamy", "Sandy", "Clay", "Laterite"]
CROPS = ["Rice", "Wheat", "Sugarcane", "Maize", "Cotton", "Soybean",
         "Groundnut", "Mustard", "Tomato", "Onion"]

# soil-crop compatibility (agronomy-informed)
GOOD = {
    "Alluvial": {"Rice", "Wheat", "Sugarcane", "Maize"},
    "Black (Regur)": {"Cotton", "Soybean", "Sugarcane"},
    "Red": {"Groundnut", "Mustard", "Tomato"},
    "Loamy": {"Wheat", "Tomato", "Onion", "Maize"},
    "Sandy": {"Groundnut", "Mustard"},
    "Clay": {"Rice", "Sugarcane"},
    "Laterite": {"Rice", "Onion"},
}
# crop ideal (temp_c, rain_mm, humidity_%)
IDEAL = {
    "Rice":(28,200,80), "Wheat":(20,75,55), "Sugarcane":(28,180,75),
    "Maize":(25,110,60), "Cotton":(28,100,55), "Soybean":(26,130,65),
    "Groundnut":(28,80,55), "Mustard":(18,50,50), "Tomato":(24,90,65),
    "Onion":(22,80,60),
}

def synth_row():
    soil = rng.choice(SOILS)
    crop = rng.choice(CROPS)
    temp = float(rng.normal(25, 7))
    rain = float(max(0, rng.normal(120, 70)))
    hum  = float(np.clip(rng.normal(60, 18), 5, 100))
    t0, r0, h0 = IDEAL[crop]
    close = (np.exp(-((temp-t0)**2)/80)*0.4 +
             np.exp(-((rain-r0)**2)/6000)*0.35 +
             np.exp(-((hum-h0)**2)/400)*0.25)
    bonus = 0.15 if crop in GOOD.get(soil, set()) else -0.05
    score = float(np.clip(close + bonus + rng.normal(0, 0.05), 0, 1))
    if   score >= 0.75: y = 3   # Excellent
    elif score >= 0.55: y = 2   # Good
    elif score >= 0.35: y = 1   # Moderate
    else:               y = 0   # Low
    return temp, rain, hum, soil, crop, y

def main():
    N = 8000
    df = pd.DataFrame([synth_row() for _ in range(N)],
                      columns=["temp","rain","humidity","soil","crop","yield_class"])
    print(f"Dataset: {len(df)} rows")
    print(df["yield_class"].value_counts().sort_index().to_string())

    soil_idx = {s:i for i,s in enumerate(SOILS)}
    crop_idx = {c:i for i,c in enumerate(CROPS)}
    soil_oh = np.eye(len(SOILS))[df["soil"].map(soil_idx).values]
    crop_oh = np.eye(len(CROPS))[df["crop"].map(crop_idx).values]
    X = np.hstack([df[["temp","rain","humidity"]].values, soil_oh, crop_oh])
    y = df["yield_class"].values
    feat_names = ["temp","rain","humidity"] + [f"soil_{s}" for s in SOILS] + [f"crop_{c}" for c in CROPS]

    X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)
    clf = RandomForestClassifier(n_estimators=25, max_depth=8, random_state=42, n_jobs=-1).fit(X_tr, y_tr)
    acc = accuracy_score(y_te, clf.predict(X_te))
    print(f"\nTest accuracy: {acc:.3f}")
    print(classification_report(y_te, clf.predict(X_te),
          target_names=["Low","Moderate","Good","Excellent"]))

    here = os.path.dirname(os.path.abspath(__file__))
    joblib.dump(clf, os.path.join(here, "model.joblib"))

    def tree_to_dict(tree):
        t = tree.tree_
        return {
            "feature":   t.feature.tolist(),
            "threshold": t.threshold.tolist(),
            "left":      t.children_left.tolist(),
            "right":     t.children_right.tolist(),
            "value":     [v[0].tolist() for v in t.value],
        }

    out = {
        "model_type": "random_forest",
        "trained_on": int(N),
        "test_accuracy": float(acc),
        "classes": ["Low", "Moderate", "Good", "Excellent"],
        "feature_names": feat_names,
        "soils": SOILS,
        "crops": CROPS,
        "n_estimators": len(clf.estimators_),
        "trees": [tree_to_dict(est) for est in clf.estimators_],
    }
    web_path = os.path.normpath(os.path.join(here, "..", "src", "server", "model.json"))
    with open(web_path, "w") as f:
        json.dump(out, f)
    print(f"\nSaved model.joblib (Python)")
    print(f"Saved {web_path} (web app, {os.path.getsize(web_path)//1024} KB)")

if __name__ == "__main__":
    main()
