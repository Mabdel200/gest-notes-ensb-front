import { Filere } from "./filiere";
import { Niveau } from "./niveau";

export interface Parcours {
    id?: Number,
    label ?: String,
    niveau: Niveau,
    option: Filere
}