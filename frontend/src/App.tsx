import React, { useState } from 'react';
import { analyzeCase } from './api';
import type { MedicalInput, MedicalAnalysis } from './api';
import { Stethoscope, ClipboardList, Loader2, AlertCircle, CheckCircle, BrainCircuit, Sparkles, UserRoundSearch, Download } from 'lucide-react';

export default function App() {
  const [formData, setFormData] = useState<MedicalInput>({ relato_clinico: '' });
  const [result, setResult] = useState<MedicalAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.relato_clinico.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const data = await analyzeCase(formData);
      setResult(data);
    } catch (err: any) {
      setError(err.response?.data?.detail || err.message || 'Erro ao conectar com o servidor');
    } finally {
      setLoading(false);
    }
  };

  const downloadJson = () => {
    if (!result) return;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(result, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `analise_medica_${new Date().getTime()}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-10">
      <nav className="bg-white border-b p-4 shadow-sm mb-6">
        <div className="max-w-6xl mx-auto flex items-center gap-2">
          <Stethoscope className="text-blue-600 w-8 h-8" />
          <h1 className="text-xl font-bold">MedicoForm <span className="text-blue-600">Copilot</span></h1>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="bg-white p-6 rounded-xl shadow-sm border h-fit">
          <div className="flex items-center gap-2 mb-4 text-blue-600">
            <UserRoundSearch className="w-5 h-5" />
            <h2 className="font-bold">Relato Clínico</h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              className="w-full h-64 p-4 border rounded-xl bg-slate-50 outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
              placeholder="Descreva o caso clínico aqui..."
              value={formData.relato_clinico}
              onChange={(e) => setFormData({ relato_clinico: e.target.value })}
            />
            <button
              disabled={loading}
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 disabled:bg-slate-300 flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              {loading ? <Loader2 className="animate-spin" /> : <Sparkles />}
              {loading ? 'Analisando...' : 'Gerar Análise com IA'}
            </button>
          </form>
        </section>

        <section className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex items-center gap-3">
              <AlertCircle />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          {!result && !loading && !error && (
            <div className="h-full min-h-[400px] border-2 border-dashed rounded-xl flex flex-col items-center justify-center text-slate-400 bg-white/50">
              <BrainCircuit className="w-12 h-12 mb-2 opacity-20" />
              <p>Aguardando relato clínico...</p>
            </div>
          )}

          {result && (
            <div className="space-y-4 animate-in fade-in duration-500">
              <div className="flex justify-between items-center bg-slate-800 text-white p-4 rounded-xl shadow-sm">
                <div className="flex items-center gap-2">
                  <ClipboardList className="w-4 h-4 text-blue-400" />
                  <span className="text-xs font-bold uppercase tracking-widest">Resultado da Análise</span>
                </div>
                <button 
                  onClick={downloadJson}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold py-1.5 px-3 rounded-lg transition-colors cursor-pointer"
                >
                  <Download className="w-3 h-3" /> EXPORTAR JSON
                </button>
              </div>

              <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
                <h3 className="text-xs font-black text-slate-400 uppercase mb-2 tracking-widest">Resumo Profissional</h3>
                <p className="text-sm italic text-slate-700 leading-relaxed">"{result.resumo_clinico}"</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl border border-emerald-100 shadow-sm">
                  <h4 className="text-[10px] font-bold text-emerald-600 uppercase mb-2 tracking-widest">Identificados</h4>
                  <div className="flex flex-wrap gap-1">
                    {result.diagnosticos_identificados.map((d, i) => (
                      <span key={i} className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-1 rounded font-bold border border-emerald-100">{d}</span>
                    ))}
                  </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-blue-100 shadow-sm">
                  <h4 className="text-[10px] font-bold text-blue-600 uppercase mb-2 tracking-widest">Sugestões IA</h4>
                  <div className="flex flex-wrap gap-1">
                    {result.sugestoes_ia.map((s, i) => (
                      <span key={i} className="text-[10px] bg-blue-50 text-blue-700 px-2 py-1 rounded font-bold border border-blue-100">{s}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase mb-3 tracking-widest">Sugestões de Conduta</h4>
                <ul className="space-y-2">
                  {result.sugestoes_conduta.map((c, i) => (
                    <li key={i} className="text-xs flex items-start gap-2 text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100">
                      <CheckCircle className="w-3 h-3 text-blue-500 mt-0.5 shrink-0" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
