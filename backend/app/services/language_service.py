from azure.ai.textanalytics import TextAnalyticsClient
from azure.core.credentials import AzureKeyCredential
from app.core.config import AZURE_LANGUAGE_KEY, AZURE_LANGUAGE_ENDPOINT


def extract_language_signals(texts: list[str]) -> dict:
    """
    Uses Azure AI Language to extract key phrases and sentiment.
    """

    client = TextAnalyticsClient(
        endpoint=AZURE_LANGUAGE_ENDPOINT,
        credential=AzureKeyCredential(AZURE_LANGUAGE_KEY)
    )

    response = client.analyze_sentiment(texts, show_opinion_mining=False)

    sentiments = []
    for doc in response:
        if not doc.is_error:
            sentiments.append({
                "sentiment": doc.sentiment,
                "confidence": doc.confidence_scores
            })

    key_phrases = client.extract_key_phrases(texts)
    phrases = []
    for doc in key_phrases:
        if not doc.is_error:
            phrases.extend(doc.key_phrases)

    return {
        "sentiments": sentiments,
        "key_phrases": list(set(phrases))
    }
