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

    // Ajoute des écouteurs d'événements pour le bouton Valider
titreInput.addEventListener("input", verifierchamps);
categorieSelect.addEventListener("change", verifierchamps);