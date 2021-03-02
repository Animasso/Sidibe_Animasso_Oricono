let produit=null;


/* Fonction pour récuperer et charger les oursons dans la page index */
function chargeProduit(){
    var request=new XMLHttpRequest();
    request.open('GET','http://localhost:3000/api/teddies');
    request.onreadystatechange=function () {
        if (request.readyState == XMLHttpRequest.DONE && request.status == 200) {
            var response = JSON.parse(request.responseText);
            console.log(response);
            for (i = 0; i < response.length; i++) {
                document.getElementById('oursons').innerHTML += `
               <div class="teddie1">
                  <a href="produit.html?id=${response[i]._id}">
                     <figure><img src="${response[i].imageUrl}" alt=""></figure>
                  </a>
                  <div class="descriptionPrice">
                   <div class="name">${response[i].name} </div>
                   <div class="description">${response[i].description} </div>
                   <div class="prix">${response[i].price / 100} eur</div>
                  </div>
                </div>
              `;
            }

        }
    };
    request.send();
}
/*Fonction pour la sélection et l'affichage du produit selectionné dans la page produit */


function selectProduct(){
    let productId=window.location.href.split("?id=")[1];
    console.log("id:",productId);
    var request=new XMLHttpRequest();
    request.open('GET','http://localhost:3000/api/teddies/'+productId);
    request.onreadystatechange=function () {
        if (request.readyState == XMLHttpRequest.DONE && request.status == 200) {
            var response = JSON.parse(request.responseText);
            console.log("response:",response);
            produit=response;
            let options="";
            for(i=0;i<response.colors.length;i++){
                options+=`<option value="noir">${response.colors[i]}</option>`;
            }
            document.getElementById('produit').innerHTML= `
                <div class="teddie1">
                    <a href="produit.html?id=${response._id}">
                        <figure><img src="${response.imageUrl}" alt=""></figure>
                    </a>
                    <div class="descriptionPrice">
                        <div class="name">${response.name} </div>
                        <div class="description">${response.description} </div>
                        <div class="prix">${response.price / 100} eur</div>
                        <div id="select">
                    
                            <label for="color-select"><strong>VOTRE COULEUR:</strong> </label>
                            <select name="color" id="color-select">
                                <option value="">--Choisir une couleur--</option>
                                ${options}
                            </select>  
                
                            <button onclick="addBasket()" id="addBasket" type="button">Ajouter au panier</button>
                        </div>
                    </div>
                </div>
              `;
            }
        };
        request.send();
    }

function addBasket(){
    let panier=[];
    let strStorage=localStorage.getItem("panier");
    if (strStorage!==null){
        panier=JSON.parse(strStorage);
    }
    panier.push(produit);
    strStorage=JSON.stringify(panier);
    localStorage.setItem("panier",strStorage);
}
