import IReferencia from "@/interfaces/IReferencia";
import ResponseData from "@/interfaces/ResponseData";
import ClienteDataService from "@/services/ClienteDataService";
import { Estado } from "@/store";
import { ADICIONAR_REFERENCIA, DEFINIR_REFERENCIAS } from "@/store/tipo-acoes";
import { ADICIONA_REFERENCIA, DEFINE_REFERENCIAS, LIMPA_LISTA_REFS } from "@/store/tipo-mutacao";
import { Module } from "vuex";

export interface EstadoReferencia {
  referencias: IReferencia[];
}

export const referencia: Module<EstadoReferencia, Estado> = {
  mutations: {
    [LIMPA_LISTA_REFS](state): void {
      state.referencias = state.referencias.filter((r) => r.id == "0");
    },
    [DEFINE_REFERENCIAS](state, refs: IReferencia[]): void {
      state.referencias = refs;
    },
    [ADICIONA_REFERENCIA](state, ref: IReferencia): void{
      state.referencias.push(ref)
    }
  },
  actions: {
    async [DEFINIR_REFERENCIAS]({ commit }, idCli: string) {
      await ClienteDataService.get(idCli).then((r: ResponseData) => {
        commit(DEFINE_REFERENCIAS, r.data.referencias);
      });
    },
    [ADICIONAR_REFERENCIA]({commit}, ref: IReferencia){
      commit(ADICIONA_REFERENCIA, ref)
    }
  },
};
