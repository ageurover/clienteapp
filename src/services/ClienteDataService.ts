import http from "@/http-common";
class ClienteDataService {
  getAll(): Promise<any> {
    return http.get("/novocliente");
  }
  get(id: any): Promise<any> {
    return http.get(`/novocliente/${id}`);
  }
  create(data: any): Promise<any> {
    return http.post("/novocliente", data);
  }
  update(id: any, data: any): Promise<any> {
    return http.put(`/novocliente/${id}`, data);
  }
  delete(id: any): Promise<any> {
    return http.delete(`/novocliente/${id}`);
  }
  findByCnpjCpf(cnpjCpf: string): Promise<any> {
    return http.get(`/novocliente?cnpjCpf=${cnpjCpf}`);
  }
}
export default new ClienteDataService();