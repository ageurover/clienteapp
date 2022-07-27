import ICliente from "@/interfaces/ICliente";
import { Module } from "vuex";
import { Estado, store } from "@/store/index";
import {
  ADICIONA_CLIENTE,
  ALTERA_CLIENTE,
  BUSCA_CLIENTE,
  DEFINE_CLIENTE,
  DEFINE_CLIENTES,
  DEFINE_DOCUMENTOS,
  DEFINE_REFERENCIAS,
  EXCLUI_CLIENTE,
  LIMPA_LISTA,
  TO_EDIT_CLIENT,
} from "@/store/tipo-mutacao";
import {
  ADICIONAR_CLIENTE,
  ATUALIZAR_CLIENTE,
  BUSCAR_CLIENTE_ID,
  DEFINIR_CLIENTES,
  EDITAR_CLIENTE,
} from "@/store/tipo-acoes";
import ClienteDataService from "@/services/ClienteDataService";

export interface EstadoCliente {
  clientes: ICliente[];
  toEditClient: boolean;
}

export const cliente: Module<EstadoCliente, Estado> = {
  mutations: {
    [LIMPA_LISTA](state): void {
      state.clientes = []
    },
    [ADICIONA_CLIENTE](state, cliente: ICliente): void {
      state.clientes.push(cliente);
    },
    [ALTERA_CLIENTE](state, cliente: ICliente): void {
      const index = state.clientes.findIndex((clie) => clie.id == cliente.id);
      state.clientes[index] = cliente;
    },
    [EXCLUI_CLIENTE](state, idCliente: string): void {
      state.clientes = state.clientes.filter((clie) => clie.id != idCliente);
    },
    [BUSCA_CLIENTE](state, cnpjCpf: string): void {
      state.clientes = state.clientes.filter((clie) => clie.cnpjCpf != cnpjCpf);
    },
    [DEFINE_CLIENTES](state, clientes: ICliente[]): void {
      state.clientes = clientes;
    },
    [DEFINE_CLIENTE](state, cliente: ICliente): void {
      store.commit(LIMPA_LISTA);
      state.clientes[0] = cliente;
    },
    [TO_EDIT_CLIENT](state, value: boolean): void {
      state.toEditClient = value;
    },
  },
  actions: {
    async [DEFINIR_CLIENTES]({ commit }, cnpjCpf) {
      const response = await ClienteDataService.findByCnpjCpf(cnpjCpf);
      if (response.data.totalElements != 0) {
        commit(LIMPA_LISTA);
        commit(DEFINE_CLIENTES, response.data.content);
      } else {
        const err = new Error("cnpj ou cpf invalidos");
        console.error(err);
        return err;
      }
    },
    async [BUSCAR_CLIENTE_ID]({ commit }, id: string) {
      const response = await ClienteDataService.get(id);      
      commit(LIMPA_LISTA);
      commit(DEFINE_CLIENTE, response.data);
      commit(DEFINE_REFERENCIAS, response.data.referencias);
      commit(DEFINE_DOCUMENTOS, response.data.documentos)
    },
    async [ATUALIZAR_CLIENTE]({commit}, novosDados: ICliente) {
      const res = await ClienteDataService.update(novosDados.id, novosDados);
      console.log(res);
      //commit(ALTERA_CLIENTE)
    },
    [EDITAR_CLIENTE]({ commit }, value: boolean) {
      commit(TO_EDIT_CLIENT, value);
    },
  },
};
