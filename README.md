# MedicoForm AI - Desafio Técnico

Solução inteligente para estruturação de prontuários médicos utilizando IA (Google Gemini Pro).

## 🚀 Como Executar

### 1. Pré-requisitos
- Python 3.10+
- Node.js 18+
- Chave de API do Gemini ([Obtenha aqui](https://aistudio.google.com/app/apikey))

### 2. Configuração do Backend
1. Navegue até a pasta `backend`:
   ```bash
   cd backend
   ```
2. Crie um ambiente virtual (opcional, mas recomendado):
   ```bash
   python -m venv venv
   source venv/bin/activate  # ou venv\Scripts\activate no Windows
   ```
3. Instale as dependências:
   ```bash
   pip install -r requirements.txt
   ```
4. Configure sua chave de API:
   - Renomeie `.env.example` para `.env`
   - Adicione sua chave em `GEMINI_API_KEY=sua_chave_aqui`
5. Inicie o servidor:
   ```bash
   python main.py
   ```
   O backend estará rodando em `http://localhost:8000`.

### 3. Configuração do Frontend
1. Navegue até a pasta `frontend`:
   ```bash
   cd frontend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
   O frontend estará acessível em `http://localhost:5173`.

## 🧠 Estratégia de IA
A solução utiliza **Prompt Engineering** estruturado para garantir que o modelo `gemini-1.5-flash` retorne dados clínicos precisos em formato JSON. O prompt define um papel (*Role-playing*) de assistente médico e impõe um esquema de saída rigoroso, validado pelo **Pydantic** no backend.

## ✨ Diferenciais
- **Interface Intuitiva:** Design focado na experiência do médico (UX Clínica).
- **Validação Rigorosa:** Garante que diagnósticos e condutas sejam sempre listas estruturadas.
- **Resumo Profissional:** Transforma notas esparsas em um parágrafo clínico coeso.
