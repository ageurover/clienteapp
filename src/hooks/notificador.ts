import { tipoNotificacao } from "@/interfaces/INotificacao";
import { store } from "@/store";
import { NOTIFICAR } from "@/store/tipo-acoes";
type Notificador = {
  notificar: (tipo: tipoNotificacao, titulo: string, texto: string) => void;
};

export default (): Notificador => {
  const notificar = (
    tipo: tipoNotificacao,
    titulo: string,
    texto: string
  ): void => {
    store.dispatch(NOTIFICAR, {
      titulo,
      texto,
      tipo,
    });
  };
  return {
    notificar,
  };
};
