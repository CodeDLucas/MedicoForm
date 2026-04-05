from pydantic import BaseModel, Field
from typing import List

class MedicalInput(BaseModel):
    queixa_principal: str = Field(..., description="Relato do paciente sobre o motivo da consulta")
    hipotese_diagnostica: str = Field("", description="Hipótese diagnóstica inicial do médico")
    conduta: str = Field("", description="Conduta, exames ou medicamentos prescritos")

class MedicalAnalysis(BaseModel):
    resumo_clinico: str = Field(..., description="Resumo profissional em terceira pessoa do atendimento")
    diagnosticos: List[str] = Field(..., description="Lista de possíveis diagnósticos identificados")
    condutas: List[str] = Field(..., description="Lista de condutas, tratamentos ou orientações mencionadas")
