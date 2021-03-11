import { Partenaire } from './partenaire';
import { Project } from './project';

class Partner {
  partenaire: Partenaire;
  montant: number;
  date_financement: string;
  edit: boolean;
}

export class Financement {
  key:string;
  projet: Project;
  partenaires: Array<Partner> = [];
}
