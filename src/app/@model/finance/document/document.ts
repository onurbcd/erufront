export class Document {
  constructor(
    public id: string,
    public name: string,
    public path: string,
    public mimeType: string,
    public size: number,
    public hash: string
  ) {}
}
