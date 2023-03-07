//CREA LA LISTA DI CATEGORIE 
function generateListCategorie() {
    $.ajax({
        // todo: sbagliato, devi chiamare il tuo server e internamente il tuo server contatta il backend
        url: 'http://localhost:3000/api/category/all',
        type: 'GET', //send it through get method
        dataType: "json",
        success: function (data, textStatus, xhr) {

            const obj = JSON.parse(xhr.responseText);
            var categories = JSON.stringify(obj.data)
            var categorie = JSON.parse(categories)
            console.log(categorie);
            creaCategorieDragDrop(categorie)
        },
        error: function (xhr, status, error) {
            alert("Auth ko")
            console.log(xhr.responseText);

        }
    });
}




function creaCategorieDragDrop(categories) {
    const categoriesList = document.getElementById("categories-list");
    categories.sort((a, b) => a.priority - b.priority)

    categories.forEach(category => {
        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = category.name;


        const label = document.createElement('label');
        label.classList.add('switch');

        const input = document.createElement('input');
        input.setAttribute('type', 'checkbox');

        if (category.priority === 0) {
            input.checked = false; // Imposta la casella di controllo come disattivata
        } else {
            input.checked = true; // Imposta la casella di controllo come attivata
        }
        
        label.appendChild(input);

            

        const slider = document.createElement('span');
        slider.classList.add('slider');
        label.appendChild(slider);

        li.appendChild(span);
        li.appendChild(label);
        categoriesList.appendChild(li);
    });

}





//RENDE LE CATEGORIE DRAG&DROP
$(function () {
    $(".categories").sortable({
        axis: "y",
        handle: "span",
        update: function (event, ui) {
            var position = ui.item.index() + 1;
            alert("La categoria " + ui.item.text() + " è stata spostata in posizione " + position);
        }
    });
});



//AGGIUNGE PRIORITA' ALLE CATEGORIE E CHIAMA LA STAMPA DEL MENU
function printMenu() {

    const categoriesList = document.querySelector('#categories-list');
    const listItems = categoriesList.querySelectorAll('li');

    listItems.forEach(function (li) {
        // esegui un'operazione su ciascun elemento li
        var position = Array.from(listItems).indexOf(li) + 1;
        const isChecked = li.querySelector('input[type="checkbox"]').checked;
        if(!isChecked)
           position=0;

        alert(`La categoria "${li.textContent}" è in posizione ${position} ed è ${isChecked ? "selezionata" : "non selezionata"}`);
        
        searchInListCategory(li.textContent, position)




    });

    /*selectWrappers.forEach((wrapper) => {
      const select = wrapper.querySelector('select');
      const id = select.value;
      const priority = wrapper.querySelector('.select-number').textContent;

      alert("Categoria " + id + "Priorità " + priority)
      var pos = priority


      $.ajax({
        // todo: sbagliato, devi chiamare il tuo server e internamente il tuo server contatta il backend
        url: '/api/category/priority/add/' + id,
        type: 'POST', //send it through get method
        dataType: "json",

        data: {
          priority: pos

        },
        success: function (data, textStatus, xhr) {


          alert("PRIORITA' AGGIUNTA")

          const token = data
          if (token) {
            sessionStorage.setItem("jwt", token);
            //  window.location.replace("dashboard");
            //addListOp(email,password,name,surname,role)

          }
        },
        error: function (xhr, status, error) {
          alert("Auth ko")
          console.log(xhr.responseText);

        }
      });



    });*/
}




// RESTITUISCE JSON DI TUTTE LE CATEGORIE
function searchInListCategory(nameCategory, position) {


    $.ajax({
        // todo: sbagliato, devi chiamare il tuo server e internamente il tuo server contatta il backend
        url: 'http://localhost:3000/api/category/all',
        type: 'GET', //send it through get method
        dataType: "json",



        success: function (data, textStatus, xhr) {

            const obj = JSON.parse(xhr.responseText);
            var categories = JSON.stringify(obj.data)
            var categorie = JSON.parse(categories)

            alert("CATEGORIA PASSATA: " + nameCategory + "POSIZIONE: " + position)
            console.log(categorie);


            //PRENDO L'ID DELLA CATEGORIA PASSATA

            const categoria = categorie.find(obj => obj.name === nameCategory);

            const id = categoria.id;
            alert(`L'id della categoria ${nameCategory} è ${id} in posizione ${position}`);


            addPriority(id, position)


        },
        error: function (xhr, status, error) {
            alert("Auth ko")
            console.log(xhr.responseText);

        }
    });



}





//CHIAMATA AJAX CHE INSERISCE LA PRIORITY AD UNA CATEGORIA PASSATA PER PARAMETRO
function addPriority(id, position) {
    alert("AJAX: id " + id + "Posizione: " + position)
    $.ajax({
        // todo: sbagliato, devi chiamare il tuo server e internamente il tuo server contatta il backend
        url: '/api/category/priority/add/' + id,
        type: 'POST', //send it through get method
        dataType: "json",

        data: {
            priority: position

        },
        success: function (data, textStatus, xhr) {


            alert("PRIORITA' AGGIUNTA")

            const token = data
            if (token) {
                sessionStorage.setItem("jwt", token);
                //  window.location.replace("dashboard");
                //addListOp(email,password,name,surname,role)

            }
        },
        error: function (xhr, status, error) {
            alert("Auth ko")
            console.log(xhr.responseText);

        }
    });
}