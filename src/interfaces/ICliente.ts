import IDocumento from "./IDocumento";
import IReferencia from "./IReferencia";

export enum eTipoImovel{
    ALUGADO, 
	PROPRIO
}

export default interface ICliente {
    id: string,
	tipoPJF: string ,
	cnpjCpf: string ,
	inscricaoEstadual: string ,
	razaoSocial: string ,
	nomeFanstasia: string ,
	ramoAtividade: string ,
	cep: string ,
	estado: string ,
	logradouro: string ,
	numero: string ,
	bairo: string ,
	cidade: string ,
	pontoReferencia: string,
	emailNfe: string ,
	emailContato: string ,
	celular: string ,
	telefoneComercial: string ,
	quantidadeCheckout: string ,
	
	autorizaDadosLgpd: boolean ,
	autorizaMensagens: boolean ,
	autorizaPublicidade: boolean ,
	autorizaConsultaCredito: boolean ,
	autorizaConsultaReferencia: boolean ,
    tipoImovel: eTipoImovel,
    referencias: IReferencia,
    documentos: IDocumento
  }