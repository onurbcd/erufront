import { Document } from '@model';

export class DocumentResult {
  constructor(public documents: Document[], public files: File[]) {}
}
