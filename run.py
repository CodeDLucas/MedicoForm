import subprocess
import sys
import os
import time

def run_command(command, cwd=None, shell=True):
    print(f"Executing: {command} in {cwd or '.'}")
    return subprocess.Popen(command, cwd=cwd, shell=shell)

def main():
    print("🚀 Iniciando MedicoForm AI Setup...")

    # 1. Instalar dependências do Backend
    print("\n📦 Configurando Backend...")
    try:
        subprocess.run([sys.executable, "-m", "pip", "install", "-r", "backend/requirements.txt"], check=True)
    except subprocess.CalledProcessError:
        print("❌ Erro ao instalar dependências do Python.")
        return

    # 2. Instalar dependências do Frontend
    print("\n📦 Configurando Frontend...")
    if os.path.exists("frontend"):
        try:
            subprocess.run(["npm", "install"], cwd="frontend", shell=True, check=True)
        except subprocess.CalledProcessError:
            print("❌ Erro ao instalar dependências do Node.js. Certifique-se de que o npm está instalado.")
            return

    # 3. Rodar os servidores
    print("\n⚡ Iniciando servidores...")
    
    # Inicia o Backend
    backend_proc = run_command(f"{sys.executable} main.py", cwd="backend")
    
    # Inicia o Frontend
    frontend_proc = run_command("npm run dev", cwd="frontend")

    print("\n✅ Tudo pronto!")
    print("🔗 API Backend: http://localhost:8000")
    print("🔗 Interface Web: http://localhost:5173")
    print("\nPressione Ctrl+C para encerrar os dois processos.")

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("\n🛑 Encerrando servidores...")
        backend_proc.terminate()
        frontend_proc.terminate()
        print("Sessão finalizada.")

if __name__ == "__main__":
    main()
