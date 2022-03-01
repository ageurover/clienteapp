export enum tipoNotificacao{
    SUCESSO,
    FALHA,
    ATENCAO
}

export interface INotificacao{
    id: number,
    titulo: string,
    texto: string,
    tipo: tipoNotificacao
    
}