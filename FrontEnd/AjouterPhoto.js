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

// Sélectionnez votre input file
const inputPhoto = document.getElementById("input-photo");

// Ajoutez un écouteur d'événements pour le changement de fichier
inputPhoto.addEventListener("change", function(event) {
    const file = event.target.files[0]; // Récupérer le fichier sélectionné
    const cadreAjouterPhoto = document.querySelector(".cadre-ajouter-photo");
    
    // Vérifiez si un fichier a été sélectionné
    if (file) {
        // Créez un objet URL à partir du fichier sélectionné
        const imageUrl = URL.createObjectURL(file);
        
        // Créez un élément image pour afficher l'image sélectionnée
        const imgElement = document.createElement("img");
        imgElement.src = imageUrl;

        // Ajoutez l'élément image à la div cadre-ajouter-photo
        cadreAjouterPhoto.innerHTML = "";
        cadreAjouterPhoto.appendChild(imgElement);
    }
});