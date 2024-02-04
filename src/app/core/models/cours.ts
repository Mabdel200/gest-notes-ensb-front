import { Credit } from "./credit";
import { Departement } from "./departement";
import { Parcours } from "./parcours";
import { Semestre } from "./semestre";
import { TypeCours } from "./typeCours";

export interface Cours {
    coursId?: Number,
    code?: String,
    natureUE: any,
    intitule: String,
    departement: Departement,
    credit: Credit,
    typecours: TypeCours,
    semestre : Semestre
}