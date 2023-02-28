
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
  var sign4 = document. getElementById("signUser").innerHTML= user.name + " " +user.surname;

  //Genero la lista degli OP del ristorante(se esiste)
  





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









function generateListOp(){


 $.ajax({
      // todo: sbagliato, devi chiamare il tuo server e internamente il tuo server contatta il backend
      url: 'http://localhost:3000/api/restaurant/users/SUPERVISOR',
      type: 'GET', //send it through get method
        dataType: "json",
   
      
  
      success: function(data, textStatus, xhr) {
       
        const obj = JSON.parse(xhr.responseText);
        var utente = JSON.stringify(obj.data)
        var user = JSON.parse(utente)   
        
        
        buildTable(user)
       



        
                  
      },
      error: function(xhr, status, error) {
          alert("Auth ko")
          console.log(xhr.responseText);

      }
  });



} 




function generateListAllergens(){


  $.ajax({
       // todo: sbagliato, devi chiamare il tuo server e internamente il tuo server contatta il backend
       url: 'http://localhost:3000/api/allergens/all',
       type: 'GET', //send it through get method
         dataType: "json",
    
       
   
       success: function(data, textStatus, xhr) {
        
         const obj = JSON.parse(xhr.responseText);
         var allergens = JSON.stringify(obj.data)
         var allergeni = JSON.parse(allergens)   
         
         
         console.log(allergeni);

         buildCheckBox(allergeni)
        
 
 
 
         
                   
       },
       error: function(xhr, status, error) {
           alert("Auth ko")
           console.log(xhr.responseText);
 
       }
   });
 
 
 
 } 




function buildCheckBox(data){
  
  


var checkboxsection=[];


  for (var i = 0; i < data.length; i++){

  
  var checkboxtemp=' <label> '+
        '<input class="multibox" type="checkbox" value="'+data[i].id+'" name="allergeno">'+data[i].name+'</label>';
     checkboxsection.push(checkboxtemp);      
  
};

$(".checkbox").html(checkboxsection.join(""));



}







function buildTable(data){
 
  var table = document.getElementById('myTable')

  for (var i = 0; i < data.length; i++){

    if(data[i].firstAccess==true){
      var row = `<tr>
                    <td>
                      <div class="d-flex px-2 py-1">
                        <div>
                          <img src="../vendor/argon/img/team-2.jpg" class="avatar avatar-sm me-3" alt="user1">
                        </div>
                        <div class="d-flex flex-column justify-content-center">
                          <h6 class="mb-0 text-sm">${data[i].name} ${data[i].surname}</h6>
                          <p class="text-xs text-secondary mb-0">${data[i].email}</p>
                        </div>
                      </div>
                    </td>
                   
                    <td class="align-center">
                      <span class="text-xs text-secondary mb-0">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp#${data[i].id}</span>
                    </td>
                    <td>
                    <p class="text-xs font-weight-bold mb-0">${data[i].role}</p>
                    <p class="text-xs text-secondary mb-0">Ristorante</p>
                  </td>
                    <td class="align-middle text-center text-sm">
                      <span class="badge badge-sm bg-gradient-success">ATTIVO</span>
                    </td>
                    <td class="align-middle">
                      <a href="javascript:;" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">
                        Edit
                      </a>
                    </td>
                  </tr>`


    }

    else{
      var row = `<tr>
                    <td>
                      <div class="d-flex px-2 py-1">
                        <div>
                          <img src="../vendor/argon/img/team-2.jpg" class="avatar avatar-sm me-3" alt="user1">
                        </div>
                        <div class="d-flex flex-column justify-content-center">
                          <h6 class="mb-0 text-sm">${data[i].name} ${data[i].surname}</h6>
                          <p class="text-xs text-secondary mb-0">${data[i].email}</p>
                        </div>
                      </div>
                    </td>
                   
                    <td class="align-center">
                      <span class="text-xs text-secondary mb-0">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp#${data[i].id}</span>
                    </td>
                    <td>
                    <p class="text-xs font-weight-bold mb-0">${data[i].role}</p>
                    <p class="text-xs text-secondary mb-0">Ristorante</p>
                  </td>
                    <td class="align-middle text-center text-sm">
                    <span class="badge badge-sm bg-gradient-secondary">Inattivo</span>
                    </td>
                    <td class="align-middle">
                      <a href="javascript:;" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">
                        Edit
                      </a>
                    </td>
                  </tr>`






    }


    


                  table.innerHTML += row


  }
}