from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from schemas.medical import MedicalInput, MedicalAnalysis
from services.ai_service import AIService

app = FastAPI(title="MedicoForm AI API")

# Habilitar CORS para o frontend (React)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

ai_service = AIService()

@app.get("/")
def read_root():
    return {"status": "online", "message": "MedicoForm AI API está funcionando!"}

@app.post("/analyze", response_model=MedicalAnalysis)
async def analyze(input_data: MedicalInput):
    """
    Recebe os dados brutos da consulta e retorna a análise estruturada por IA.
    """
    try:
        analysis = await ai_service.analyze_medical_case(input_data)
        return analysis
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
