import joblib
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.linear_model import LogisticRegression
from data_generator import generate_dataset

def train_and_save_model():
    df = generate_dataset()

    X = df[["year", "course", "category", "student_rank"]]
    y = df["admitted"]

    preprocess = ColumnTransformer([
        ("cat", OneHotEncoder(handle_unknown="ignore"), ["course", "category"]),
        ("num", "passthrough", ["year", "student_rank"])
    ])

    model = Pipeline([
        ("prep", preprocess),
        ("clf", LogisticRegression(max_iter=2000))
    ])

    model.fit(X, y)

    joblib.dump(model, "trained_model.pkl")
    print("Model trained and saved as trained_model.pkl")
    return model