// *********************************************************************************************************
//                  FUNZIONI PER /portata
// *********************************************************************************************************


function buildTableDishes() {

  
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


    alert("AXIOS")




    const dishesComplete = dishes.map(dish => {
      const categoryName = category.find(cat => cat.id === dish.categoryId)?.name || '';
      const allergenNames = dishes_allergens.filter(da => da.dishId === dish.id)
        .map(da => allergens.find(a => a.id === da.allergenId)?.name)
        .join(', ');
      return {
        name: dish.name,
        description: dish.description,
        cost: dish.cost,
        categoryName,
        nameAllergens: allergenNames
      };
    });

    popolaDishes(dishesComplete)




  })).catch(error => {
    console.log(error);
  });

}



function  popolaDishes(dishesComplete){

// Seleziona la tabella nel DOM
const table = document.getElementById('myTableDishesComplete');
// Esempio di dati JSON
const data = dishesComplete
alert(typeof dishesComplete)

  // Itera sull'array di oggetti JSON e crea una nuova riga per ogni oggetto
for (let i = 0; i < data.length; i++) {




  const row = table.insertRow();

  // Crea le celle della riga e assegna i valori delle proprietà degli oggetti JSON
  const cell1 = row.insertCell();
  cell1.innerHTML = `<div class="d-flex px-2 py-1">
                        <div>
                          <img src="../vendor/argon/img/meal.png" class="avatar avatar-sm me-3" alt="user1">
                        </div>
                        <div class="d-flex flex-column justify-content-center">
                          <h6 class="mb-0 text-sm">${data[i].name}</h6>
                          <p class="text-xs text-secondary mb-0">${data[i].description}</p>
                          <p class="text-xs text-secondary mb-0">${data[i].description}</p>

                        </div>
                      </div>`;

  const cell2 = row.insertCell();
  cell2.innerHTML = `<span class="text-xs text-secondary mb-0">${data[i].nameAllergens}</span>`;

  const cell3 = row.insertCell();
  cell3.innerHTML = `<p class="text-xs font-weight-bold mb-0">${data[i].categoryName}</p>`;

  const cell4 = row.insertCell();
  cell4.innerHTML = `<p class="text-xs font-weight-bold mb-0">${data[i].cost}</p>
  <p class="text-xs text-secondary mb-0">euro</p>`;

  const cell5 = row.insertCell();
  cell5.innerHTML = `<a href="javascript:;" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit ">
                        Edit
                      </a>`;
}


}
  






































// Restituisce un array di ID delle checkbox selezionate
function getSelectedCheckboxes() {
  const checkboxes = document.querySelectorAll("#checkbox-table tbody input[type='checkbox']");
  const selected = [];
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      selected.push(parseInt(checkbox.value));
    }
  });
  return selected;
}





function addPortata() {

  var nomePortata = document.getElementById("search").value
  var descPortata = descrizioneInput.value
  var allergeniPortata = getSelectedCheckboxes();


  var selectDaVerificare = document.getElementById("select_elementi");
  var indiceSelezionato = selectDaVerificare.selectedIndex;
  var valoreSelezionato = selectDaVerificare.options[indiceSelezionato];
  var valoreDentroLopzione = valoreSelezionato.value;
  var categoria = valoreSelezionato.text;


  var prezzo = document.getElementById("price").value








  $.ajax({
    // todo: sbagliato, devi chiamare il tuo server e internamente il tuo server contatta il backend
    url: 'http://localhost:3000/api/dish/add',
    type: 'POST', //send it through get method
    dataType: "json",

    data: {
      name: nomePortata,
      description: descPortata,
      allergens: allergeniPortata,
      cost: prezzo,
      categoryName: categoria,

    },
    success: function (data, textStatus, xhr) {


      alert("PORTATA AGGIUNTA")

      const token = data
      if (token) {
        sessionStorage.setItem("jwt", token);
        window.location.replace("dashboard");
        //addListOp(email,password,name,surname,role)

      }
    },
    error: function (xhr, status, error) {
      alert("Auth ko")
      console.log(xhr.responseText);

    }
  });

}





/*


function generateListDishes() {


  $.ajax({
    // todo: sbagliato, devi chiamare il tuo server e internamente il tuo server contatta il backend
    url: 'http://localhost:3000/api/dish/all',
    type: 'GET', //send it through get method
    dataType: "json",



    success: function (data, textStatus, xhr) {

      const obj = JSON.parse(xhr.responseText);
      var portata = JSON.stringify(obj.data)
      var dishes = JSON.parse(portata)
      console.log(dishes)
      alert("successo")

      buildTableNew(dishes)






    },
    error: function (xhr, status, error) {
      alert("Auth ko")
      console.log(xhr.responseText);

    }
  });



}
*/
/*

function buildTableNew() {






  axios.all([
    axios.get('/api/dish/all'),
    axios.get('/api/category/all'),
    axios.get('/api/allergens/all'),
    axios.get('/api/dishallergens/all')
  ]).then(axios.spread((dishesRes, categoriesRes, allergensRes, dishAllergensRes) => {





    let obj1 = JSON.parse(JSON.stringify(dishesRes.data));
    const dishes = JSON.parse(JSON.stringify(obj1.data))

    alert(JSON.stringify(dishes))

    let obj2 = JSON.parse(JSON.stringify(categoriesRes.data));
    const category = JSON.parse(JSON.stringify(obj2.data))

    let obj3 = JSON.parse(JSON.stringify(allergensRes.data));
    const allergens = JSON.parse(JSON.stringify(obj3.data));

    let obj4 = JSON.parse(JSON.stringify(dishAllergensRes.data));
    const dishes_allergens = JSON.parse(JSON.stringify(obj4.data));


    alert("AXIOS")




    const dishesComplete = dishes.map(dish => {
      const categoryName = category.find(cat => cat.id === dish.categoryId)?.name || '';
      const allergenNames = dishes_allergens.filter(da => da.dishId === dish.id)
        .map(da => allergens.find(a => a.id === da.allergenId)?.name)
        .join(', ');
      return {
        name: dish.name,
        description: dish.description,
        cost: dish.cost,
        categoryName,
        nameAllergens: allergenNames
      };
    });

    alert(JSON.stringify(dishesComplete))

    var table = document.getElementById("myTableDishes");

    for (var i = 0; i < dishesComplete.length; i++) {


      var row = `<tr>
                    <td>
                      <div class="d-flex px-2 py-1">
                        <div>
                          <img src="../vendor/argon/img/team-2.jpg" class="avatar avatar-sm me-3" alt="user1">
                        </div>
                        <div class="d-flex flex-column justify-content-center">
                          <h6 class="mb-0 text-sm">${dishesComplete[i].name} ${data[i].surname}</h6>
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

      table.innerHTML += row



    }





  })).catch(error => {
    console.log(error);
  });

}




















function creaJsonDishCategories() {
  axios.all([
    axios.get('/api/dish/all'),
    axios.get('/api/category/all'),
    axios.get('/api/allergens/all'),
    axios.get('/api/dishallergens/all')
  ]).then(axios.spread((dishesRes, categoriesRes, allergensRes, dishAllergensRes) => {


    let dishes = dishesRes.data;
    let categories = categoriesRes.data;
    let allergens = allergensRes.data;
    let dishAllergens = dishAllergensRes.data;








  })).catch(error => {
    console.log(error);
  });
}




//CREA MENU IN TABELLA /creamenu
function getDishesByCategory(idCategory) {
  axios.all([
    axios.get('/api/dish/category/' + idCategory),
    axios.get('/api/category/all'),
    axios.get('/api/allergens/all'),
    axios.get('/api/dishallergens/all')
  ]).then(axios.spread((dishesRes, categoriesRes, allergensRes, dishAllergensRes) => {





    let obj1 = JSON.parse(JSON.stringify(dishesRes.data));
    const dishes = JSON.parse(JSON.stringify(obj1.data))

    alert(JSON.stringify.data)



    let obj2 = JSON.parse(JSON.stringify(categoriesRes.data));
    const category = JSON.parse(JSON.stringify(obj2.data))

    let obj3 = JSON.parse(JSON.stringify(allergensRes.data));
    const allergens = JSON.parse(JSON.stringify(obj3.data));

    let obj4 = JSON.parse(JSON.stringify(dishAllergensRes.data));
    const dishes_allergens = JSON.parse(JSON.stringify(obj4.data));







    const dishesComplete = dishes.map(dish => {
      const categoryName = category.find(cat => cat.id === dish.categoryId)?.name || '';
      const allergenNames = dishes_allergens.filter(da => da.dishId === dish.id)
        .map(da => allergens.find(a => a.id === da.allergenId)?.name)
        .join(', ');
      return {
        name: dish.name,
        nameLan: dish.nameLan,
        description: dish.description,
        descriptionLan: dish.descriptionLan,
        cost: dish.cost,
        categoryName,
        nameAllergens: allergenNames
      };
    });
    alert(JSON.stringify(dishesComplete))

    // selezionare il nodo HTML in cui inserire la tabella
    const listNode = document.querySelector('.list-group');

    // variabile che conterrà l'intero contenuto della tabella
    let htmlContent = '';

    // ciclo for per attraversare l'array di oggetti data
    for (const dishComplete of dishesComplete) {
      // creazione della stringa HTML per ogni oggetto
      const htmlString = `
    <li class="list-group-item border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg">
      <div class="d-flex flex-column">
        <h6 class="mb-3 text-lg">${dishComplete.name}</h6>
        <span class="mb-2 text-xs">Ingredienti:<span class="text-dark font-weight-bold ms-sm-2">${dishComplete.description}</span></span>
        <span class="mb-2 text-xs">Allergeni:<span class="text-dark ms-sm-2 font-weight-bold">${dishComplete.nameAllergens}</span></span>
        <span class="text-xs">Prezzo:<span class="text-dark ms-sm-2 font-weight-bold">${dishComplete.cost} euro</span></span>
      </div>
      <div class="ms-auto text-end">
        <a class="btn btn-link text-danger text-gradient px-3 mb-0" href="javascript:;"><i class="far fa-trash-alt me-2"></i>Chiudi</a>
        <a class="btn btn-link text-dark px-3 mb-0" href="javascript:;"><i class="fas fa-pencil-alt text-dark me-2" aria-hidden="true"></i>Dettagli</a>
      </div>
    </li>
  `;

      // aggiunta della stringa HTML alla variabile htmlContent
      htmlContent += htmlString;
      //Inserimento nome categoria
      document.getElementById("nameCategoryMenu").innerHTML = upperFirstLetter(dishComplete.categoryName)
    }

    // inserimento del contenuto della tabella nel nodo HTML
    listNode.innerHTML = htmlContent;






  }));


}



function upperFirstLetter(stringa) {
  return stringa.charAt(0).toUpperCase() + stringa.slice(1)
}




//CREA JSON SUDDIVIDENDO LE PORTATE NELLE VARIE CATEGORIE (JSONSTAMPAMENU )

function printMenu() {
  // Esempio dati
  const dishes = [
    { name: "Pizza margherita", description: "Classica pizza italiana", cost: 8.5, categoryName: "Pizza", allergenNames: ["Glutine"], idDish: 1, idCategory: 1 },
    { name: "Lasagne al ragù", description: "Tipico primo piatto italiano", cost: 12, categoryName: "Pizza", allergenNames: ["Glutine", "Lattosio"], idDish: 2, idCategory: 1 },
    { name: "Tiramisù", description: "Classico dolce italiano al caffè", cost: 5.5, categoryName: "Dessert", allergenNames: ["Glutine", "Lattosio"], idDish: 3, idCategory: 3 },
    { name: "Insalata mista", description: "Insalata con pomodoro, lattuga, carote e olive", cost: 6, categoryName: "Insalate", allergenNames: [], idDish: 4, idCategory: 4 },
  ];

  // Creazione dell'oggetto per le categorie e le portate
  const categories = {};
  dishes.forEach((dish) => {
    if (!categories[dish.categoryName]) {
      categories[dish.categoryName] = [];
    }
    categories[dish.categoryName].push({
      name: dish.name,
      description: dish.description,
      cost: dish.cost,
      allergenNames: dish.allergenNames,
      idDish: dish.idDish,
      idCategory: dish.idCategory,
    });
  });

  // Creazione del JSON
  const jsonCategories = JSON.stringify(categories);

  console.log(jsonCategories);
  buildPrintMenu(jsonCategories);

}


function buildPrintMenu(dishesComplete) {

  const menu = { "Pizza": [{ "name": "Pizza margherita", "description": "Classica pizza italiana", "cost": 8.5, "allergenNames": ["Glutine"], "idDish": 1, "idCategory": 1 }, { "name": "Lasagne al ragù", "description": "Tipico primo piatto italiano", "cost": 12, "allergenNames": ["Glutine", "Lattosio"], "idDish": 2, "idCategory": 1 }], "Dessert": [{ "name": "Tiramisù", "description": "Classico dolce italiano al caffè", "cost": 5.5, "allergenNames": ["Glutine", "Lattosio"], "idDish": 3, "idCategory": 3 }], "Insalate": [{ "name": "Insalata mista", "description": "Insalata con pomodoro, lattuga, carote e olive", "cost": 6, "allergenNames": [], "idDish": 4, "idCategory": 4 }] };

  const list = document.querySelector('.list-group');

  Object.keys(menu).forEach(category => {
    const categoryTitle = document.createElement('h2');
    categoryTitle.textContent = category;
    list.appendChild(categoryTitle);

    menu[category].forEach(item => {
      const listItem = document.createElement('li');
      listItem.classList.add('list-group-item');

      const itemTitle = document.createElement('h3');
      itemTitle.textContent = item.name;
      listItem.appendChild(itemTitle);

      const itemDescription = document.createElement('p');
      itemDescription.textContent = item.description;
      listItem.appendChild(itemDescription);

      const itemAllergens = document.createElement('p');
      itemAllergens.textContent = "ALLERGENI:" + item.allergenNames;
      listItem.appendChild(itemAllergens);

      const itemCost = document.createElement('span');
      itemCost.classList.add('badge', 'bg-primary', 'rounded-pill');
      itemCost.textContent = `€${item.cost.toFixed(2)}`;
      listItem.appendChild(itemCost);

      list.appendChild(listItem);
    });
  });





}*/