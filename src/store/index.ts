import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { InjectionKey } from "vue";
import { EstadoCliente, cliente } from "./modulos/cliente";
import { EstadoNotificacao, notificacao } from "./modulos/notificacao";
import { EstadoDocumento, documento } from "./modulos/documentos";
import { EstadoReferencia, referencia } from "./modulos/referencias";

export interface Estado {
  cliente: EstadoCliente;
  notificacao: EstadoNotificacao;
  documento: EstadoDocumento;
  referencia: EstadoReferencia;
  toEditClient: boolean;
}

export const key: InjectionKey<Store<Estado>> = Symbol();

export const store = createStore<Estado>({
  modules: {
    cliente,
    notificacao,
    documento,
    referencia,
  },
});

export function useStore(): Store<Estado> {
  return vuexUseStore(key);
}
