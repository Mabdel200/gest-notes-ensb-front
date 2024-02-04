import { Cours } from "./cours";
import { Credit } from "./credit";
import { Semestre } from "./semestre";

export interface Module {
    id?: Number,
    code?: String,
    intitule : String,
    cours : Cours,
    credit : Credit,
}