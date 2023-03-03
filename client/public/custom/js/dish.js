const { textSpanIntersection } = require("typescript");



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
      
          cell1.innerHTML = dishesComplete[i].name;
          cell2.innerHTML =  dishesComplete[i].description;
          cell3.innerHTML =  dishesComplete[i].categoryName
          cell4.innerHTML = dishesComplete[i].nameAllergens
          cell5.innerHTML =  dishesComplete[i].cost;

          
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

  




