
function change() {

  //chiamata API per prendere nome e cognome dall'utente.

  var emailUser = sessionStorage.getItem("emailUtente");


  $.ajax({
    // todo: sbagliato, devi chiamare il tuo server e internamente il tuo server contatta il backend
    url: '/api/user/' + emailUser,
    type: 'GET', //send it through get method
    dataType: "json",



    success: function (data, textStatus, xhr) {

      //alert("CHANGE funziona")
      console.log(xhr.responseText)





      const obj = JSON.parse(xhr.responseText);
      var utente = JSON.stringify(obj.data)
      var user = JSON.parse(utente)

      //GESTISCO LA DASHBOARD
      if (window.location.pathname == "/dashboard") {

        var sign = document.getElementById("signUser").innerHTML = user.name + " " + user.surname;
      }

      //GESTISCO ORDINAZIONI
      if (window.location.pathname == "/ordinazioni") {

        var sign6 = document.getElementById("signUserOrder").innerHTML = user.name + " " + user.surname;
      }

      //GESTISCO IL PROFILO
      if (window.location.pathname == "/portate") {
        var sign2 = document.getElementById("signUserPortata").innerHTML =  user.name + " " + user.surname;             


      }

      //GESTISCO I DIPENDENTI
      if (window.location.pathname == "/dipendenti") {
        var sign4 = document.getElementById("signUser").innerHTML = user.name + " " + user.surname;

        //Genero la lista degli OP del ristorante(se esiste)






        //DISABILITA TASTO CREA OPERATORE SE NON ESISTE ANCORA IL RISTORANTE
        if (user.restaurantId == null)
          var sign3 = document.getElementById("addOp").disabled = true;

      }


      //GESTISCO L'ATTIVITA'
      if (window.location.pathname == "/attivita") {

        var sign5 = document.getElementById("signUser").innerHTML = user.name + " " + user.surname;
        var link = document.querySelector('.nav-link[href="/dipendenti"]');
        var link2 = document.querySelector('.nav-link[href="/dashboard"]');



        if(user.restaurantId == null){
          
          var tableModal = new bootstrap.Modal(document.getElementById('activityModal'));
          tableModal.show();
        }


        




        

      }


      //GESTISCO LA PAGINA DEL MENU
      if (window.location.pathname == "/menu") {

        var sign5 = document.getElementById("signUser").innerHTML = user.name + " " + user.surname;

      }












    },
    error: function (xhr, status, error) {
      //  alert("Auth ko")
      console.log(xhr.responseText);

    }
  });









}









function generateListOp() {


  $.ajax({
    // todo: sbagliato, devi chiamare il tuo server e internamente il tuo server contatta il backend
    url: '/api/get/all/user',
    type: 'GET', //send it through get method
    dataType: "json",



    success: function (data, textStatus, xhr) {

      const obj = JSON.parse(xhr.responseText);
      var utente = JSON.stringify(obj.data)
      var user = JSON.parse(utente)

      //filtro solo gli op escludendo gli admins
      const filteredUsers = user.filter(user => user.role !== "ADMIN");






      buildTable(filteredUsers)






    },
    error: function (xhr, status, error) {
      // alert("Auth ko")
      console.log(xhr.responseText);

    }
  });



}



function generateListAllergens() {


  $.ajax({
    // todo: sbagliato, devi chiamare il tuo server e internamente il tuo server contatta il backend
    url: '/api/allergens/all',
    type: 'GET', //send it through get method
    dataType: "json",



    success: function (data, textStatus, xhr) {

      const obj = JSON.parse(xhr.responseText);
      var allergens = JSON.stringify(obj.data)
      var allergeni = JSON.parse(allergens)


      console.log(allergeni);

      buildCheckBox(allergeni)






    },
    error: function (xhr, status, error) {
      //alert("Auth ko")
      console.log(xhr.responseText);

    }
  });



}




function buildCheckBox(data) {



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








function buildTable(data) {

  var table = document.getElementById('myTable')

  for (var i = 0; i < data.length; i++) {

    if (data[i].firstAccess == true) {
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
                    <div class="d-flex justify-content-end">
                      <button class="btn editOp" data-index="${i}">Elimina</button>
                    </div>
                  </td>`


    }

    else {
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
                    <div class="d-flex justify-content-end">
                      <button class="btn editOp" data-index="${i}">Elimina</button>
                    </div>
                  </td>
                  

                  </tr>`



    }





    table.innerHTML += row


  }

  var editButtons = document.querySelectorAll('.editOp');
  for (var j = 0; j < editButtons.length; j++) {
    editButtons[j].addEventListener('click', function (event) {
      var dataIndex = event.target.getAttribute('data-index');
      var user = data[dataIndex];

      console.log(user);
      var userDataString =
        'Name: ' +
        user.name +
        '\nid: ' +
        user.id +
        '\nSurname: ' +
        user.surname +
        '\nEmail: ' +
        user.email +
        '\nRole: ' +
        user.role;
      //alert(userDataString);












      // Apri la modal
      var editModal = new bootstrap.Modal(document.getElementById('editModal'));
      editModal.show();

      // Imposta i valori degli input con i dati dell'utente
      document.getElementById('idDipMod').value = user.id;
      document.getElementById('nameDipMod').value = user.name;
      document.getElementById('surnameDipMod').value = user.surname;
      document.getElementById('emailDipMod').value = user.email;
      document.getElementById('passwordDipMod').value = user.password;
      document.getElementById('roleMod').value = user.role;




    });
  }
}









//Elimina Dipendente
function deleteOp() {

  const idOp = document.getElementById('idDipMod').value


  $.ajax({
    // todo: sbagliato, devi chiamare il tuo server e internamente il tuo server contatta il backend
    url: '/api/user/' + idOp,
    type: 'DELETE', //send it through get method
    dataType: "json",



    success: function (data, textStatus, xhr) {

      alert("UTENTE ELIMINATO CORRETTAMENTE!")






    },
    error: function (xhr, status, error) {
      alert("ERRORE ELIMINAZIONE UTENTE!")
      console.log(xhr.responseText);

    }
  });
}



function closeModal() {
  var editModal = document.getElementById('editModal');
  var bootstrapModal = bootstrap.Modal.getInstance(editModal);
  bootstrapModal.hide();
  location.reload();


}






function generateListCategorie() {


  $.ajax({
    // todo: sbagliato, devi chiamare il tuo server e internamente il tuo server contatta il backend
    url: '/api/category/all',
    type: 'GET', //send it through get method
    dataType: "json",



    success: function (data, textStatus, xhr) {

      const obj = JSON.parse(xhr.responseText);
      var categories = JSON.stringify(obj.data)
      var categorie = JSON.parse(categories)


      console.log(categorie);

      buildSelect(categorie)






    },
    error: function (xhr, status, error) {
      //alert("Auth ko")
      console.log(xhr.responseText);

    }
  });



}


function buildSelect(categorie) {

  const elementi = categorie;
  const selectElementi = document.getElementById("select_elementi");
  const inputNuovoElemento = document.getElementById("input_nuovo_elemento");
  const btnAggiungi = document.getElementById("btn_aggiungiCtg");



  // Creazione dell'opzione "Null"
  const optionNull = document.createElement("option");
  optionNull.value = "null";
  optionNull.text = "Nessuna";
  optionNull.selected = true; // Imposta l'opzione come selezionata

  // Aggiunta dell'opzione al selettore
  selectElementi.add(optionNull);

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
        alert("CATEGORIA GIA' ESISTENTE!")
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



function createCategory(nuovoElemento) {

  $.ajax({
    // todo: sbagliato, devi chiamare il tuo server e internamente il tuo server contatta il backend
    url: '/api/category/add',
    type: 'POST', //send it through get method
    dataType: "json",
    data: {

      name: nuovoElemento
    },



    success: function (data, textStatus, xhr) {

      alert("CATEGORIA CREATA CORRETTAMENTE!")






    },
    error: function (xhr, status, error) {
      alert("ERRORE CREAZIONE CATEGORIA")
      console.log(xhr.responseText);

    }
  });



}


function addAllergensDb() {

  const allergenNames = [
    'mandorla',
    'arachidi',
    'glutine',
    'uova',
    'latte',
    'soia',
    'crostacei',
    'pesce',
    'noci',
    'sedano',
    'senape',
    'sesamo',
    'solfiti',
    'lupini'
  ];

  const apiUrl = '/api/allergens/add';

  for (let i = 0; i < allergenNames.length; i++) {
    const body = {
      id: null,
      name: allergenNames[i]
    };

    $.ajax({
      url: apiUrl,
      type: 'POST',
      data: JSON.stringify(body),
      contentType: 'application/json',
      success: function (response) {
        console.log(`Allergen "${allergenNames[i]}" inserted successfully.`);
      },
      error: function (xhr, status, error) {
        console.error(`Error inserting allergen "${allergenNames[i]}":`, error);
      }
    });
  }

}


function logout() {
  // Rimuovi il token di accesso o altre informazioni di autenticazione
  sessionStorage.removeItem('jwt');



  // Reindirizza alla pagina di login
  window.location.replace('/login');
}













