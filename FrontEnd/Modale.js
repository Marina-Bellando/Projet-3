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

let modal = null
const focusableSelector = "button, a, input, textarea"
let focusables = []

const openModal = function (e) {
    e.preventDefault();

    modal = document.querySelector(e.target.getAttribute("href"));
    focusables = Array.from(modal.querySelectorAll(focusableSelector));
    focusables[0].focus();
    modal.style.display = null;
    modal.removeAttribute("aria-hidden");
    modal.setAttribute("aria-modal", "true");
    modal.addEventListener("click", closeModal);
    modal.querySelector(".js-modal-close").addEventListener("click", closeModal);
    modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation);
}
const closeModal = function(e) {
    if(modal === null) return
    e.preventDefault()

    modal.style.display = "none"
    modal.setAttribute("aria-hidden", "true")
    modal.removeAttribute("aria-modal")
    modal.removeEventListener("click", closeModal)
    modal.querySelector(".js-modal-close").removeEventListener("click", closeModal)
    modal.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation)
    modal = null
}

const stopPropagation = function (e) {
    e.stopPropagation()
}

const focusInModal = function (e) {
    e.preventDefault()
    let index = focusables.findIndex(f => f === modal.querySelector(":focus"))
    if (e.shiftKey === true) {
        index--
    } else{
        index++
    }
    if (index >= focusables.length) {
        index = 0
    }
    if (index < 0) {
        index = focusables.length - 1
    }
    focusables[index].focus()
}

document.querySelectorAll(".js-modal").forEach(a => {
    a.addEventListener("click", openModal)
})

window.addEventListener("keydown", function (e) {
    if (e.key === "Escape"  || e.key === "Esc") {
        closeModal(e)
    }
    if (e.key === "Tab" && modal !== null) {
        focusInModal(e)
    }
})

    // Fonction pour créer les éléments à la modale 
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

afficherProjet2();

    // Fonction pour ouvrir la 1ère modale
function afficherModal1(e) {
    e.preventDefault();
    // Affiche uniquement la modal-galerie-photo
    document.querySelector(".modal-galerie-photo").style.display = "flex";
    document.getElementById("modal-ajout-photo").style.display = "none";
}
    // Quand on appui sur le bouton modifier
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
    //Quand on appui sur le bouton ajouter une photo
document.querySelectorAll(".btn-AjoutPhoto").forEach(a => {
    a.addEventListener("click", afficherModal2);
});
    // Pour fermer la 2ème modale
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

