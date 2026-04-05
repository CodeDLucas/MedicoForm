import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000',
});

export interface MedicalInput {
  relato_clinico: string;
}

export interface MedicalAnalysis {
  resumo_clinico: string;
  diagnosticos_identificados: string[];
  sugestoes_ia: string[];
  condutas_identificadas: string[];
  sugestoes_conduta: string[];
}

export const analyzeCase = async (data: MedicalInput): Promise<MedicalAnalysis> => {
  const response = await api.post('/analyze', data);
  return response.data;
};

export default api;
