async function authentification () {
    const formulaireConnexion = document.querySelector("#contact form");
    formulaireConnexion.addEventListener("submit", async function(event) {
        event.preventDefault();

        let connexion = {
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
        };

        try {
            const response = await fetch ("http://localhost:5678/api/users/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(connexion),
            });

            if (response.ok) {
                console.log("Autentification réussie !");
    // Dirige sur la page d'accueil
                window.location.href = "index.html";
            }else {
                const errorMessage = await response.text();
                console.error("Erreur d'authentification:", errorMessage);
            }
        }catch (error){

            console.error("Erreur de connexion au serveur:", error);
        }

    });
}

// Appel fonction d'authentification pour qu'elle s'exécute quand page chargée
document.addEventListener("DOMContentLoaded", function() {
    authentification();
});