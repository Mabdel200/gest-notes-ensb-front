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
                label: "Département",
                icon: "business",
                routerlink: "administrator/departement/"
            },
            {
                label: "Année académique",
                icon: "event",
                routerlink: "administrator/anneeacademique/"
            },

            // Groupe Cours
            {
                label: "Type de cours",
                icon: "school",
                routerlink: "administrator/typecours/"
            },
            {
                label: "Cours",
                icon: "class",
                routerlink: "administrator/cours/"
            },
            {
                label: "Filière",
                icon: "folder_special",
                routerlink: "administrator/filiere/"
            },
            {
                label: "Parcours",
                icon: "timeline",
                routerlink: "administrator/parcours/"
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

            // Groupe Evaluation
            {
                label: "Semestre",
                icon: "calendar_today",
                routerlink: "administrator/semestre/"
            },
            {
                label: "Module",
                icon: "extension",
                routerlink: "administrator/module/"
            },
            {
                label: "Crédit",
                icon: "credit_card",
                routerlink: "administrator/credit/"
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
        label: "Note",
        icon: "assessment",
        expandable: true,
        subMenu: [
            {
                label: "Avec module",
                icon: "article",
                routerlink: "notes/avecmodule/"
            },
            {
                label: "Sans module",
                icon: "description",
                routerlink: "notes/module/"
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
                label: "PV(s) Notes",
                icon: "description",
                routerlink: "administrator/pv/liste/"
            },
            {
                label: "PV(s) Modules",
                icon: "note",
                routerlink: "administrator/notes/liste/"
            },

        ]
    },
]
