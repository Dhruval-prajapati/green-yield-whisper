"""
Standalone Python inference using the trained model.joblib.
Useful for scripts, batch processing, or hooking into a separate ML service.

Usage:
    python predict.py --temp 28 --rain 180 --humidity 75 --soil Alluvial --crop Rice
"""
import argparse, os, joblib, numpy as np

SOILS = ["Alluvial", "Black (Regur)", "Red", "Loamy", "Sandy", "Clay", "Laterite"]
CROPS = ["Rice", "Wheat", "Sugarcane", "Maize", "Cotton", "Soybean",
         "Groundnut", "Mustard", "Tomato", "Onion"]
LABELS = ["Low", "Moderate", "Good", "Excellent"]

def predict(temp, rain, humidity, soil, crop):
    here = os.path.dirname(os.path.abspath(__file__))
    clf = joblib.load(os.path.join(here, "model.joblib"))
    soil_oh = np.eye(len(SOILS))[SOILS.index(soil)]
    crop_oh = np.eye(len(CROPS))[CROPS.index(crop)]
    x = np.concatenate([[temp, rain, humidity], soil_oh, crop_oh]).reshape(1, -1)
    proba = clf.predict_proba(x)[0]
    cls = int(np.argmax(proba))
    return LABELS[cls], float(proba[cls]), {LABELS[i]: float(p) for i, p in enumerate(proba)}

if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--temp", type=float, required=True)
    ap.add_argument("--rain", type=float, required=True)
    ap.add_argument("--humidity", type=float, required=True)
    ap.add_argument("--soil", choices=SOILS, required=True)
    ap.add_argument("--crop", choices=CROPS, required=True)
    args = ap.parse_args()
    label, conf, all_p = predict(args.temp, args.rain, args.humidity, args.soil, args.crop)
    print(f"Prediction: {label}  (confidence {conf:.1%})")
    for k, v in all_p.items():
        print(f"  {k:10s} {v:.1%}")
