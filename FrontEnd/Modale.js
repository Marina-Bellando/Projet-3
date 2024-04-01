    // Fonction d'authentification quand la page est chargée
document.addEventListener("DOMContentLoaded", function() {
    // Vérifie si l'utilisateur est connecté
    if (getToken()) {
    // Affiche le texte pour la modale
        document.querySelector("#portfolio .js-modal").style.display = "inline";
    } else {
    // Cache le texte pour la modale
        document.querySelector("#portfolio .js-modal").style.display = "none";
    }
    // Appel fonction d'authentification quand la page est chargée
    authentification();
});
    
    // Initialise la modale à null
let modal = null;

    // Pour ouvrir la modale
const openModal = function (e) {
    e.preventDefault();
    // Récupère l'élément modal à partir de son attribut href
    modal = document.querySelector(e.target.getAttribute("href"));
    // Récupère la section "introduction"
    const introductionSection = document.getElementById("introduction");
    // Insère la modale juste après la section "introduction"
    introductionSection.insertAdjacentElement("afterend", modal);
    // Affichage de la modale
    modal.style.display = null;
    modal.removeAttribute("aria-hidden");
    modal.setAttribute("aria-modal", "true");
    // Ajout des écouteurs d'événements pour fermer la modale
    modal.addEventListener("click", closeModal);
    modal.querySelector(".js-modal-close").addEventListener("click", closeModal);
    modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation);
};

    // Pour fermer la modale
const closeModal = function(e) {
    // Si la modale est déjà fermée, ne rien faire
    if(modal === null) return;
    e.preventDefault();
    // Cache la modale
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    modal.removeAttribute("aria-modal");
    // Supprime les écouteurs d'événements de fermeture de la modale
    modal.removeEventListener("click", closeModal);
    modal.querySelector(".js-modal-close").removeEventListener("click", closeModal);
    modal.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation);
    // Réinitialise la modale à null
    modal = null;
};

    // Pour empêcher la propagation de l'événement
const stopPropagation = function (e) {
    e.stopPropagation();
}

    // Ajout des écouteurs d'événements pour ouvrir la modale
document.querySelectorAll(".js-modal").forEach(a => {
        a.addEventListener("click", openModal);
})
    
    // Pour créer les éléments à la modale 
function creerProjet2(work) {
    // Créer les éléments pour chaque partie
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const deleteIcon = document.createElement("button");
    // Définit les éléments
    img.src = work.imageUrl;
    deleteIcon.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    // Ajout des classes pour la grille
    figure.classList.add("gallery-photo");
    deleteIcon.classList.add("delete-icon");
    // Ajout de l'attribut data-work-id au bouton de suppression
    deleteIcon.dataset.workId = work.id;
    // Ajout des éléments
    figure.appendChild(img);
    figure.appendChild(deleteIcon);
    galeriePhoto.appendChild(figure);
    // Quand on appuie sur l'icone poubelle
    deleteIcon.addEventListener("click", async function() {
        const workId = deleteIcon.dataset.workId;
    // Supprime le projet avec l'Id
        await supprimerProjet(workId);
    // Supprime l'élément de la galerie-photo
        galeriePhoto.removeChild(figure);
    });
}
    // Pour mettre les éléments dans la div galerie-photo
const galeriePhoto = document.querySelector(".galerie-photo");
        
    // Fonction pour afficher les projets
async function afficherProjet2() {
    const projets = await recupererProjets();
    for (const work of projets) {
        creerProjet2(work);
    }
}

    //Pour afficher les projets une fois que le DOM est chargé
afficherProjet2();
    
    // Fonction pour ouvrir la 1ère modale
function afficherModal1(e) {
    e.preventDefault();
    // Affiche uniquement la modal-galerie-photo
    document.querySelector(".modal-galerie-photo").style.display = "flex";
    document.getElementById("modal-ajout-photo").style.display = "none";
}

    // Quand on appui sur le bouton modifier, affiche modale 1
document.querySelectorAll(".js-modal").forEach(a => {
        a.addEventListener("click", afficherModal1);
});
    
    // Fonction pour ouvrir la 2ème modale
function afficherModal2(e) {
    e.preventDefault();
    // Affiche uniquement la modal-ajout-photo
    document.querySelector(".modal-galerie-photo").style.display = "none";
    document.getElementById("modal-ajout-photo").style.display = "flex";
}

    //Quand on appui sur le bouton ajouter une photo, affiche modale 2
document.querySelectorAll(".btn-AjoutPhoto").forEach(a => {
    a.addEventListener("click", afficherModal2);
});

    // Pour fermer la 2ème modale quand on click sur la croix
document.querySelectorAll("#modal-ajout-photo .js-modal-close").forEach(a => {
    a.addEventListener("click", closeModal);
});
    
    // Sélectionne le bouton de retour
const retourneModalBtn = document.querySelector(".retourner-modal1");
        
    // Quand on appui sur le bouton retour, affiche Modale1
retourneModalBtn.addEventListener("click", function(e) {
    e.preventDefault();
    document.getElementById("modal-ajout-photo").style.display = "none";
    document.querySelector(".modal-galerie-photo").style.display = "flex";
});