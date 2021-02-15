import { ProjectType } from "./project-type";

export class Project {
    key:string;
    adresse: String;
    date_creation: Date;
    date_finition: Date;
    date_finition_prevu: Date;
    date_lancement: Date;
    description: String;
    montant: number;
    nom: String;
    pays: String;
    type: ProjectType;
    ville: String;
}
