    // Récupération des données de l'API
async function recupererProjets() {
    try {
        const response = await fetch("http://localhost:5678/api/works");
        if (!response.ok) {
            throw new Error(`Erreur de récupération.`);
        }
        const data = await response.json();
        console.log("Données de l'API récupérées :", data);
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
    // prendre toutes les "figure" et les supprimer
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

    