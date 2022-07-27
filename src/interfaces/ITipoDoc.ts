export const eTipoDoc = [
  "Contrato Social ou Estatudo Social (ultima alteração)",
  "Contrato de Locação ou compra e venda do Imóvel",
  "Balanço patrimonial dos ultimos 2 (dois) exercícios",
  "Relação de faturamento dos ultimos 12 (doze meses)",
  "Declaração de IRPF dos sócios",
  "Relação de bens (sem alienação ou gravame) da empresa e dos sócios acompanhado das documentações pertinentes",
  "Fotos do estabelecimento (Fachada, interior e estoque)",
  "Notas fiscais de fornecedores com comprovação de pagamento",
  "Documentos pessoais do sócio (RG, CPF ou CNH)",
];


export default interface ITipoDoc {
  id: number;
  tipo: string;
}
