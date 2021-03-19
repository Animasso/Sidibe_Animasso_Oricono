let produit=null;
let totalPrice=0;



/* Fonction pour récuperer et charger les oursons dans la page index */
function chargeProduit(){
    fetch("http://localhost:3000/api/teddies")
    .then(response=>{
        console.log(response)
        if(response.ok){
            return response.json();
        }else{
            return Promise.reject(response.status);
        }
    })
    .then(data=>{
        console.log(data);
            for (i = 0; i < data.length; i++) {
                /*Utilisation de la sructure html pour mettre en place la page produit */ 
                                document.getElementById('oursons').innerHTML += `
                            <div class="teddie1">
                                <a href="produit.html?id=${data[i]._id}">
                                    <figure><img src="${data[i].imageUrl}" alt=""></figure>
                                </a>
                                <div class="descriptionPrice">
                                <div class="name">${data[i].name} </div>
                                <div class="description">${data[i].description} </div>
                                <div class="prix">${data[i].price / 100} eur</div>
                                </div>
                                </div>
                            `;
            }
        

    })
 
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
                console.log(options);
            }
/*Utilisation de la sructure html pour mettre en place la page produit */
            document.getElementById('produit').innerHTML= `
                <div class="teddie1">
                    <a href="produit.{response._id}">
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

function displayBasket(){
    let panier=[];
    let strStorage=localStorage.getItem("panier");
    if (strStorage!==null){
        panier=JSON.parse(strStorage);
    }
    for(i=0; i<panier.length; i++){
        document.querySelector('#recap table tbody').innerHTML+=`
                    <tr>
                        <td>${panier[i].name}</td>
                        <td>${[i].imageUrl}</td>
                        <td>${panier[i].price / 100} euros</td>
                        <td><button onclick="deleteProduct('${panier[i]._id}')"><i class="fas fa-minus-circle"></i>supprimer</button></td>
                    </tr>
                    <div id="total"></div>
        `;
    } 
    
}
function clearBasket(){
    let clearProducts=document.getElementById('buttonDelete');
    clearProducts.addEventListener('click',function(){
        localStorage.clear();
        window.location.reload(); 
    })
}
    
    function deleteProduct(productId){
        let panier=[];
        let newPanier=[];
        let strStorage=localStorage.getItem("panier");
        if (strStorage!==null){ 
            panier=JSON.parse(strStorage);
            for (let i= 0; i < panier.length; i++) {
                if (panier[i]._id !=productId) {
                    newPanier.push(panier[i]);
                }
            }
            panier=newPanier;
            localStorage.setItem("panier",JSON.stringify(panier));
            window.location.reload();
        }
    }

function sendForm (){
    let contact=
    {
        firstName:document.getElementById('Nom').value,
        lastName:document.getElementById('Prenom').value,
        address:document.getElementById('Adresse').value,
        city:document.getElementById('Ville').value, 
        email:document.getElementById('Mail').value,
    }
    let productSend=[];
    let strStorage=localStorage.getItem("panier");
        if (strStorage!==null){ 
            panier=JSON.parse(strStorage);
            for (let i= 0; i < panier._id.length; i++) {
            productSend.push(panier._id);
            }
        } 
    let objetSend= {
        contact,productSend,
    };
    console.log(productSend);
    requestSendObjet=JSON.stringify(objetSend);
    var request=new XMLHttpRequest();
    request.open('POST','http://localhost:3000/api/teddies/order');
                
    request.onreadystatechange=function () {
        if (request.readyState == XMLHttpRequest.DONE) {
            var response = JSON.parse(request.responseText);
            console.log("response:",response);
            localStorage.setItem('commande',request.responseText); 
            window.location.href="confimation.html";
        }
    };        
    request.setRequestHeader("Content-Type","application.json");
    request.send(requestSendObjet);

     
}