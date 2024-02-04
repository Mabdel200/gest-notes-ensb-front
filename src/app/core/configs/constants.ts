import { environment } from '../../../environments/environment';
if (typeof window !== 'undefined') {
  // Votre code qui utilise window.location ici
  const loc = window.location;
  const currentBaseUrl = `${loc.protocol}//${loc.hostname}:${loc.port}`;
}



export const NatureUe = [
  "Complementaire", "Professionnelle", "Fondamentale"
];
export const TYPE_EVALUATION = [
  "CC","TPE","TP", "EE"
];
// region abdel
export const TYPE_ETUDIANT = [
  "Regulier","Libre",
];
//end region


/**
 * API settings
 */
export const api = {

  baseUrl: environment.apiUrl,
 

  home: {},

  auth: {
    login: '/auth/authenticate',
    logout: '/auth/logout',
    register: '/auth/register',
  },

  admin: {
    anneeAcademique: {
      getAll: 'findAllAnneeAcademique ',
      create: 'addAnneeAcademique',
      delete: 'deleteAnneeAca/', // + id
      uptade: 'updateAnneeAca/', // + id
      getOne: 'findAnneeAcaById/', // +id
      getOneById: (id: number) => `findAnneeAcaById/${id}`,
    },
    anonymat: {
      create: '/addAnonymat',
      getOne: '/findAnonymatById/',
      getAll: '/findAllAnonymat',
      delete: '/deleteAnonymat/'
    },
    cours: {
      create: 'addCours',
      getOne: 'findCoursById/ ',
      // region abdel
      getOneByCode: (code: string) => `findCoursByCode?code=${code}`,
      getAllByDepartCode: (code: string) => `findAllCoursByDepart?code=${code}`,
      //end region
      getAll: 'findAllCours',
      update: 'updateCours/',
      delete: 'deleteCours/'
    },
    credit: {
      create: 'addCredit',
      getOne: 'findCreditById/',
      getAll: 'findAllCredit',
      update: 'updateCredit/',
      delete: 'deleteCredit/'
    },
    cycle: {
      create: 'addCycle',
      getOne: 'findCycleById/',
      getAll: 'findAllCycle',
      update: 'updateCycle/',
      delete: 'deleteCycle/'
    },
    departement: {
      create: 'addDepartement',
      getOne: 'findDepartById/',
      getAll: 'findAllDepartement',
      update: 'updateDepart/',
      delete: 'deleteDepart/'
    },
    enseignant: {
      create: 'addEnseignant',
      getOne: 'findEnseignantById/',
      getAll: 'findAllEnseignant',
      getAllCoursByEnseignant: 'findTeachByEnseignant/',
      update: 'updateEnseignant/',
      delete: 'deleteEnseignant/'
    },
    etudiant: {
      create: 'addEtudiant',
      getOne: 'findEtudiantById/',
      getAll: 'findAllEtudiant',
      getOneByMatricule: 'findEtudiantByMatricule/', //?matricule=value ,
      getAllByDepartement: 'findAllEtudiantByDepart', //?code=value ,
      getAllByCours: 'findAllEtudiantByParcours',
      update: 'updateEtudiant/',
      delete: 'deleteEtudiant /'
    },
    evaluation: {
      create: 'addEvaluation',
      getAll: 'findAllEvaluation',
      getOne: 'findEvaluationById/',
      getOneByCode: 'findEvaluationByCode/',
      update: 'updateEvaluation/',
      delete: 'deleteEvaluation/'
    },
    inscription: {
      create: 'addInscription',
      getAll: 'findAllEtudiantInscrit/anneeAca /' + /*{ numeroDebut }*/ '/ parcours', //? label = value ,
      getOne: 'findInscriptionById/',
      delete: 'deleteInscription/'
    },
    module: {
      create: 'addModule',
      getAll: 'findAllModule',
      getOne: 'findModuleById/',
      getAllByCours: 'findModuleByCode/',//?code=value ,
      update: 'updateModule/',
      delete: 'deleteModule/'
    },
    niveau: {
      create: 'addNiveau',
      getAll: 'findAllNiveau',
      getOne: 'findNiveauById/',
      update: 'updateNiveau/',
      delete: 'deleteNiveau/'
    },
    option: {
      create: 'addOption',
      getAll: 'findAllOptions',
      getOne: 'findOptionById/',
      getAllDept: 'findAllOptionByDepart/', //?code=value ,
      update: 'updateOption/',
      delete: 'deleteOption/'
    },
    parcours: {
      create: 'addParcours',
      getAll: 'findAllParcours',
      getOne: 'findParcoursById/',
      // region abdel
      getAllByDept: (code: string) => `findParcoursByDepart?code=${code}`,
      getAllByNivAndOpt: (niveau: number, code: string) => `findParcoursByNiveauAndOption/niveau/${niveau}/option?code=${code}`,
      // end region
      delete: 'deleteParcours/'
    },
    semestre: {
      create: 'addSemestre',
      getAll: 'findAllSemestre',
      getOne: 'findSemestreById/',
      delete: 'deleteSemestre/',
      update: 'updateSemestre/'
    },
    typeCours: {
      create: 'addTypeCours',
      getAll: 'findAllTypeCours',
      getOne: 'findTypeCoursById/',
      update: 'updateTypeCours/',
      delete: 'deleteTypeCours/'
    },
    notes: {
      getPVCours: (session: number, type: number, annee: number, code : string, label:string) => `findPVCours/session/${session}/annee/${annee}/type/${type}/cours?code=${code}&label=${label}`,
    }

  },

  aci: {

  },
};