import { PrimeSave } from '@model';

export class SecretSave extends PrimeSave {
  constructor(
    name: string,
    active: boolean,
    public description: string,
    public link: string,
    public username: string,
    public password: string
  ) {
    super(name, active);
  }
}
