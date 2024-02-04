import { AnneeAcademique } from "./annee-academique";
import { Cours } from "./cours";
import { Etudiant } from "./etudiant";
import { Niveau } from "./niveau";

export interface Anonymat {
    id?: Number;
    sessions: Number,
    valeur?: String,
    annee_academique?: AnneeAcademique,
    cours?: Cours,
    etudiant?: Etudiant,
    niveau?: Niveau,
}