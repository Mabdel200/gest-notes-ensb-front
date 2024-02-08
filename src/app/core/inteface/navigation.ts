import { Menu } from "./menu";

export const navAdmin: Menu[] = [

    {
        label: "Tableau de bord",
        icon: "dashboard",
        routerlink: "administrator/dashboard",
        expandable: false
    },
    {
        label: "Paramétrage",
        icon: "settings",
        expandable: true,
        subMenu: [
            // Groupe Administration
            {
                label: "Année académique",
                icon: "event",
                routerlink: "administrator/anneeacademique/"
            },
            {
                label: "Département",
                icon: "business",
                routerlink: "administrator/departement/"
            },
          

            // Groupe Cours
           
            {
                label: "Filière",
                icon: "folder_special",
                routerlink: "administrator/filiere/"
            },
            {
                label: "Cycle",
                icon: "loop",
                routerlink: "administrator/cycle/"
            },
            {
                label: "Niveau",
                icon: "trending_up",
                routerlink: "administrator/niveau/"
            },
            {
                label: "Parcours",
                icon: "timeline",
                routerlink: "administrator/parcours/"
            },
          
          

            // Groupe Evaluation
            {
                label: "Semestre",
                icon: "calendar_today",
                routerlink: "administrator/semestre/"
            },
            {
                label: "Crédit",
                icon: "credit_card",
                routerlink: "administrator/credit/"
            },
            {
                label: "Evaluations attendues",
                icon: "school",
                routerlink: "administrator/typecours/"
            },
          
            {
                label: "UE (Unité d’enseignement) ",
                icon: "class",
                routerlink: "administrator/cours/"
            },
            {
                label: "EC (Enseignements complémentaires)",
                icon: "extension",
                routerlink: "administrator/module/"
            },
           
          
            {
                label: "Évaluation",
                icon: "assessment",
                routerlink: "administrator/evaluation/"
            }
        ]
    },

    // Region Abdel
  
    {
        label: "Étudiant",
        icon: "school",
        expandable: true,
        subMenu: [
            {
                label: "Préinscription",
                icon: "perm_contact_calendar",
                routerlink: "etudiant/preinscription/"
            },
            {
                label: "Inscription",
                icon: "person_add",
                routerlink: "etudiant/inscription/"
            },
        ]
    },
    {
        label: "Notes",
        icon: "assessment",
        expandable: true,
        subMenu: [
            {
                label: "Pour une UE",
                icon: "description",
                routerlink: "notes/module/"
            },
            {
                label: "Pour un EC",
                icon: "article",
                routerlink: "notes/avecmodule/"
            },
           
            {
                label: "Anonymat",
                icon: "person_outline",
                routerlink: "notes/anonymat/"
            },
            {
                label: "Examen",
                icon: "assignment",
                routerlink: "notes/examen/"
            },
        ]
    },
    {
        label: "Listes",
        icon: "assignment",
        expandable: true,
        subMenu: [
            {
                label: "Étudiants",
                icon: "school",
                routerlink: "administrator/etudiant/liste/"
            },
            {
                label: "PV pour une UE",
                icon: "note",
                routerlink: "administrator/pv/liste/"
            },
            // {
            //     label: "PV(s) Modules",
            //     icon: "description",
            //     routerlink: "administrator/notes/liste/"
            // },

        ]
    },
]
