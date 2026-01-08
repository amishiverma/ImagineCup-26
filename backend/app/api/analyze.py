from fastapi import APIRouter
from app.services.openai_service import analyze_returns
from app.services.language_service import extract_language_signals
from app.state import GLOBAL_ANALYSIS

router = APIRouter()

@router.post("/analyze")
def analyze_endpoint(returns: list[dict]):
    global GLOBAL_ANALYSIS

    # 1. Extract text fields
    texts = [
        r.get("reason", "")
        for r in returns
        if r.get("reason")
    ]

    # 2. Azure Language Service
    language_signals = extract_language_signals(texts)

    # 3. Azure OpenAI reasoning
    analysis = analyze_returns(returns)

    # 4. Store combined intelligence
    GLOBAL_ANALYSIS = {
        "analysis": analysis,
        "language_signals": language_signals,
    }

    return GLOBAL_ANALYSIS
