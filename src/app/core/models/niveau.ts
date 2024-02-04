import { Cycle } from "./cycle";

export interface Niveau {
    id?: Number,
    terminal: Boolean,
    valeur : Number,
    cycle : Cycle
}