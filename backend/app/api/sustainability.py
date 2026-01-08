from fastapi import APIRouter

router = APIRouter(prefix="/sustainability", tags=["Sustainability"])


@router.get("/")
def sustainability_metrics(returns_avoided: int = 800):
    return {
        "returns_avoided": returns_avoided,
        "waste_reduced_kg": returns_avoided * 3,
        "carbon_saved_kg": returns_avoided * 5,
        "shipments_avoided": returns_avoided * 2
    }
