export interface Etudiant {
    id?: Number,
    dateDeNaissance: Date,
    lieuDeNaissance: String,
    email: String,
    matricule?: String,
    nom: String,
    region: String,
    numeroTelephone: String,
    genre: Number
    type:any,
    nationalite?:String
}