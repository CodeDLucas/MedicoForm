# MedicoForm AI


MedicoForm AI

Uma solução inteligente e resiliente para a estruturação de prontuários médicos utilizando Inteligência Artificial Generativa.

O **MedicoForm AI** utiliza técnicas avançadas de **Prompt Engineering** e **Structured Outputs** para garantir que modelos de linguagem (LLM) — nesse caso, o `gemini-2.5-flash` — transformem descrições clínicas de texto livre em objetos JSON precisos. A solução conta com um papel de assistente especializado e um esquema de saída rigoroso, validado via **Pydantic** no backend para garantir integridade dos dados.

## Como Executar

O projeto foi desenhado para um setup simplificado. Após clonar o repositório, siga os passos abaixo:

1. **Configuração da Chave de API:** No diretório `backend/.env`, insira sua chave do Google Gemini. 
   > [Obtenha uma chave gratuita aqui](https://aistudio.google.com/app/apikey)

2.  **Iniciar o projeto** Na raiz do projeto, execute:

    ```
    python run.py
    ```

    *Este comando instalará as dependências (Python e Node.js) e iniciará os dois servidores simultaneamente.*


## Pré-requisitos

- Python 3.10+

- Node.js 18+

  

## ✨ Diferenciais de Inovação

- **UX Clínica:** Interface limpa e minimalista simulando um prontuário eletrônico real.

- **Estruturação de Dados:** Conversão de texto livre em JSON estruturado para futura indexação e busca.

- **Resumo Clínico:** Geração automática de resumo clínico em terceira pessoa.

- **Orquestração:** Script `run.py` para facilitar o setup e execução em qualquer ambiente.