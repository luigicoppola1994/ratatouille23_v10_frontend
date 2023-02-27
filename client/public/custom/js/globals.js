

   function change() {

   //chiamata API per prendere nome e cognome dall'utente.
    
   var emailUser = sessionStorage.getItem("emailUtente");


    

    $.ajax({
      // todo: sbagliato, devi chiamare il tuo server e internamente il tuo server contatta il backend
      url: 'http://localhost:3000/api/user/'+emailUser,
      type: 'GET', //send it through get method
        dataType: "json",
   
      
  
      success: function(data, textStatus, xhr) {
console.log(xhr.responseText)

      



const obj = JSON.parse(xhr.responseText);
var utente = JSON.stringify(obj.data)
var user = JSON.parse(utente)

//GESTISCO LA DASHBOARD
if(window.location.pathname == "/dashboard"){
  var sign = document. getElementById("signUser").innerHTML= user.name + " " +user.surname;




}


//GESTISCO IL PROFILO
if(window.location.pathname == "/profilo"){
  var sign2 = document. getElementById("emailProfilo").setAttribute("value",user.email);



}

//GESTISCO I DIPENDENTI
if(window.location.pathname == "/dipendenti"){

  //DISABILITA TASTO CREA OPERATORE SE NON ESISTE ANCORA IL RISTORANTE
  if(user.restaurantId == null)
    var sign3 = document. getElementById("addOp").disabled = true;

}


//GESTISCO L'ATTIVITA'
if(window.location.pathname == "/attivita"){
 
  //TASTO AGGIUNGI DELL'ATTIVITA' DIVENTA MODIFICA SE HO GIA' INSERITO UN RISTORANTE
  if(user.restaurantId != null)
    var sign4 = document.getElementById("addPut").innerHTML = "Modifica"

    


}











        

          
          
          
      },
      error: function(xhr, status, error) {
          alert("Auth ko")
          console.log(xhr.responseText);

      }
  });









}

