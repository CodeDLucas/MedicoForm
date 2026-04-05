import React, { useState } from 'react';
import { analyzeCase, MedicalInput, MedicalAnalysis } from './api';
import { Stethoscope, ClipboardList, Activity, Save, Loader2, AlertCircle, CheckCircle } from 'lucide-react';

function App() {
  const [formData, setFormData] = useState<MedicalInput>({
    queixa_principal: '',
    hipotese_diagnostica: '',
    conduta: ''
  });
  const [result, setResult] = useState<MedicalAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const data = await analyzeCase(formData);
      setResult(data);
    } catch (err) {
      setError('Falha ao processar os dados. Verifique se o backend está rodando.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const clearForm = () => {
    setFormData({ queixa_principal: '', hipotese_diagnostica: '', conduta: '' });
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Navbar */}
      <nav className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Stethoscope className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold tracking-tight text-slate-800">MedicoForm <span className="text-blue-600">AI</span></span>
          </div>
          <div className="text-sm text-slate-500 font-medium">Desafio Técnico - Assistente Médico</div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
        
        {/* Formulário */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center gap-2 mb-6">
              <ClipboardList className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-slate-800">Prontuário de Atendimento</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Queixa Principal / História Clínica
                </label>
                <textarea
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none h-32"
                  placeholder="Ex: Paciente relata dor de cabeça intensa há três dias..."
                  required
                  value={formData.queixa_principal}
                  onChange={(e) => setFormData({ ...formData, queixa_principal: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Hipótese Diagnóstica
                </label>
                <textarea
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none h-20"
                  placeholder="Ex: Histórico de enxaqueca..."
                  value={formData.hipotese_diagnostica}
                  onChange={(e) => setFormData({ ...formData, hipotese_diagnostica: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Conduta / Prescrição
                </label>
                <textarea
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none h-24"
                  placeholder="Ex: Orientado repouso e hidratação..."
                  value={formData.conduta}
                  onChange={(e) => setFormData({ ...formData, conduta: e.target.value })}
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:bg-blue-400 cursor-pointer"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Activity className="w-5 h-5" />}
                  {loading ? 'Analisando...' : 'Processar com IA'}
                </button>
                <button
                  type="button"
                  onClick={clearForm}
                  className="px-6 py-3 rounded-lg border border-slate-300 text-slate-600 font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Limpar
                </button>
              </div>
            </form>
          </div>

          <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
            <h4 className="text-sm font-bold text-blue-800 flex items-center gap-2 mb-1">
              <Activity className="w-4 h-4" /> Dica de Inovação
            </h4>
            <p className="text-xs text-blue-700 leading-relaxed">
              Esta ferramenta utiliza Gemini Pro 1.5 para converter anotações livres em dados estruturados (JSON), permitindo relatórios epidemiológicos e alertas em tempo real.
            </p>
          </div>
        </div>

        {/* Resultados */}
        <div className="space-y-6">
          {!result && !error && !loading && (
            <div className="bg-white rounded-xl shadow-sm border border-dashed border-slate-300 p-12 flex flex-col items-center justify-center text-center h-full min-h-[500px]">
              <div className="bg-slate-100 p-4 rounded-full mb-4">
                <ClipboardList className="w-12 h-12 text-slate-400" />
              </div>
              <h3 className="text-lg font-medium text-slate-600">Aguardando análise...</h3>
              <p className="text-sm text-slate-400 max-w-xs mt-2">
                Preencha os dados do atendimento à esquerda e clique em "Processar com IA" para ver os dados estruturados.
              </p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
              <div>
                <p className="font-bold text-sm">Erro no processamento</p>
                <p className="text-xs">{error}</p>
              </div>
            </div>
          )}

          {result && (
            <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="bg-blue-600 px-6 py-4 flex items-center justify-between">
                <h3 className="text-white font-bold flex items-center gap-2 uppercase tracking-wider text-sm">
                  <CheckCircle className="w-4 h-4" /> Resultado Estruturado (JSON)
                </h3>
                <button 
                  onClick={() => navigator.clipboard.writeText(JSON.stringify(result, null, 2))}
                  className="bg-blue-500 hover:bg-blue-400 text-white text-xs py-1 px-3 rounded font-medium transition-colors"
                >
                  Copiar JSON
                </button>
              </div>
              
              <div className="p-6 space-y-6">
                <div>
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                    Resumo Clínico
                  </h4>
                  <p className="text-slate-700 text-sm leading-relaxed bg-slate-50 p-4 rounded-lg border border-slate-100 italic">
                    "{result.resumo_clinico}"
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
                      Diagnósticos Identificados
                    </h4>
                    <ul className="space-y-2">
                      {result.diagnosticos.map((d, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-slate-700 bg-emerald-50 border border-emerald-100 px-3 py-2 rounded-md">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
                      Condutas / Tratamentos
                    </h4>
                    <ul className="space-y-2">
                      {result.condutas.map((c, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-slate-700 bg-blue-50 border border-blue-100 px-3 py-2 rounded-md">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-end">
                  <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white py-2 px-5 rounded-lg text-sm font-bold transition-all transform hover:scale-105 shadow-lg">
                    <Save className="w-4 h-4" /> Salvar no Prontuário
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="max-w-6xl mx-auto p-6 text-center text-slate-400 text-xs mt-10">
        Desenvolvido para Desafio Técnico - MedicoForm AI &copy; 2026
      </footer>
    </div>
  );
}

export default App;
