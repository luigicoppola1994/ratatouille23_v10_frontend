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
           // alert("La categoria " + ui.item.text() + " è stata spostata in posizione " + position);
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

        //alert(`La categoria "${li.textContent}" è in posizione ${position} ed è ${isChecked ? "selezionata" : "non selezionata"}`);
        
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

            //alert("CATEGORIA PASSATA: " + nameCategory + "POSIZIONE: " + position)
            console.log(categorie);


            //PRENDO L'ID DELLA CATEGORIA PASSATA

            const categoria = categorie.find(obj => obj.name === nameCategory);

            const id = categoria.id;
          //  alert(`L'id della categoria ${nameCategory} è ${id} in posizione ${position}`);


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
    //alert("AJAX: id " + id + "Posizione: " + position)
    $.ajax({
        // todo: sbagliato, devi chiamare il tuo server e internamente il tuo server contatta il backend
        url: '/api/category/priority/add/' + id,
        type: 'POST', //send it through get method
        dataType: "json",

        data: {
            priority: position

        },
        success: function (data, textStatus, xhr) {


            //alert("PRIORITA' AGGIUNTA")

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



//CREA IL JSON CON TUTTE LE INFORMAZIONI SULLE CATEGORIE E ALLERGENI

function creaJSONdish() {






    axios.all([
      axios.get('/api/dish/all'),
      axios.get('/api/category/all'),
      axios.get('/api/allergens/all'),
      axios.get('/api/dishallergens/all')
    ]).then(axios.spread((dishesRes, categoriesRes, allergensRes, dishAllergensRes) => {





      let obj1 = JSON.parse(JSON.stringify(dishesRes.data));
      const dishes = JSON.parse(JSON.stringify(obj1.data))



      let obj2 = JSON.parse(JSON.stringify(categoriesRes.data));
      const category = JSON.parse(JSON.stringify(obj2.data))

      let obj3 = JSON.parse(JSON.stringify(allergensRes.data));
      const allergens = JSON.parse(JSON.stringify(obj3.data));

      let obj4 = JSON.parse(JSON.stringify(dishAllergensRes.data));
      const dishes_allergens = JSON.parse(JSON.stringify(obj4.data));

      //alert(JSON.stringify(obj2.data))







      const dishesComplete = dishes.map(dish => {
        const categoryName = category.find(cat => cat.id === dish.categoryId)?.name || '';
        const categorys = category.find(cat => cat.id === dish.categoryId);
         const priority = categorys ? categorys.priority : null;


        const allergenNames = dishes_allergens.filter(da => da.dishId === dish.id)
          .map(da => allergens.find(a => a.id === da.allergenId)?.name)
          .join(', ');
        return {
          name: dish.name,
          description: dish.description,
          cost: dish.cost,
          categoryName,
          nameAllergens: allergenNames,
          idDish: dish.id,
          idCategory: dish.categoryId,
          priority : priority

        };
      });

      console.log(dishesComplete);
      printMenuRes(dishesComplete);




    })).catch(error => {
      console.log(error);
    });


  }



  //PRENDE IL JSON COMPLETO DI TUTTE LE INFO E CREA UN NUOVO JSON DOVE OGNI PORTATA E' ORDINATA NELLA PROPRIA CATEGORIA 
  //A SUA VOLTA ORDINATA IN MODO CRESCENTE IN BASE ALLA PRIORITY
  function printMenuRes(dishesComplete){
    const menuElement = document.querySelector('.menu');
  
    const result = dishesComplete.reduce((acc, curr) => {
      const categoryName = curr.categoryName;
      if (!acc[categoryName]) {
        acc[categoryName] = [];
      }
      acc[categoryName].push(curr);
      return acc;
    }, {});
    
    const orderedCategories = Object.keys(result).filter(category => {
      return result[category][0].priority > 0;
    }).sort((a, b) => {
      return result[a][0].priority - result[b][0].priority;
    });
    
    const orderedResult = {};
    orderedCategories.forEach((category) => {
      orderedResult[category] = result[category];
    });
    
    console.log(orderedResult);
    Object.keys(orderedResult).forEach((categoryName) => {
      const categoryElement = document.createElement('div');
      categoryElement.classList.add('category');
    
      const categoryTitleElement = document.createElement('h2');
      categoryTitleElement.innerText = categoryName;
      categoryElement.appendChild(categoryTitleElement);
    
      const dishes = orderedResult[categoryName];
    
      dishes.forEach((dish) => {
        const dishElement = document.createElement('div');
    
        const dishNameElement = document.createElement('h3');
        dishNameElement.innerText = dish.name;
        dishElement.appendChild(dishNameElement);
        
        const dishPriceElement = document.createElement('p');
        dishPriceElement.classList.add('dish-price');
        dishPriceElement.innerText = dish.cost + '€';
        dishElement.appendChild(dishPriceElement);
    
        const dishDescriptionElement = document.createElement('p');
        dishDescriptionElement.classList.add('dish-description');
        dishDescriptionElement.innerText = dish.description;
        dishElement.appendChild(dishDescriptionElement);
    
        const dishAllergensElement = document.createElement('p');
        dishAllergensElement.classList.add('dish-allergens');
        dishAllergensElement.innerText = 'Allergeni: ' + dish.nameAllergens;
        dishElement.appendChild(dishAllergensElement);
    
        categoryElement.appendChild(dishElement);
      });
    
      menuElement.appendChild(categoryElement);
    });
  }
  

  function updateMenu() {
    const menuElement = document.querySelector('.menu');
    while (menuElement.firstChild) {
      menuElement.removeChild(menuElement.firstChild);
    }
    // Chiamata a printMenuRes con la nuova lista di portate aggiornata
    printMenuRes(newDishesList);
  }