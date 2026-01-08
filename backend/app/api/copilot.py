from fastapi import APIRouter
from pydantic import BaseModel
from app.services.openai_service import copilot_response
from app.state import GLOBAL_ANALYSIS, GLOBAL_ROOT_CAUSES

router = APIRouter()

class CopilotRequest(BaseModel):
    question: str

@router.post("/copilot")
def chat_with_copilot(req: CopilotRequest):
    context = {
        "analysis": GLOBAL_ANALYSIS,
        "root_causes": GLOBAL_ROOT_CAUSES,
    }

    answer = copilot_response(req.question, context)
    return {"answer": answer}
