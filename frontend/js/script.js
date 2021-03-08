let produit=null;
let totalPrice=0;


/* Fonction pour récuperer et charger les oursons dans la page index */
function chargeProduit(){
    var request=new XMLHttpRequest();
    request.open('GET','http://localhost:3000/api/teddies');
    request.onreadystatechange=function () {
        if (request.readyState == XMLHttpRequest.DONE && request.status == 200) {
            var response = JSON.parse(request.responseText);
            console.log(response);
            for (i = 0; i < response.length; i++) {
/*Utilisation de la sructure html pour mettre en place la page produit */ 
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
    /*On cree une variable productId qui stockera les id specifique à chaque ourson*/ 
    let productId=window.location.href.split("?id=")[1];
    console.log("id:",productId);
/*On cree une requete pour recuperer les information des oursons avec leur id*/
    var request=new XMLHttpRequest();
    request.open('GET','http://localhost:3000/api/teddies/'+productId);
    request.onreadystatechange=function () {
        if (request.readyState == XMLHttpRequest.DONE && request.status == 200) {
            var response = JSON.parse(request.responseText);
            console.log("response:",response);
/*Donc un produit égal la reponse qui contiendra un ourson avec son id, description,image,prix */
            produit=response;

/*On cree une variable options vide qui va acceuilir les options couleur de chaque oursons*/
            let options="";
            for(i=0;i<response.colors.length;i++){
                options+=`<option value="noir">${response.colors[i]}</option>`;
            }
/*Utilisation de la sructure html pour mettre en place la page produit */
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
    }else{
        return [];
    }
    panier.push(produit);
    strStorage=JSON.stringify(panier);
    localStorage.setItem("panier",strStorage);

   
        for(i=0; i<[i].teddies; i++)
        if(panier !==null){
        document.getElementById('recap').innerHTML+=`
                    <table>
                        <tr>
                            <th>Produit</th>
                            <th>Prix</th>
                            <th>Quantité</th>
                        </tr>
                        <tr>
                            <td>${response[i].name}</td>
                            <td>${response[i].price / 100}eur</td>
                            <td></td>
                        </tr>
                    </table>
        
        `;
    }
   
}
function deleteProduct(){
    let minusProduct=document.getElementById('buttonDelete');
    minusProduct.addEventListener('click',function(){
        if(teddies[i].quantity>1){
            teddies[i].quantity--;
        }
        localStorage.setItem('panier',JSON.stringify(strStorage))
    })
}

function deleteBasket(){
    localStorage.clear(panier);  
}

/*formulaire */
let myForm=document.getElementsByClassName('form');
myForm.addEventListener('submit',function(e) {
    let myInput=document.getElementById('name');
    const myRegexName= /^[a-zA-Z-\s]+$/;
    const myRegexEmail= /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ ;
    const myRegexAdress= /^[a-zA-Z0-9-\s]+$/;
    if(myInput.value==''){
        let myError=document.getElementById('error');
        myError.innerHTML='Le champs doit etre remplit';
        myError.style.color=red;
        e.preventDefault();
    }else if(myRegexName.test(myInput.value)==false) {
        let myError=document.getElementById('error');
        myError.innerHTML='Utiliser des lettres ou des tiret pas de chiffre';
        myError.style.color=red;
        e.preventDefault();
    }
    
})
/*Requete pour envoyer le formulaire passé avec la commande*/
function postForm(myForm){
    let btnSend=document.getElementById('buttonForm');
    btnSend.addEventListener("click",()=>{
        localStorage.setItem("nom",document.querySelector("#Name").value);
        localStorage.setItem("prenom",document.querySelector("#Prenom").value);
        localStorage.setItem("email",document.querySelector("#Mail").value);
        localStorage.setItem("adresse",document.querySelector("#Adresse").value);
        localStorage.setItem("ville",document.querySelector("#Ville").value);
        localStorage.setItem("code postal",document.querySelector("#Postal").value);
    })
    var request = new XMLHttpRequest();
    request.open("POST", "http://localhost:3000/api/teddies/order");
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify(myForm))
    return response.json();
}
