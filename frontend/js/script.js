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
    let productId=window.location.href.split["?id="][1];
    console.log(productId);
    var request=new XMLHttpRequest();
    request.open('GET','http://localhost:3000/api/teddies/'+ productId);
    request.onreadystatechange=function () {
        if (request.readyState == XMLHttpRequest.DONE && request.status == 200) {
            var response = JSON.parse(request.responseText);
            console.log(response);
                document.getElementById('produit').innerHTML += `
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
    }

