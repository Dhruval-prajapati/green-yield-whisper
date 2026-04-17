# AgroSmart ML

Real machine-learning pipeline for crop yield prediction.

## What's here

- `train.py` — Generates an 8,000-row synthetic agronomy dataset (temperature, rainfall, humidity, soil, crop) and trains a `RandomForestClassifier` (scikit-learn) to predict yield class (Low / Moderate / Good / Excellent).
- `predict.py` — Standalone Python CLI for offline predictions using the saved model.
- `requirements.txt` — Python dependencies.
- `model.joblib` — Trained model (created by `train.py`).
- `../src/server/model.json` — Same model exported as JSON trees, used by the web app for in-browser inference (no Python at runtime).

## Run

```bash
cd ml
pip install -r requirements.txt
python train.py
```

Expected: ~56% test accuracy on a 4-class problem (random baseline is 25%).

```bash
python predict.py --temp 28 --rain 180 --humidity 75 --soil Alluvial --crop Rice
```

## How the web app uses the model

`train.py` writes the trained forest to `src/server/model.json`. The TanStack server function `src/server/predict.ts` loads that JSON and runs the same RandomForest voting logic in TypeScript — so predictions in the browser come from the trained ML model, not hand-written rules.

To retrain: edit `train.py`, run it, the JSON updates, the web app picks it up on next build.
