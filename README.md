# MedicoForm AI


Solução inteligente para estruturação de prontuários médicos utilizando IA.

Através de **Prompt Engineering** o programa é estruturado para garantir que um modelo de LLM (nesse caso foi usado o modelo `gemini-2.5-flash`) retorne dados clínicos precisos em formato JSON. O prompt define um papel de assistente médico e impõe um esquema de saída rigoroso, validado pelo **Pydantic** no backend.

## Como Executar

Após baixar/clonar o projeto são necessários apenas dois passos

1. **Configuração da Chave de API:** Renomeie `backend/.env.example` para `backend/.env` e insira sua API Key, no caso desse projeto foi utilizado uma API do Gemini [você pode obter uma gratuitamente clicando aqui](https://aistudio.google.com/app/apikey).

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