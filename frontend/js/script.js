let produit = null;
let totalBasket = 0


//Fonction pour récuperer et charger les oursons dans la page index 
function chargeProduit() {
    fetch("http://localhost:3000/api/teddies")
        .then(response => {
            console.log(response)
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject(response.status);
            }
        })
        .then(data => {
            console.log(data);
            for (i = 0; i < data.length; i++) {
                //Utilisation de la sructure html pour mettre en place la page produit 
                document.getElementById('oursons').innerHTML += `
                            <div class="teddie1">
                                <a href="frontend/produit.html?id=${data[i]._id}">
                                    <figure><img src="${data[i].imageUrl}" alt=""></figure>
                                </a>
                                <div class="descriptionPrice">
                                <div class="name">${data[i].name} </div>
                                <div class="description">${data[i].description} </div>
                                <div class="prix">${data[i].price / 100} euros</div>
                                </div>
                                </div>
                            `;
            }


        })

}

//Fonction pour la sélection et l'affichage du produit selectionné dans la page produit 
function selectProduct() {
    //On cree une variable productId qui stockera les id specifique à chaque ourson 
    let productId = window.location.href.split("?id=")[1];
    console.log("id:", productId);
    //On cree une requete pour recuperer les information des oursons avec leur id
    var request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:3000/api/teddies/' + productId);
    request.onreadystatechange = function () {
        if (request.readyState == XMLHttpRequest.DONE && request.status == 200) {
            var response = JSON.parse(request.responseText);
            console.log("response:", response);
            //Donc un produit égal la reponse qui contiendra un ourson avec son id, description,prix 
            produit = response;


            //On cree une variable options vide qui va acceuilir les options couleur de chaque oursons
            let options = "";
            for (i = 0; i < response.colors.length; i++) {
                options += `<option value="${response.colors[i]}">${response.colors[i]}</option>`;
                console.log(options);
                const envoyerPanier = document.querySelector("#addBasket button")
                console.log(envoyerPanier)


            }
            //Utilisation de la sructure html pour mettre en place la page produit
            document.getElementById('produit').innerHTML = `
                <div class="teddie1">
                    <a href="produit.{response._id}">
                        <figure><img src="${response.imageUrl}" alt=""></figure>
                    </a>
                    <div class="descriptionPrice">
                        <div class="name">${response.name} </div>
                        <div class="description">${response.description} </div>
                        <div class="prix">${response.price / 100} eur</div>
                        <div id="selection">
                            <label for="colorselect"><strong>VOTRE COULEUR:</strong> </label>
                            <select name="colorselect" id="colorSelect">
                                <option valueonclick"addBasket()" >--Choisir une couleur--</option>
                                ${options}
                            </select>  
                            <button onclick="addBasket()"id="addBasket" type="button">Ajouter au panier</button>
                        </div>
                    </div>
                </div>
              `;
        }
    };
    request.send();
}
/*Création d'une fonction pour l'ajout d'un produit au panier 
et le sauvegarder dans le localstorage  */


function addBasket() {
    let choixColor = document.getElementById("colorSelect");
    console.log(choixColor);
    let color=choixColor.value;
    const sendColor=document.getElementById('addBasket');
    console.log(sendColor);
    
    let OptionProduit = {
        nomProduit: produit.name,
        idproduit: produit._id,
        description: produit.description,
        image: produit.imageUrl,
        color: choixColor.value,
        quantite: 1,
        prix: produit.price / 100
    }
    console.log(OptionProduit)
    let panier = [];
    let strStorage = localStorage.getItem("panier");
    if (strStorage !== null) {
        panier = JSON.parse(strStorage);
    }
    panier.push(OptionProduit);

    strStorage = JSON.stringify(panier);
    window.alert('Produit ajouté au panier');
    localStorage.setItem("panier", strStorage);
}


//Création d' une fonction pour l'affichage du panier dans la page panier
function displayBasket() {
    let panier = [];
    let strStorage = localStorage.getItem("panier");
    if (strStorage !== null) {
        panier = JSON.parse(strStorage);
    }
    //Création d'une boucle avec queryselector et innerHTML
    for (i = 0; i < panier.length; i++) {
        document.querySelector('#recap table tbody').innerHTML += `
                    <tr>
                        <td>${panier[i].nomProduit}</td>
                        <td>${panier[i].prix } euros</td>
                        <td>${panier[i].color}<td>
                        <td><button id="supprimer" onclick="deleteProduct(${i})"><i class="fas fa-minus-circle"></i> supprimer</button></td>
                    </tr>
                    
        `;
    }
    JSON.parse(localStorage.getItem("panier")).forEach((produit) => {
        totalBasket += produit.prix;
    })
    document.getElementById("totalPrice").innerHTML += `<h3>Prix total de votre panier: ${totalBasket} euros</h3>`;
}

//Création d'une fonction pour vider le panier et rafraichir la page
function clearBasket() {
    let clearProducts = document.getElementById('buttonDelete');
    clearProducts.addEventListener('click', function () {
        localStorage.clear();
        window.location.reload();
    })
}

//Creation d'une fonction pour supprimer un article du panier
function deleteProduct(index) {
    
    //Creation de 2 paniers
    let panier = [];
    let newPanier = [];
    let strStorage = localStorage.getItem("panier");
    /*On récupere le panier on effectue une boucle à l'interieur si l'id est différent du productId 
    prit en paramétre un push est effectué dans newPanier avec les produits correspondant sans celui sélectionné */
    if (strStorage !== null) {
        panier = JSON.parse(strStorage);
        for (let i = 0; i < panier.length; i++) {
            if (i != index ) {
                newPanier.push(panier[i]);
            }
        }
    }
    panier=newPanier;
    localStorage.setItem("panier", JSON.stringify(panier));
    window.location.reload();
}

//Création d'une fonction pour l'envoi du formulaire 
function sendForm() {
    //Création d'un objet contact qui comprend les valeur du formulaire 
    let contact =
    {
        firstName: document.getElementById('Nom').value,
        lastName: document.getElementById('Prenom').value,
        address: document.getElementById('Adresse').value,
        city: document.getElementById('Ville').value,
        email: document.getElementById('Mail').value,
    }
    //Mise en place d'un array qui va contenir les id des produits sélectionnés
    let products = [];
    let strStorage = localStorage.getItem("panier");
    /*On parse le localstorage pour mettre les données dans panier puis boucle 
    à l'interieur du panier pour recupérer les id des produits et les mettre dans products*/
    if (strStorage !== null) {
        panier = JSON.parse(strStorage);
        for (let i = 0; i < panier.length; i++) {
            products.push(panier[i].idproduit);
        }
    }
    console.log(products);

    //Mise en place de la requete POST pour envoyer le formulaire 
    if (strStorage !== null) {
        const request = new Request("http://localhost:3000/api/teddies/order", {
            method: 'POST',
            body: JSON.stringify({ contact, products }),
            // Pour valider la requête on a besoin d'un objet JSON contenant "contact" && "products"
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
        });

        fetch(request)
            .then(response => response.json()) // response.json nous donnera l'orderId
            .then((response) => {
                console.log(response)
                //On sauvegarde dans le localstorage la reponse avec la clé order
                localStorage.setItem('order', response.orderId)
                window.location = "confirmation.html";
            })
    } else {
        window.alert('votre panier est vide');
    }
}


//Création d'une fonction pour l'affichage de la page confirmation avec orderId et total
function confirmDisplay() {
    let numOrder = localStorage.getItem('order')
    console.log(numOrder);
    //Mise en place de la structure HTML pour le numero de
    document.getElementById('indentifiant').innerHTML = `<h2>Votre numero de commande est le : ${numOrder}<h2>`
    JSON.parse(localStorage.getItem("panier")).forEach((produit) => {
        totalBasket += produit.prix ;
    })
    //Mise en place de structure HTML pour le total
    document.getElementById('total').innerHTML = `<h3>Votre commande est de  ${totalBasket} euros<h3>`
    localStorage.clear();

}