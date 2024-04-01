// Fonction de mappage pour obtenir la valeur numérique de la catégorie
function mapCategoryNameToId(categoryName) {
    switch (categoryName) {
        case "Objets":
            return 1;
        case "Appartements":
            return 2;
        case "Hotels&restaurants":
            return 3;
        default:
            return null; // Gérer les cas d'erreur si nécessaire
    }
}
    
    // Sélectionne le fichier à envoyer
const inputPhoto = document.getElementById("input-photo");
const titreInput = document.getElementById("titre");
const categorieSelect = document.getElementById("categorie");
const btnValider = document.querySelector(".btn-valider");

function verifierchamps() {
    if (titreInput.value.trim() !== "" && categorieSelect.value !== "disabled") {
        btnValider.style.backgroundColor = "#1D6154";
    } else {
        btnValider.style.backgroundColor = "#A7A7A7";
    }
}

// Fonction pour ajouter un projet à la galerie photo
function ajouterProjetGaleriePhoto(projet) {
    // Sélectionnez la galerie photo
    const galeriePhoto = document.querySelector(".galerie-photo");

    // Créez les éléments nécessaires pour afficher le projet
    const figure = document.createElement("figure");
    figure.classList.add("gallery-photo");
    const img = document.createElement("img");
    const deleteIcon = document.createElement("button");

    // Définissez les attributs et le contenu des éléments
    img.src = projet.imageUrl; // Assurez-vous que votre objet projet a une propriété imageUrl
    deleteIcon.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    deleteIcon.classList.add("delete-icon");
    deleteIcon.dataset.workId = projet.id; // Assurez-vous que votre objet projet a une propriété id unique

    // Ajoutez les éléments à la figure
    figure.appendChild(img);
    figure.appendChild(deleteIcon);

    // Ajoutez la figure à la galerie photo
    galeriePhoto.appendChild(figure);

    // Ajoutez un gestionnaire d'événements pour supprimer le projet si nécessaire
    deleteIcon.addEventListener("click", async function() {
        const workId = deleteIcon.dataset.workId;
        // Supprimer le projet avec l'identifiant workId
        await supprimerProjet(workId);
        // Supprimer l'élément de la galerie-photo
        galeriePhoto.removeChild(figure);
    });
}
// Fonction pour afficher tous les projets dans la galerie photo
function afficherTousProjetsDansGaleriePhoto() {
    // Appelez votre fonction pour afficher tous les projets dans la galerie photo
    afficherTousProjets();
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

    // Ajoutez des écouteurs d'événements pour le changement de contenu dans les champs titre et catégorie
titreInput.addEventListener("input", verifierchamps);
categorieSelect.addEventListener("change", verifierchamps);

// Écouteur d'événements pour le clic sur le bouton "Valider"
btnValider.addEventListener("click", function(event) {
    event.preventDefault(); // Empêcher le comportement par défaut du formulaire

     // Obtenir le jeton JWT d'authentification
     const token = getToken();

     // Vérifier si le jeton JWT est disponible
     if (token) {

        // Obtenir la valeur numérique de la catégorie sélectionnée
        const categoryName = categorieSelect.value;
        const categoryId = mapCategoryNameToId(categoryName);

        // Vérifier si la catégorie a été correctement mappée
        if (categoryId !== null) {
        // Convertir categoryId en nombre entier
            const categoryIdNumber = parseInt(categoryId, 10);

            // Construire le formulaire FormData avec les données de l'image, du titre et de la catégorie
            const formData = new FormData();
            formData.append("image", inputPhoto.files[0]);
            formData.append("title", titreInput.value);
            formData.append("category", categoryIdNumber);

            // Envoyer la requête POST à l'API
            fetch("http://localhost:5678/api/works", {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`
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
                // Vous pouvez ajouter ici du code pour traiter la réponse de l'API si nécessaire
            // Ajouter le nouveau projet à la galerie photo après l'ajout réussi
            ajouterProjetGaleriePhoto(data);
            // Mettre à jour la galerie photo après l'ajout du projet
            afficherTousProjetsDansGaleriePhoto();
            })
            .catch(error => {
                console.error("Erreur :", error);
                // Vous pouvez ajouter ici du code pour gérer les erreurs
            });
        } else {
            console.error("Catégorie non valide :", categoryName);
            // Vous pouvez ajouter ici du code pour gérer les cas où la catégorie n'a pas pu être mappée
        }
    } else {
        console.error("Le jeton d'authentification est introuvable.");
        // Vous pouvez ajouter ici du code pour gérer le cas où le jeton JWT est introuvable
    }
});