import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000',
});

export interface MedicalInput {
  queixa_principal: string;
  hipotese_diagnostica: string;
  conduta: string;
}

export interface MedicalAnalysis {
  resumo_clinico: string;
  diagnosticos: string[];
  condutas: string[];
}

export const analyzeCase = async (data: MedicalInput): Promise<MedicalAnalysis> => {
  const response = await api.post<MedicalAnalysis>('/analyze', data);
  return response.data;
};

export default api;
