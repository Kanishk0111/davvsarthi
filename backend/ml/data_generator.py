import pandas as pd
from cutoff_data import cutoff_data

def generate_dataset():
    df_cutoff = pd.DataFrame(cutoff_data, columns=["year", "course", "category", "last_rank"])
    rows = []

    for _, r in df_cutoff.iterrows():
        cutoff = r.last_rank

        # Strong admitted
        for rank in range(1, max(1, cutoff - 50), 5):
            rows.append([r.year, r.course, r.category, rank, 1])

        # Borderline region
        for rank in range(cutoff - 50, cutoff + 50):
            admitted = 1 if rank <= cutoff else 0
            rows.append([r.year, r.course, r.category, rank, admitted])

        # Strong rejected
        for rank in range(cutoff + 50, cutoff + 400, 10):
            rows.append([r.year, r.course, r.category, rank, 0])

    df = pd.DataFrame(rows, columns=["year","course","category","student_rank","admitted"])
    print("Generated dataset size:", df.shape)
    return df
