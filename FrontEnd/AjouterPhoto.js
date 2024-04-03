    // Mappage pour obtenir la valeur numérique de la catégorie
function mapCategoryNameToId(categoryName) {
    switch (categoryName) {
        case "Objets":
            return 1;
        case "Appartements":
            return 2;
        case "Hotels&restaurants":
            return 3;
        default:
    // Gère les cas d'erreur au besoin
            return null;
    }
}
    
    // Sélectionne le fichier à envoyer
const inputPhoto = document.getElementById("input-photo");
const titreInput = document.getElementById("titre");
const categorieSelect = document.getElementById("categorie");
const btnValider = document.querySelector(".btn-valider");

    // Pour que le bouton valider change de couleur quand tout les champs sont remplis
function verifierchamps() {
    if (titreInput.value.trim() !== "" && categorieSelect.value !== "disabled") {
        btnValider.style.backgroundColor = "#1D6154";
    } else {
        btnValider.style.backgroundColor = "#A7A7A7";
    }
}

    // Pour ajouter un projet à la galerie photo
function ajouterProjetGaleriePhoto(projet) {
    // Sélectionne la galerie photo
    const galeriePhoto = document.querySelector(".galerie-photo");
    // Créer les éléments pour afficher le projet
    const figure = document.createElement("figure");
    figure.classList.add("gallery-photo");
    const img = document.createElement("img");
    const deleteIcon = document.createElement("button");
    // Définit les attributs et le contenu des éléments
    img.src = projet.imageUrl;
    deleteIcon.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    deleteIcon.classList.add("delete-icon");
    deleteIcon.dataset.workId = projet.id;
    // Ajoute les éléments à la figure
    figure.appendChild(img);
    figure.appendChild(deleteIcon);
    // Ajoute la figure à la galerie photo
    galeriePhoto.appendChild(figure);
    // Ajoute un gestionnaire d'événements pour supprimer le projet
    deleteIcon.addEventListener("click", async function() {
        const workId = deleteIcon.dataset.workId;
    // Supprime le projet avec l'Id
        await supprimerProjet(workId);
    // Supprime l'élément de la galerie-photo
        galeriePhoto.removeChild(figure);
    });
}

    // Ajoute une écoute d'événements pour le changement de fichier
inputPhoto.addEventListener("change", function(event) {
    // Récupère le fichier sélectionné
    const file = event.target.files[0];
    const cadreAjouterPhoto = document.querySelector(".cadre-ajouter-photo");
    // Vérifie si un fichier a été sélectionné
    if (file) {
    // Créer un objet URL du fichier sélectionné
        const imageUrl = URL.createObjectURL(file);      
    // Créer un élément image pour afficher l'image sélectionnée
        const imgElement = document.createElement("img");
        imgElement.src = imageUrl;
    // Ajoute l'élément image à la div cadre-ajouter-photo
        cadreAjouterPhoto.innerHTML = "";
        cadreAjouterPhoto.appendChild(imgElement);
    }
});

    // Ecouteurs d'événements pour changement titre et catégorie
titreInput.addEventListener("input", verifierchamps);
categorieSelect.addEventListener("change", verifierchamps);

    // Écouteur d'événements pour le clic sur le bouton "Valider"
btnValider.addEventListener("click", function(event) {
    // Empêche le comportement par défaut du formulaire
    event.preventDefault();
    // Obtient le jeton d'authentification
     const token = getToken();
    // Vérifie si le jeton est disponible
     if (token) {
    // Obtient la valeur numérique de la catégorie du projet
        const categoryName = categorieSelect.value;
        const categoryId = mapCategoryNameToId(categoryName);
    // Vérifie si la catégorie a été correctement mappée
        if (categoryId !== null) {
    // Convertit categoryId en nombre entier
            const categoryIdNumber = parseInt(categoryId, 10);
    // Construit le formulaire FormData avec l'image, le titre et la catégorie
            const formData = new FormData();
            formData.append("image", inputPhoto.files[0]);
            formData.append("title", titreInput.value);
            formData.append("category", categoryIdNumber);
    // Envoie la requête POST à l'API
            fetch("http://localhost:5678/api/works", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: formData
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Erreur lors de l'envoi de la requête.");
                }
                return response.json();
            })
            .then(data => {
                console.log("Réponse de l'API :", data);
    // Ajoute le nouveau projet à la galerie photo après l'ajout réussi
            ajouterProjetGaleriePhoto(data);
    // Mets à jour la galerie photo après l'ajout du projet
            afficherTousProjets();
            })
            .catch(error => {
                console.error("Erreur :", error);
            });
        } else {
            console.error("Catégorie non valide :", categoryName);
        }
    } else {
        console.error("Le jeton d'authentification est introuvable.");
    }
});