from fastapi import APIRouter
from typing import Dict, Any
import json
from collections import Counter

from app.api.analyze import GLOBAL_ANALYSIS

router = APIRouter()

@router.post("/root_causes")
def get_root_causes() -> Dict[str, Any]:
    """
    Return derived root causes using:
    - Azure OpenAI dominant reasons
    - Azure AI Language key phrases & sentiment
    """

    if not GLOBAL_ANALYSIS:
        return {"root_causes": []}

    # ---------- Parse analysis summary ----------
    raw_summary = GLOBAL_ANALYSIS.get("analysis_summary")
    summary = {}

    if isinstance(raw_summary, str):
        try:
            cleaned = raw_summary.replace("```json", "").replace("```", "").strip()
            summary = json.loads(cleaned)
        except Exception as e:
            print("Failed to parse analysis_summary:", e)
            summary = {}
    elif isinstance(raw_summary, dict):
        summary = raw_summary

    dominant_reasons = summary.get("dominant_reasons", [])

    # ---------- Language signals ----------
    language_signals = GLOBAL_ANALYSIS.get("language_signals", {})
    key_phrases = language_signals.get("key_phrases", [])
    sentiments = language_signals.get("sentiments", [])

    # Sentiment distribution (simple confidence signal)
    sentiment_counts = Counter(s["sentiment"] for s in sentiments)
    total_sentiments = sum(sentiment_counts.values()) or 1

    # ---------- Build root causes ----------
    root_causes = []

    for idx, reason in enumerate(dominant_reasons):
        related_phrases = [
            p for p in key_phrases
            if any(word.lower() in p.lower() for word in reason.split())
        ]

        root_causes.append({
            "reason": reason,
            "confidence": "high",
            "status": "open",

            # 🔥 REAL EXPLAINABILITY DATA
            "evidence": related_phrases[:5],
            "sentiment_breakdown": {
                "negative": sentiment_counts.get("negative", 0) / total_sentiments,
                "neutral": sentiment_counts.get("neutral", 0) / total_sentiments,
                "positive": sentiment_counts.get("positive", 0) / total_sentiments,
            }
        })

    return {"root_causes": root_causes}
