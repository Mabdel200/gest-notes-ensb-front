import { Departement } from "./departement";

export interface Filere {
    id?: Number,
    descriptionEnglish :String,
    descriptionFrench :String,
    code :String,
    departement: Departement,
}