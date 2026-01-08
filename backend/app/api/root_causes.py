from fastapi import APIRouter
from app.services.openai_service import generate_root_causes
from app.state import GLOBAL_ROOT_CAUSES

router = APIRouter()

@router.post("/root-causes")
def root_causes_endpoint(returns: list[dict]):
    global GLOBAL_ROOT_CAUSES

    root_causes = generate_root_causes(returns)
    GLOBAL_ROOT_CAUSES = root_causes

    return root_causes
