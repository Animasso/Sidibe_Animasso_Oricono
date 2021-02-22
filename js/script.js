
 var request=XMLHttpRequest();
 request.onreadystatechange=function(){
     if(this.onreadystatechange==XMLHttpRequest.DONE&&this.status==200){
         var response=JSON.parse(this.responseText);
     }
 };
request.open('GET','http://localhost:3000/api/teddies');
request.send();