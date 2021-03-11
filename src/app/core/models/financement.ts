import { Partenaire } from './partenaire';

class Partner {
  partenaire: Partenaire;
  montant: number;
  date_financement: string;
  edit: boolean;
}
export class Financement {
  key:string;
  nom: string;
  partenaires: Array<Partner> = [];
}
