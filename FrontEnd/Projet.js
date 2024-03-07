    // Récupération des données projets de l'API
async function recupererProjets() {
    try {
        const response = await fetch("http://localhost:5678/api/works");
        if (!response.ok) {
            throw new Error(`Erreur de récupération des projets.`);
        }
        const data = await response.json();
        console.log("Données des projets de l'API récupérées :", data);
        return data;
    } catch (error) {
        console.error(error.message);
        return [];
    }
}

    // Fonction pour créer les éléments du DOM 
function creerProjet(work) {
    // Créer les éléments pour chaque partie
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const figcaption = document.createElement("figcaption");
    // Définit les éléments
    img.src = work.imageUrl;
    figcaption.textContent = work.title;
    // Ajout des éléments
    figure.appendChild(img);
    figure.appendChild(figcaption);
    gallery.appendChild(figure);
}

    // Fonction pour supprimer les projets dans la div "gallery"
function supprimerFigures() {
    const figures = document.querySelectorAll(".gallery figure");
    // Prendre toutes les "figure" et les supprimer
    figures.forEach(figure => {
        figure.parentNode.removeChild(figure);
    });
}

    // Pour mettre les éléments dans la div gallery
const gallery = document.querySelector(".gallery");

    // Fonction pour afficher les projets
async function afficherProjet() {
    const projets = await recupererProjets();
    for (const work of projets) {
        creerProjet(work);
    }
}
    // Appel de la fonction pour supprimer les figures
supprimerFigures();
    // Appel de la fonction afficher les projets
afficherProjet();

    // Récupération des données catégories de l'API
async function recupererCategories() {
    try {
        const response = await fetch("http://localhost:5678/api/categories");
        if (!response.ok) {
            throw new Error(`Erreur de récupération des projets.`);
        }
        const data = await response.json();
        console.log(data);
        return data;       
    } catch (error) {
        console.error(error.message);
        return [];
    }
}

    // Fonction pour créer les boutons de filtres
async function creerBoutons() {
    try {
        const categories = await recupererCategories();
        const filtres = document.querySelector(".filtres");
    // Créer le bouton "Tous"
        const btnTous = document.createElement("button");
        btnTous.textContent = "Tous";
        btnTous.addEventListener("click", function() {
        // Appel de la fonction pour afficher tous les projets
            afficherTousProjets();
        });
        filtres.appendChild(btnTous);
    // Créer les boutons de filtres pour chaque catégorie
        categories.forEach(category => {
            const btnFiltrer = document.createElement("button");
            btnFiltrer.textContent = category.name;
            btnFiltrer.addEventListener("click", function() {
        // Appel de la fonction de filtres avec l'ID de la catégorie
                filtrerParCategorie(category.id);
            });
            filtres.appendChild(btnFiltrer);
        });
    } catch (error) {
        console.error("Erreur lors de la création des boutons de filtre :", error.message);
    }
}
    // Fonction pour afficher tous les projets
async function afficherTousProjets() {
    supprimerFigures();
    afficherProjet();
}
    // Fonction pour filtrer les éléments par catégorie
async function filtrerParCategorie(categorieId) {
    supprimerFigures();
    const projets = await recupererProjets();
    for (const work of projets) {
        if (work.category.id === categorieId) {
            creerProjet(work);
        }    
    }
}
    // Appel de la fonction pour créer les boutons de filtre
creerBoutons();