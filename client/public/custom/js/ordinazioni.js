
function listCategorieselect() {
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
            creaCategorieSelect(categorie)
        },
        error: function (xhr, status, error) {
            alert("Auth ko")
            console.log(xhr.responseText);

        }
    });
}










function changeCategory() {

    const select = document.getElementById("select_categories");
    const categoriaSelected = document.getElementById("categoriaSelected");
    const selectedOption = select.options[select.selectedIndex];

    // Aggiorna la categoria selezionata
    categoriaSelected.textContent = selectedOption.text;

    // Chiamata API per ottenere le portate della categoria selezionata
    getDishesByCategory(selectedOption.value);

    select.addEventListener("change", () => {


        const selectedOption = select.options[select.selectedIndex];

        // Aggiorna la categoria selezionata
        categoriaSelected.textContent = selectedOption.text;

        //Rimuove gli items delle categorie precedentemente selezionate
        $('.menu-items').empty();


        // Chiamata API per ottenere le portate della categoria selezionata
        getDishesByCategory(selectedOption.value);
    });
}












function creaCategorieSelect(categories) {
    // Ordina l'array categories in base alla proprietà priority dopo aver eliminato quelle con priority 0
    categories = categories.filter((category) => category.priority !== 0);
    categories.sort((a, b) => a.priority - b.priority);

    // Seleziona l'elemento select
    const select = document.getElementById("select_categories");

    // Aggiungi gli elementi option alla select
    categories.forEach((category, index) => {
        const option = document.createElement("option");
        option.value = category.id;
        option.text = category.name;
        select.appendChild(option);

        // Imposta la prima opzione come selezionata
        if (index === 0) {
            option.selected = true;
        }
    });

    changeCategory();
}




//CREA IL JSON COMPLETO DELLE PORTATE CON TUTTE LE INFO DEGLI ALTRI JSON
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

        alert("CREO COMPLETE:" + JSON.stringify(obj1.data))







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
                nameLan: dish.nameLan,
                descriptionLan: dish.descriptionLan,
                cost: dish.cost,
                categoryName,
                nameAllergens: allergenNames,
                idDish: dish.id,
                idCategory: dish.categoryId,
                priority: priority

            };
        });

        alert(JSON.stringify(dishesComplete));
        menuSala(dishesComplete);




    })).catch(error => {
        console.log(error);
    });


}


//CREA IL MENU PER IL CAMERIERE IN BASE ALLA CATEGORIA
function getDishesByCategory(idCategory) {

    alert(idCategory)
    axios.all([
        axios.get('/api/dish/category/' + idCategory),
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
                id: dish.id,
                name: dish.name,
                nameLan: dish.nameLan,
                description: dish.description,
                descriptionLan: dish.descriptionLan,
                cost: dish.cost,
                categoryName,
                idCategory: dish.idCategory,
                nameAllergens: allergenNames
            };
        });
        alert("PER CATEGORIA:" + JSON.stringify(dishesComplete))

        createElementByCategory(idCategory)



    }));
}




//STAMPA GLI ELEMENTI PER OGNI CATEGORIA
function createElementByCategory(idCategory) {

    /* const dishesComplete=[
           {
             "id": 187,
             "name": "Babà al caffè",
             "description": "caffe, rum, farina, uova, burro",
             "nameLan": "Coffee Babà",
             "descriptionLan": "delicious",
             "cost": 10.0,
             "menuId": 109,
             "categoryId": 168
           },
           {
             "id": 190,
             "name": "Torta pan di stelle",
             "description": "cacao, farina, uova, zucchero, miele, biscotti, panna, nutella, nocciole",
             "nameLan": null,
             "descriptionLan": null,
             "cost": 50.0,
             "menuId": 109,
             "categoryId": 168
           },
           {
             "id": 203,
             "name": "Crostata di mele",
             "description": "farina, mele, zucchero, olio",
             "nameLan": null,
             "descriptionLan": null,
             "cost": 25.0,
             "menuId": 109,
             "categoryId": 168
           }
         ]
   
         */


         $.ajax({
            // todo: sbagliato, devi chiamare il tuo server e internamente il tuo server contatta il backend
            url: 'http://localhost:3000/api/dish/category/'+idCategory,
            type: 'GET', //send it through get method
            dataType: "json",
            success: function (data, textStatus, xhr) {
    
                const obj = JSON.parse(xhr.responseText);
                var categories = JSON.stringify(obj.data)
                var categorie = JSON.parse(categories)
                console.log(categorie);
                creaListMenuPrint(categorie)
            },
            error: function (xhr, status, error) {
                alert("Auth ko")
                console.log(xhr.responseText);
    
            }
        });


}


function creaListMenuPrint(categorie){

    const dishesComplete = categorie;
    alert("DISHES RICEVUTI: "+dishesComplete)
    const menuItems = document.querySelector('.menu-items');

    for (let i = 0; i < dishesComplete.length; i++) {
        const dish = dishesComplete[i];

        const menuItem = document.createElement('li');
        menuItem.classList.add('menu-item');

        const menuImage = document.createElement('img');
        menuImage.src = '../vendor/argon/img/meal.png'; 
        menuImage.alt = dish.name;
        menuImage.classList.add('menu-image');
        menuItem.appendChild(menuImage);

        const menuItemDets = document.createElement('div');
        menuItemDets.classList.add('menu-item-dets');
        menuItem.appendChild(menuItemDets);

        const menuItemHeading = document.createElement('p');
        menuItemHeading.classList.add('menu-item-heading');
        menuItemHeading.textContent = dish.name;
        menuItemDets.appendChild(menuItemHeading);

        const menuItemPrice = document.createElement('p');
        menuItemPrice.classList.add('g-price');
        menuItemPrice.textContent = '€' + dish.cost;
        menuItemDets.appendChild(menuItemPrice);

        const addButton = document.createElement('button');
        addButton.classList.add('add-button');
        addButton.textContent = 'Add to Cart';
        addButton.dataset.title = dish.name;
        addButton.dataset.price = dish.cost;
        menuItem.appendChild(addButton);

        menuItems.appendChild(menuItem);
    }

}










//FUNZIONE PER CREARE UN TAVOLO FISICO NEL RISTORANTE (da spostare in attività)

function creaTable() {
    let pageObjt = undefined;

    $(function () {
        pageObjt = {
            selectors: {
                tableNum: $('#tableNumber'),
                sealsNum: $('#sealsNumber'),
                insertButton: $('#btn_insertTable'),
            },
            functions: {
                initPage: function () {
                    pageObjt.functions.initEvents()
                },
                initEvents: function () {

                    pageObjt.selectors.insertButton.click(function (e) {
                        console.log('clicked')
                        const tableNumber = pageObjt.selectors.tableNum.val()
                        const sealsNumber = pageObjt.selectors.sealsNum.val()

                        alert("TAVOLO: " + tableNum)
                        alert("PERSONE: " + sealsNum)


                        $.ajax({
                            // todo: sbagliato, devi chiamare il tuo server e internamente il tuo server contatta il backend
                            url: 'http://localhost:3000/auth/signup/op',
                            type: 'POST', //send it through get method
                            dataType: "json",

                            data: {
                                email: email,
                                password: password,
                                name: name,
                                surname: surname,
                                role: role
                            },
                            success: function (data, textStatus, xhr) {


                                alert("Auth ok")
                                const token = data
                                if (token) {
                                    sessionStorage.setItem("jwt", token);
                                    window.location.replace("dashboard");
                                    addListOp(email, password, name, surname, role)

                                }
                            },
                            error: function (xhr, status, error) {
                                alert("Auth ko")
                                console.log(xhr.responseText);

                            }
                        });
                    })
                }
            }
        }
        pageObjt.functions.initPage()
    })

}


//FUNZIONE PER POPOLARE LA SELECT DEI TAVOLI DEL RISTORANTE


function listTablesSelect() {
    $.ajax({
        // todo: sbagliato, devi chiamare il tuo server e internamente il tuo server contatta il backend
        url: 'http://localhost:3000/api/tablerestaurant/all',
        type: 'GET', //send it through get method
        dataType: "json",
        success: function (data, textStatus, xhr) {

            const obj = JSON.parse(xhr.responseText);
            var table = JSON.stringify(obj.data)
            var tables = JSON.parse(table)
            createTablesSelect(tables)
        },
        error: function (xhr, status, error) {
            alert("Auth ko")
            console.log(xhr.responseText);

        }
    });
}



function createTablesSelect(table){
    const tables = table;
    alert("ID PASSATI:" + JSON.stringify(tables))
    const select = document.getElementById("tables");

for (let i = 0; i < tables.length; i++) {
  const option = document.createElement("option");
  option.value = tables[i].id;
  option.text = "Tavolo " + tables[i].id;
  select.appendChild(option);
    
}

}