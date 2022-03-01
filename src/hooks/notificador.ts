import { tipoNotificacao } from "@/interfaces/INotificacao";
import { NOTIFICAR } from "@/store/tipo-mutacao";
import { store } from '@/store'
type Notificador = {
    notificar: (tipo: tipoNotificacao, titulo: string, texto: string) => void
}

export default(): Notificador => {
    const notificar = (tipo: tipoNotificacao, titulo: string, texto: string): void => {
        store.commit(NOTIFICAR, {
            titulo,
            texto,
            tipo
        })
    }
    return {
        notificar
    }
}