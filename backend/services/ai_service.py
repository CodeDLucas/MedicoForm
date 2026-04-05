import os
import json
import google.generativeai as genai
from pathlib import Path
from dotenv import load_dotenv
from schemas.medical import MedicalInput, MedicalAnalysis

# Caminho absoluto para garantir o carregamento no Windows
env_path = Path(r"C:\Users\LucasLD\Desktop\Nova pasta\Arquivos Lucas\Programacao\Projetos\MedicoForm\backend\.env")
load_dotenv(dotenv_path=env_path)

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

class AIService:
    def __init__(self):
        if not GEMINI_API_KEY or GEMINI_API_KEY == "sua_chave_aqui":
            raise ValueError(f"API Key não encontrada ou inválida no arquivo: {env_path}")
        
        genai.configure(api_key=GEMINI_API_KEY)
        self.model = genai.GenerativeModel('gemini-2.5-flash')

    async def analyze_medical_case(self, data: MedicalInput) -> MedicalAnalysis:
        prompt = f"""
        Você é um assistente médico de alto nível. Analise o relato clínico e retorne APENAS um JSON válido.
        
        RELATO: "{data.relato_clinico}"
        
        JSON esperado:
        {{
            "resumo_clinico": "resumo em 3a pessoa",
            "diagnosticos_identificados": ["list"],
            "sugestoes_ia": ["list"],
            "condutas_identificadas": ["list"],
            "sugestoes_conduta": ["list"]
        }}
        """

        text = "" 
        try:
            # Tenta gerar o conteúdo usando o modelo gemini-pro
            response = self.model.generate_content(prompt)
            text = response.text.strip()
            
            # Limpeza de markdown de forma resiliente
            clean_text = text
            if "```json" in text:
                clean_text = text.split("```json")[1].split("```")[0]
            elif "```" in text:
                clean_text = text.split("```")[1].split("```")[0]
            
            data_dict = json.loads(clean_text.strip())
            
            # Garantia de campos para o Pydantic
            fields = ["resumo_clinico", "diagnosticos_identificados", "sugestoes_ia", "condutas_identificadas", "sugestoes_conduta"]
            for field in fields:
                if field not in data_dict:
                    data_dict[field] = [] if "resumo" not in field else "Não informado"

            return MedicalAnalysis(**data_dict)
            
        except Exception as e:
            detail = f"Erro na API Gemini: {str(e)}"
            if text:
                detail += f" | Resposta: {text[:100]}"
            raise Exception(detail)
