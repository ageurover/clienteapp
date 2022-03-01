import ICliente from "@/interfaces/ICliente";
import { createStore , Store, useStore as vuexUseStore } from "vuex";
import { InjectionKey} from 'vue';
import {ADICIONA_CLIENTE, ALTERA_CLIENTE, BUSCAR_CLIENTE, EXCLUIR_CLIENTE,LIMPAR_LISTA,NOTIFICAR} from './tipo-mutacao'
import { INotificacao } from "@/interfaces/INotificacao";


interface Estado{
    clientes: ICliente[],
    notificacoes: INotificacao[]
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state: {
        clientes: [],
        notificacoes: [],
    },
    mutations:{
        [LIMPAR_LISTA](state):void{
            state.clientes = state.clientes.filter(clie => clie.id == '0')
        },
        [ADICIONA_CLIENTE](state, cliente: ICliente): void {
            state.clientes.push(cliente)
        },
        [ALTERA_CLIENTE](state, cliente: ICliente):void {
            const index = state.clientes.findIndex(clie => clie.id == cliente.id)
            state.clientes[index] = cliente
        },
        [EXCLUIR_CLIENTE](state, idCliente: string):void {
            state.clientes = state.clientes.filter(clie => clie.id != idCliente)
        },
        [BUSCAR_CLIENTE](state, cnpjCpf: string):void {
            state.clientes = state.clientes.filter(clie => clie.cnpjCpf != cnpjCpf)
        },
        [NOTIFICAR](state, novaNotificacao: INotificacao){
            novaNotificacao.id = new Date().getTime()
            state.notificacoes.push(novaNotificacao)

            setTimeout(() => {
                state.notificacoes = state.notificacoes.filter(notificacao => notificacao.id != novaNotificacao.id)
            }, 3000);
        }
    }
})

export function useStore(): Store<Estado>{
    return vuexUseStore(key)
}