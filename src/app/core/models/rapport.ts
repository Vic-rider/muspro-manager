export class Rapport {
    key: string;
    code: String;
    date_rapport: Date;
    desc: string;
    envoyer: false;
    id_project: String;
    valid: false;
    files = {
        audios: [],
        images: [],
        videos: []
    }
}