async function supprimerProjet(workId) {
    try {
        const token = getToken();
        if (!token) {
            console.error("Jetons d\'accès non disponibles");
            return;
        }
        const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
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
}

    // Afficher la modale au chargement de la page
document.addEventListener("DOMContentLoaded", function() {
    authentification();
});