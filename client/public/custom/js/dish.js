


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


      buildTable(dishes)






    },
    error: function (xhr, status, error) {
      alert("Auth ko")
      console.log(xhr.responseText);

    }
  });



}



function buildTable(data) {

  creaJsonDishCategories();

  var tableBody = document.getElementById("myTable");



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


        for (var i = 0; i < data.length; i++) {
          var row = tableBody.insertRow(i);
      
          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);
          var cell3 = row.insertCell(2);
          var cell4 = row.insertCell(3);
          var cell5 = row.insertCell(4)
          var cell6 = row.insertCell(5)
          
          
          cell1.innerHTML = dishesComplete[i].name;
          cell2.innerHTML =  dishesComplete[i].description;
          cell3.innerHTML =  dishesComplete[i].categoryName
          cell4.innerHTML = dishesComplete[i].nameAllergens
          cell5.innerHTML =  dishesComplete[i].cost;
          const editCell = row.insertCell();
          const editButton = document.createElement('button'); // create button
          editButton.textContent = 'Elimina'; // set text
          editButton.addEventListener('click', () => {
            editPortata(row,cell1.innerHTML); // call editPortata function with row parameter
          });
          editCell.appendChild(editButton); // add button to cell
        


///// da modificare
          function editPortata(row,cell) {
           //tableBody.deleteRow(row)
          alert(cell);

            var nomePortata = document.getElementById("search")
            nomePortata.value = row.cell1.value;
            
            // show card and fill with data
            cardContainer.style.display = 'block';
            searchInput.value = row.cells[0].textContent;
            descrizioneInput.value = row.cells[1].textContent;
            const categoryValue = row.cells[2].textContent;
            if (selectElementi.querySelector(`option[value="${categoryValue}"]`)) {
              selectElementi.value = categoryValue;
            } else {
              inputNuovoElemento.value = categoryValue;
            }
            const allergensValues = row.cells[3].textContent.split(', ');
            allergensCheckboxes.forEach(c => c.checked = allergensValues.includes(c.value));
            priceInput.value = row.cells[4].textContent;
            // add event listener to "Create Portata" button to update the row
            addPortataButton.removeEventListener('click', addPortata);
            addPortataButton.addEventListener('click', () => {
              updatePortata(row);
            });
            addPortataButton.textContent = 'Update Portata';
            // scroll to top of the page to show the card
            window.scrollTo(0, 0);
          }
         
          
          
          
          
          

          
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
  ]).then(axios.spread(( dishesRes, categoriesRes, allergensRes , dishAllergensRes) => {


    let dishes = dishesRes.data;
    let categories = categoriesRes.data;
    let allergens = allergensRes.data;
    let dishAllergens = dishAllergensRes.data;


  
    



    
  })).catch(error => {
    console.log(error);
  });
}

  


//CREA MENU IN TABELLA /creamenu
function getDishesByCategory(idCategory){
  axios.all([
    axios.get('/api/dish/category/'+idCategory),
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
 document.getElementById("nameCategoryMenu").innerHTML= upperFirstLetter(dishComplete.categoryName)
 }

// inserimento del contenuto della tabella nel nodo HTML
listNode.innerHTML = htmlContent;





  
  }));


}



function upperFirstLetter(stringa){
  return stringa.charAt(0).toUpperCase() +stringa.slice(1)
}




//CREA JSON SUDDIVIDENDO LE PORTATE NELLE VARIE CATEGORIE (JSONSTAMPAMENU )

function printMenu(){
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


function buildPrintMenu(dishesComplete){
  
  const menu = {"Pizza":[{"name":"Pizza margherita","description":"Classica pizza italiana","cost":8.5,"allergenNames":["Glutine"],"idDish":1,"idCategory":1},{"name":"Lasagne al ragù","description":"Tipico primo piatto italiano","cost":12,"allergenNames":["Glutine","Lattosio"],"idDish":2,"idCategory":1}],"Dessert":[{"name":"Tiramisù","description":"Classico dolce italiano al caffè","cost":5.5,"allergenNames":["Glutine","Lattosio"],"idDish":3,"idCategory":3}],"Insalate":[{"name":"Insalata mista","description":"Insalata con pomodoro, lattuga, carote e olive","cost":6,"allergenNames":[],"idDish":4,"idCategory":4}]};

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
      itemAllergens.textContent = "ALLERGENI:"+item.allergenNames;
      listItem.appendChild(itemAllergens);
  
      const itemCost = document.createElement('span');
      itemCost.classList.add('badge', 'bg-primary', 'rounded-pill');
      itemCost.textContent = `€${item.cost.toFixed(2)}`;
      listItem.appendChild(itemCost);
  
      list.appendChild(listItem);
    });
  });
  
 

  
  
}