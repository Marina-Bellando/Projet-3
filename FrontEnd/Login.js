async function authentification () {
    // Pour sélectionner le formulaire de connexion du html
    const formulaireConnexion = document.querySelector("#contact form");
    formulaireConnexion.addEventListener("submit", async function(event) {
    // Evite le chargement d'une nouvelle page
        event.preventDefault();

    // Récupération des valeurs email et password du formulaire
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
    // Converti la réponse en JSON pour pouvoir les extraire
                const responseData = await response.json();
                const token = responseData.token;
    // Stocke le token d'authentification dans le localStorage
                localStorage.setItem("token", token);

                console.log("Autentification réussie !");
    // Si authentification ok = Dirige sur la page d'accueil
                window.location.href = "index.html";
            }else {
    // Si ça échoue, récupère le message d'erreur envoyé par le serveur
                const errorMessage = await response.text();
                console.error("Erreur d'authentification:", errorMessage);
                document.getElementById("error-message").innerText = "Erreur dans l'identifiant ou le mot de passe.";
            }
        }catch (error){
            console.error("Erreur de connexion au serveur:", error);
        }

    });
}

document.addEventListener("DOMContentLoaded", function() {
    const modeEdition = document.getElementById("mode-edition");
    const lienLogin = document.getElementById("lien-login");
    const h1 = document.querySelector("header h1");
    const nav = document.querySelector("header nav");
    // Vérifie si l'utilisateur est connecté grâce au token
    if (getToken()) {
   // Affiche le header "mode-edition" quand il est connecté
        if (modeEdition) {
    // Affichage en flex pour mettre le style #mode-édition du CSS.
            modeEdition.style.display = "flex";
        }
        if (lienLogin) {
    // Met "Logout" à la place de "Login"
            lienLogin.textContent = "logout";
    // Pour désactiver le lien de connexion
            lienLogin.href = "#";
        }
    // Met un espacement avec le mode edition et le header
        if (h1) {
            h1.style.marginTop = "40px";
        }
        if (nav) {
            nav.style.marginTop = "40px"
        }
    } else {
    // Cache le header "mode-edition" quand il n'est pas connecté
        if (modeEdition) {
            modeEdition.style.display = "none";
        }
        if (lienLogin) {
    // Remet le texte d'origine
            lienLogin.textContent = "login";
    // Remet l'URL d'origine
            lienLogin.href = "login.html";
        }
    // Rétablit l'espacement avec le mode edition et le header
        if (h1) {
            h1.style.marginTop = "0px";
        }
        if (nav) {
            nav.style.marginTop = "0px";
        }
    }
});

    // Récupére le token d'authentification depuis le localStorage
function getToken() {
    return localStorage.getItem("token");
}

    // Appel fonction d'authentification quand la page est chargée
document.addEventListener("DOMContentLoaded", function() {
    authentification();
});