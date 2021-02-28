import { Project } from "./project";

class docfile {
    link: string;
    isPdf: boolean
}

export class Rapport {
    key: string;
    code: String;
    projet = new Project();
    date_rapport: Date;
    desc: string;
    envoyer: number;
    id_project: String;
    valid: number;
    files = {
        audios: [],
        images: [],
        videos: [],
        docs: []
    }
}