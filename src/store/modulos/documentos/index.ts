import { Module } from "vuex";
import {
  ADICIONA_DOCUMENTO,
  DEFINE_DOCUMENTOS,
  LIMPA_LISTA_DOCS,
  REMOVE_DOCUMENTO,
} from "../../tipo-mutacao";

import IDocumento from "@/interfaces/IDocumento";
import { Estado } from "@/store";
import {
  ADICIONAR_DOCUMENTO,
  DEFINIR_DOCUMENTOS,
  LIMPAR_LISTA_DOCS,
  REMOVER_DOCUMENTO,
} from "@/store/tipo-acoes";

export interface EstadoDocumento {
  documentos: IDocumento[];
}

export const documento: Module<EstadoDocumento, Estado> = {
  mutations: {
    [LIMPA_LISTA_DOCS](state): void {
      state.documentos = state.documentos.filter((doc) => doc.id == "0");
    },
    [DEFINE_DOCUMENTOS](state, docs: IDocumento[]): void {
      state.documentos = docs;
    },
    [ADICIONA_DOCUMENTO](state, doc: IDocumento): void {
      state.documentos.push(doc);
    },
    [REMOVE_DOCUMENTO](state, doc: IDocumento): void {
      state.documentos = state.documentos.filter((d) => d != doc);
    },
  },
  actions: {
    async [DEFINIR_DOCUMENTOS]({ commit }, documentos: IDocumento[]) {
      commit(DEFINE_DOCUMENTOS, documentos);
    },
    [ADICIONAR_DOCUMENTO]({ commit }, documento: IDocumento) {
      commit(ADICIONA_DOCUMENTO, documento);
    },
    [REMOVER_DOCUMENTO]({ commit }, documento: IDocumento) {
      commit(REMOVE_DOCUMENTO, documento);
    },
    [LIMPAR_LISTA_DOCS]({ commit }) {
      commit(LIMPA_LISTA_DOCS);
    },
  },
};
