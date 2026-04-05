import asyncio
from schemas.medical import MedicalInput
from services.ai_service import AIService

async def test_extraction():
    service = AIService()
    
    # Exemplo do desafio
    test_input = MedicalInput(
        queixa_principal="Paciente relata dor de cabeça intensa há três dias, associada à sensibilidade à luz. Nega febre.",
        hipotese_diagnostica="Possui histórico de enxaqueca.",
        conduta="Foi orientado repouso, hidratação e prescrito analgésico."
    )
    
    print("\n--- Testando Extração de Dados ---")
    print(f"Entrada: {test_input.queixa_principal}")
    
    analysis = await service.analyze_medical_case(test_input)
    
    print("\nSAÍDA ESTRUTURADA (JSON):")
    print(analysis.model_dump_json(indent=2))
    
    assert analysis.resumo_clinico != ""
    assert len(analysis.diagnosticos) > 0
    assert len(analysis.condutas) > 0
    print("\nTeste concluído com sucesso!")

if __name__ == "__main__":
    asyncio.run(test_extraction())
