import os
import json
import google.generativeai as genai
from dotenv import load_dotenv
from schemas.medical import MedicalInput, MedicalAnalysis

load_dotenv()

# Configuração da Gemini API
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)

class AIService:
    def __init__(self):
        self.model = genai.GenerativeModel('gemini-1.5-flash')

    async def analyze_medical_case(self, data: MedicalInput) -> MedicalAnalysis:
        # Prompt Estruturado: Demonstra o raciocínio de prompt de forma objetiva
        prompt = f"""
        Você é um assistente de documentação médica altamente preciso. Sua tarefa é analisar as informações de uma consulta médica e gerar uma saída estruturada em JSON.

        DADOS DE ENTRADA:
        - Queixa Principal: {data.queixa_principal}
        - Hipótese Diagnóstica: {data.hipotese_diagnostica}
        - Conduta: {data.conduta}

        INSTRUÇÕES:
        1. Resumo Clínico: Crie um resumo profissional, em terceira pessoa, que sintetize o caso. Use linguagem clínica adequada.
        2. Diagnósticos: Liste todos os possíveis diagnósticos ou hipóteses citadas.
        3. Condutas: Liste separadamente cada tratamento, medicamento, exame ou orientação mencionada.

        REQUISITO DE SAÍDA:
        A resposta deve ser APENAS um objeto JSON válido, seguindo este formato:
        {{
            "resumo_clinico": "string",
            "diagnosticos": ["string"],
            "condutas": ["string"]
        }}
        """

        try:
            if not GEMINI_API_KEY:
                # Mock para caso a chave não esteja configurada no ambiente
                return self._get_mock_response(data)

            response = self.model.generate_content(prompt)
            # Limpa possíveis blocos de código markdown da resposta
            json_str = response.text.strip().replace("```json", "").replace("```", "")
            result = json.loads(json_str)
            return MedicalAnalysis(**result)
            
        except Exception as e:
            print(f"Erro na IA: {e}")
            return self._get_mock_response(data)

    def _get_mock_response(self, data: MedicalInput) -> MedicalAnalysis:
        """Fallback caso a API falhe ou a chave não exista."""
        return MedicalAnalysis(
            resumo_clinico=f"Paciente apresenta: {data.queixa_principal}. Hipótese: {data.hipotese_diagnostica}.",
            diagnosticos=[data.hipotese_diagnostica] if data.hipotese_diagnostica else ["Indeterminado"],
            condutas=[data.conduta] if data.conduta else ["Observação"]
        )
