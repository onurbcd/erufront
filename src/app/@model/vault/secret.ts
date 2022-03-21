export class Secret {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public link: string,
    public username: string,
    public password: string,
    public createdDate: Date,
    public lastModifiedDate: Date
  ) {}
}
