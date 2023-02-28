
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
  
 

  const tbody = document.querySelector("#checkbox-table tbody");
  const submitButton = document.querySelector("#submit-button");

  // Popola la tabella con le checkbox
  data.forEach((item) => {
    const tr = document.createElement("tr");
    const tdId = document.createElement("td");
    const tdName = document.createElement("td");
    const tdCheckbox = document.createElement("td");
    const checkbox = document.createElement("input");

    tdId.textContent = item.id;
    tdName.textContent = item.name;

    checkbox.type = "checkbox";
    checkbox.value = item.id;

    tdCheckbox.appendChild(checkbox);

    tr.appendChild(tdId);
    tr.appendChild(tdName);
    tr.appendChild(tdCheckbox);

    tbody.appendChild(tr);
  });





 

 


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




function generateListCategorie(){


  $.ajax({
       // todo: sbagliato, devi chiamare il tuo server e internamente il tuo server contatta il backend
       url: 'http://localhost:3000/api/category/all',
       type: 'GET', //send it through get method
         dataType: "json",
    
       
   
       success: function(data, textStatus, xhr) {
        
         const obj = JSON.parse(xhr.responseText);
         var categories = JSON.stringify(obj.data)
         var categorie = JSON.parse(categories)   
         
         
         console.log(categorie);

         buildSelect(categorie)
        
 
 
 
         
                   
       },
       error: function(xhr, status, error) {
           alert("Auth ko")
           console.log(xhr.responseText);
 
       }
   });
 
 
 
 } 


 function buildSelect(categorie){
  
  const elementi = categorie;
  const selectElementi = document.getElementById("select_elementi");
  const inputNuovoElemento = document.getElementById("input_nuovo_elemento");
  const btnAggiungi = document.getElementById("btn_aggiungiCtg");

  // Popola la select con gli elementi
  for (const elemento of elementi) {
    const option = document.createElement("option");
    option.value = elemento.id;
    option.text = elemento.name;
    selectElementi.add(option);
  }
  btnAggiungi.addEventListener("click", (event) => {
    event.preventDefault();
    const nuovoElemento = inputNuovoElemento.value.trim();
  
    if (nuovoElemento !== "") {
      const elementoPresente = elementi.find((el) => el.name === nuovoElemento);
      if (elementoPresente) {
        // l'elemento è già presente nella select, non fare nulla
        alert("Categoria già esistente!")
        inputNuovoElemento.value = "";
        return;
      }
      
  
      const nuovoId = Math.max(...elementi.map((el) => el.id)) + 1;
      const nuovoElementoObj = { id: nuovoId, name: nuovoElemento };
      //createCategory(nuovoElemento);
      elementi.push(nuovoElementoObj);
  
      const option = document.createElement("option");
      option.value = nuovoElementoObj.id;
      option.text = nuovoElementoObj.name;
      selectElementi.add(option);
     inputNuovoElemento.value = "";
    }
  });




 }



 function createCategory(nuovoElemento){

  $.ajax({
    // todo: sbagliato, devi chiamare il tuo server e internamente il tuo server contatta il backend
    url: 'http://localhost:3000/api/category/add',
    type: 'POST', //send it through get method
      dataType: "json",
      data: {
       
        name: nuovoElemento
      },
 
    

    success: function(data, textStatus, xhr) {
     
       alert( " Categoria inserita")
     



      
                
    },
    error: function(xhr, status, error) {
        alert("Errore inserimento categoria")
        console.log(xhr.responseText);

    }
});



} 








