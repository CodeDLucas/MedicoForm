from pydantic import BaseModel, Field
from typing import List

class MedicalInput(BaseModel):
    relato_clinico: str = Field(..., description="Texto livre com a narração da consulta pelo médico")

class MedicalAnalysis(BaseModel):
    resumo_clinico: str = Field(..., description="Resumo profissional em terceira pessoa do atendimento")
    diagnosticos_identificados: List[str] = Field(..., description="Diagnósticos ou hipóteses explicitamente citados")
    sugestoes_ia: List[str] = Field(..., description="Sugestões de diagnósticos diferenciais baseados no relato")
    condutas_identificadas: List[str] = Field(..., description="Condutas e tratamentos explicitamente citados")
    sugestoes_conduta: List[str] = Field(..., description="Sugestões de exames ou condutas complementares sugeridas pela IA")
