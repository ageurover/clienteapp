export default interface IDocumento {
    id: string,
    tipoDoc: string,
    dataUpload: Date,
    imageDoc: BinaryType,
    dataUrl: string,
    name: string
}