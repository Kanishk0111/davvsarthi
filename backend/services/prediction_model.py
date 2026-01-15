import pandas as pd
import joblib
import os

MODEL_PATH = os.path.join("ml", "trained_model.pkl")

model = joblib.load(MODEL_PATH)

def predict_admission(year, course, category, rank):
    input_df = pd.DataFrame([[
        year, course, category, rank
    ]], columns=["year", "course", "category", "student_rank"])

    prob = model.predict_proba(input_df)[0][1]
    prob = float(round(prob * 100, 2))

    if prob >= 70:
        chance = "High"
    elif prob >= 40:
        chance = "Medium"
    else:
        chance = "Low"

    return {
        "probability": prob,
        "chance": chance,
        "admission_possible": bool(prob >= 50)
    }