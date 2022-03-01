import { NOTIFICAR } from "@/store/tipo-mutacao";
import { tipoNotificacao } from "@/interfaces/INotificacao";
import { store } from '@/store'

export const notificacaoMixin = {
    methods: {
        notificar(tipo: tipoNotificacao, titulo: string, texto: string): void {
            store.commit(NOTIFICAR, {
                titulo,
                texto,
                tipo
            });
        }
    }
}