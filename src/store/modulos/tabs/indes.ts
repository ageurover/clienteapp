import { Estado } from "@/store";
import { DEFINIR_TABS } from "@/store/tipo-acoes";
import { DEFINE_TABS } from "@/store/tipo-mutacao";
import { Module } from "vuex";

export interface EstadoTab {
  tabs: any[];
}

export const tab: Module<EstadoTab, Estado> = {
  mutations: {
    [DEFINE_TABS](state, tabs: Array<any>): void {
      state.tabs = tabs;
    },
  },
  actions: {
    [DEFINIR_TABS]({ commit }, tabs: Array<any>) {
      commit(DEFINE_TABS, tabs);
    },
  },
};
