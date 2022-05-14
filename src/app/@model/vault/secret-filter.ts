import { Filter } from '@model';

export class SecretFilter extends Filter {
  constructor(search: string, active: boolean) {
    super(active, search);
  }
}
