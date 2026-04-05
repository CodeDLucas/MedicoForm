# MedicoForm AI - Desafio Técnico

Solução inteligente para estruturação de prontuários médicos utilizando IA (Google Gemini Pro).

## 🚀 Como Executar (Rápido)

A maneira mais fácil de rodar o projeto completo é usando o script de orquestração:

1.  **Chave de API:** Renomeie `backend/.env.example` para `backend/.env` e insira sua [Gemini API Key](https://aistudio.google.com/app/apikey).
2.  **Comando Único:** Na raiz do projeto, execute:
    ```bash
    python run.py
    ```
    *Este comando instalará as dependências (Python e Node.js) e iniciará os dois servidores simultaneamente.*

---

## 🛠️ Execução Manual (Passo a Passo)

### 1. Pré-requisitos
- Python 3.10+
- Node.js 18+

### 2. Configuração do Backend
1. Navegue até a pasta `backend`: `cd backend`
2. Instale as dependências: `pip install -r requirements.txt`
3. Configure sua chave de API no arquivo `.env`.
4. Inicie o servidor: `python main.py` (Disponível em: `http://localhost:8000`)

### 3. Configuração do Frontend
1. Navegue até a pasta `frontend`: `cd frontend`
2. Instale as dependências: `npm install`
3. Inicie o servidor: `npm run dev` (Disponível em: `http://localhost:5173`)

---

## 🧠 Estratégia de IA
A solução utiliza **Prompt Engineering** estruturado para garantir que o modelo `gemini-1.5-flash` retorne dados clínicos precisos em formato JSON. O prompt define um papel (*Role-playing*) de assistente médico e impõe um esquema de saída rigoroso, validado pelo **Pydantic** no backend.

## ✨ Diferenciais de Inovação
- **UX Clínica:** Interface limpa e minimalista simulando um prontuário eletrônico real.
- **Estruturação de Dados:** Conversão de texto livre em JSON estruturado para futura indexação e busca.
- **Resumo Profissional:** Geração automática de resumo clínico em terceira pessoa.
- **Orquestração:** Script `run.py` para facilitar o setup e execução em qualquer ambiente.
