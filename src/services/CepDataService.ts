import axios, { AxiosInstance } from "axios";

const apiViaCep: AxiosInstance = axios.create({
  baseURL: "https://viacep.com.br/ws/",
  headers: {
    "Content-type": "json",
  },
});

class CepDataService {
  get(cep: any): Promise<any> {
    return apiViaCep.get(`/${cep}/json`);
  }
}

export default new CepDataService();
