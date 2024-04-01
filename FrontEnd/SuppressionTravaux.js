    // Fonction pour supprimer un projet
async function supprimerProjet(workId) {
    try {
    // Récupère le jeton d'authentification
        const token = getToken();
    // Vérifie si il y a le jeton
        if (!token) {
            console.error("Jetons d'accès non disponibles");
            return;
        }
    // Appel de l'API pour supprimer le projet
        const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
    // Vérifie la réponse de l'API
        if (response.ok) {
            console.log("Projet supprimé avec succès");
        } else if (response.status === 401) {
            console.error("Erreur: Non autorisé");
        } else {
            console.error("Erreur inattendue:", response.status);
        }
    } catch (error) {
        console.error("Erreur de suppression du projet:", error);
    }
    // Actualise l'affichage des projets après suppression
    afficherTousProjets();
}
    // Afficher la modale au chargement de la page avec l'authentification
document.addEventListener("DOMContentLoaded", function() {
    authentification();
});