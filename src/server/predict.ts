import { createServerFn } from "@tanstack/react-start";
import model from "./model.json";

// ML inference - RandomForest trained in /ml/train.py (scikit-learn).
// We load the exported tree structure and run the same voting logic in TS.

interface Tree {
  feature: number[];
  threshold: number[];
  left: number[];
  right: number[];
  value: number[][]; // class counts at each node
}

interface ModelData {
  classes: string[];
  feature_names: string[];
  soils: string[];
  crops: string[];
  trees: Tree[];
  test_accuracy: number;
  n_estimators: number;
}

const M = model as unknown as ModelData;

// build feature vector matching training order: [temp, rain, humidity, soil_oh..., crop_oh...]
function buildFeatures(temp: number, rain: number, humidity: number, soil: string, crop: string): number[] {
  const feats = [temp, rain, humidity];
  for (const s of M.soils) feats.push(s === soil ? 1 : 0);
  for (const c of M.crops) feats.push(c === crop ? 1 : 0);
  return feats;
}

// walk one decision tree to a leaf
function treePredict(tree: Tree, x: number[]): number[] {
  let node = 0;
  while (tree.feature[node] !== -2) {
    if (x[tree.feature[node]] <= tree.threshold[node]) {
      node = tree.left[node];
    } else {
      node = tree.right[node];
    }
  }
  return tree.value[node];
}

// majority vote across all trees in the forest -> class probabilities
function forestPredict(x: number[]): number[] {
  const k = M.classes.length;
  const probs = new Array(k).fill(0);
  for (const tree of M.trees) {
    const counts = treePredict(tree, x);
    const total = counts.reduce((a, b) => a + b, 0) || 1;
    for (let i = 0; i < k; i++) probs[i] += counts[i] / total;
  }
  return probs.map((p) => p / M.trees.length);
}

export const predictCrop = createServerFn({ method: "POST" })
  .inputValidator((input: { temp: number; rain: number; humidity: number; soil: string; crop: string }) => input)
  .handler(async ({ data }) => {
    const { temp, rain, humidity, soil, crop } = data;
    const x = buildFeatures(temp, rain, humidity, soil, crop);
    const probs = forestPredict(x);

    // pick best class
    let bestIdx = 0;
    for (let i = 1; i < probs.length; i++) if (probs[i] > probs[bestIdx]) bestIdx = i;
    const level = M.classes[bestIdx];
    const confidence = probs[bestIdx];
    // simple 0-100 score = weighted avg of class index (0..3)
    const score = Math.round((probs[1] * 33 + probs[2] * 66 + probs[3] * 100));

    let msg: string;
    if (level === "Excellent") msg = `High yield expected for ${crop}. Conditions look great!`;
    else if (level === "Good") msg = `Good conditions for ${crop}. Minor tweaks could help.`;
    else if (level === "Moderate") msg = `Moderate risk for ${crop}. Consider irrigation and soil amendments.`;
    else msg = `Tough conditions for ${crop}. Maybe try a different crop or add protective measures.`;

    return {
      score,
      level,
      msg,
      confidence: Math.round(confidence * 100),
      probabilities: M.classes.map((c, i) => ({ label: c, value: Math.round(probs[i] * 100) })),
      modelInfo: {
        type: "RandomForest",
        trees: M.n_estimators,
        accuracy: Math.round(M.test_accuracy * 100),
      },
    };
  });
