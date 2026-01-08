import pandas as pd

def load_returns_csv(file) -> pd.DataFrame:
    df = pd.read_csv(file)

    required_columns = ["sku", "category", "return_reason"]
    for col in required_columns:
        if col not in df.columns:
            raise ValueError(f"Missing required column: {col}")

    df = df.dropna(subset=["return_reason"])
    return df
