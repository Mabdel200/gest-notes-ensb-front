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
        label: "Gestion-étudiants",
        icon: "school",
        expandable: true,
        subMenu: [
            {
                label: "Préinscription",
                icon: "perm_contact_calendar",
                routerlink: "etudiant/listepreinscription/"
            },
            // {
            //     label: "Nouvelle Pre",
            //     icon: "perm_contact_calendar",
            //     routerlink: "etudiant/nouveaupreinscription/"
            // },  
            {
                label: "Inscription ",
                icon: "person_add",
                routerlink: "administrator/etudiant/liste"
            },
            // {
            //     label: "Nouvelle Insc",
            //     icon: "person_add",
            //     routerlink: "etudiant/nouveauinscription/"
            // },  
        ]
    },
   
    {
        label: "Gestion-notes",
        icon: "assessment",
        expandable: true,
        subMenu: [
            {
                label: "Pour une UE",
                icon: "description",
                routerlink: "notes/nouvelle/"
            },
            {
                label: "Pour un EC",
                icon: "article",
                routerlink: "notes/nouvelleec/"
            },
           
            {
                label: "Examen",
                icon: "assignment",
                routerlink: "notes/examen/"
            },
            // {
            //     label: "Nouvelle",
            //     icon: "assignment",
            //     routerlink: "notes/nouvelle/"
            // },
            // {
            //     label: "Nouvelle EC",
            //     icon: "assignment",
            //     routerlink: "notes/nouvelleec/"
            // },
            {
                label: "Liste-notes-UE",
                icon: "assignment",
                routerlink: "notes/listenote/"
            },
            {
                label: "Liste-notes-EC",
                icon: "assignment",
                routerlink: "administrator/notes/listenotesec/"
            },
        ]
    },
    {
        label: "Procès-verbaux",
        icon: "assignment",
        expandable: true,
        subMenu: [
            // {
            //     label: "Étudiants",
            //     icon: "school",
            //     routerlink: "administrator/etudiant/liste/"
            // },
            // {
            //     label: "Préinscription",
            //     icon: "perm_contact_calendar",
            //     routerlink: "etudiant/listepreinscription/"
            // },
            // {
            //     label: "Inscription",
            //     icon: "perm_contact_calendar",
            //     routerlink: "etudiant/listeinscription/"
            // },
            {
                label: "PV pour une UE",
                icon: "note",
                routerlink: "administrator/pv/liste/"
            },
            {
                label: "PV pour un EC",
                icon: "description",
                routerlink: "administrator/pv/ec/"
            },
            {
                label: "PV semestrielle",
                icon: "description",
                routerlink: "administrator/pv/semestre/"
            },
            // {
            //     label: "PV Grand-Jury",
            //     icon: "description",
            //     routerlink: "administrator/pv/grandjury/"
            // },

        ]
    },
    
]
