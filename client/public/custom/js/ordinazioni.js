



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

        //alert("CREO COMPLETE:" + JSON.stringify(obj1.data))







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

        // alert(JSON.stringify(dishesComplete));
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
        url: 'http://localhost:3000/api/dish/category/' + idCategory,
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


function creaListMenuPrint(categorie) {

    const dishesComplete = categorie;
    alert("DISHES RICEVUTI: " + dishesComplete)
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
        addButton.dataset.id = dish.id
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


//RIEMPIE LA SELECT CON I TAVOLI DEL RISTORANTE
function createTablesSelect(table) {
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



//INSERISCE L'ORDINE DEL TAVOLO NEL DB
function creaTableOrdersOpen() {

    axios.all([
        axios.get('/api/cart/all'),
        axios.get('/api/cartdish/all'),
        axios.get('/api/user'),
        axios.get('/api/cart/bill/all'),
        axios.get('/api/dish/all')
    ]).then(axios.spread((cartRes, cartdishRes, usersRes, billRes, dishesRes) => {





        let obj1 = JSON.parse(JSON.stringify(cartRes.data));
        const cart = JSON.parse(JSON.stringify(obj1.data))
        // alert("CART: " + JSON.stringify(cart))




        let obj2 = JSON.parse(JSON.stringify(cartdishRes.data));
        const cartdish = JSON.parse(JSON.stringify(obj2.data))
        // alert("CARTDISH: " + JSON.stringify(cartdish))


        // CREO IL JSON CON USERID ED ARRAY DI DISHID
        const updatedCart = cart.map(cartItem => {
            const cartDishItems = cartdish.filter(cartDishItem => cartDishItem.cartId === cartItem.id);
            const dishIds = cartDishItems.map(cartDishItem => cartDishItem.dishId);
            return {
                ...cartItem,
                userId: cartDishItems.length > 0 ? cartDishItems[0].userId : null,
                dishIds: dishIds
            };
        });



        //alert("CA: " + JSON.stringify(updatedCart))


        /*  output = 
           [
             {
               "id": 120,
               "tableId": 111,
               "status": "OPEN",
               "createdAt": "2023-02-26T12:35:41",
               "updateAt": "2023-03-10T00:08:12",
               "userId": 107,
               "dishes": [
                 204,
                 223
               ]
             }*/

        // ----------------------------------------------//



        let obj3 = JSON.parse(JSON.stringify(usersRes.data));
        const users = JSON.parse(JSON.stringify(obj3.data));
        //alert("UTENTI: " + JSON.stringify(users))

        // CREO IL JSON SOSTITUENDO L'ID USER CON NOME E COGNOME DELL'USER

        updatedCart.forEach(cartItem => {
            const user = users.find(userItem => userItem.id === cartItem.userId);
            if (user) {
                cartItem.name = user.name;
                cartItem.surname = user.surname;
            }
        });


        //---------------------------------//
        //alert("TOTALE nome: " + JSON.stringify(updatedCart))



        let obj5 = JSON.parse(JSON.stringify(dishesRes.data));
        const dishes = JSON.parse(JSON.stringify(obj5.data));
        // alert("dishes: " + JSON.stringify(dishes))

        let lun = updatedCart.length


        // SOSTITUZIONE IDS PORTATE CON I NOMI DISHES
        const groupedCartWithDishes = updatedCart.map((cart) => {
            // Controllo se la proprietà dishIds esiste
            if (cart.dishIds) {
                // Se esiste, creo un nuovo array con i nomi dei piatti corrispondenti
                const dishNames = cart.dishIds.map((dishId) => {
                    const dish = dishes.find((dish) => dish.id === dishId);
                    return dish ? dish.name : null;
                });
                // Aggiungo l'array dei nomi come una nuova proprietà chiamata dishes all'oggetto cart
                return { ...cart, dishes: dishNames };
            } else {
                // Se la proprietà dishIds non esiste, cerco il piatto con l'id corrispondente
                const dish = dishes.find((dish) => dish.id === cart.dishId);
                // Aggiungo il nome del piatto come una nuova proprietà chiamata dishes all'oggetto cart
                return { ...cart, dishName: dish ? [dish.name] : [], dishCost: dish.cost };
            }
        });




        //alert("dishmap: " + JSON.stringify(groupedCartWithDishes))

        const openCarts = groupedCartWithDishes.filter(c => c.status === 'OPEN');
        const cartdishWithOpenCarts = cartdish.filter(cd => openCarts.find(c => c.id === cd.cartId));
        buildTableOrdersDip(openCarts)

      





    }));

}


function buildTableOrdersDip(groupedCartWithNameAndDishes) {

   // alert("ENTRATO"+JSON.stringify(groupedCartWithNameAndDishes))
    document.getElementById("nAperti").innerHTML = "CONTI APERTI: "+groupedCartWithNameAndDishes.length;



    const cartWithNames = groupedCartWithNameAndDishes;
    // Get a reference to the parent element
    const parentElement = document.querySelector('.list-group-3');

    // Loop through the cartWithNames array
    cartWithNames.forEach(order => {
        //alert("AGGIUNGO")
        // Create the list item element
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item', 'border-0', 'd-flex', 'p-4', 'mb-2', 'bg-gray-100', 'border-radius-lg');

        // Create the order details
        const orderDetails = document.createElement('div');
        orderDetails.classList.add('d-flex', 'flex-column');

        const orderId = document.createElement('h6');
        orderId.classList.add('mb-3', 'text-sm');
        orderId.innerText = `#${order.id}`;

        const tableNumber = document.createElement('span');
        tableNumber.classList.add('mb-2', 'text-xs');
        tableNumber.innerHTML = `Tavolo:<span class="text-dark font-weight-bold ms-sm-2">${order.tableId}</span>`;

        const employeeName = document.createElement('span');
        employeeName.classList.add('mb-2', 'text-xs');
        employeeName.innerHTML = `Dipendente:<span class="text-dark ms-sm-2 font-weight-bold">${order.name} ${order.surname}</span>`;

        const orderTotal = document.createElement('span');
        orderTotal.classList.add('text-xs');
        orderTotal.innerHTML = `Portate:<span class="text-dark ms-sm-2 font-weight-bold">${order.dishes}</span>`;

        orderDetails.appendChild(orderId);
        orderDetails.appendChild(tableNumber);
        orderDetails.appendChild(employeeName);
        orderDetails.appendChild(orderTotal);

        listItem.appendChild(orderDetails);
       parentElement.appendChild(listItem);


      

           
      
    });

   


}



function buildTableClosedOrders(closedCart) {

    const reversedData = [];

    for (let i = closedCart.length - 1; i >= 0; i--) {
        reversedData.push(closedCart[i]);
    }


    const list = document.getElementById('closedList'); // assuming there's a list with id 'myList'


    reversedData.forEach(cart => {
        const li = document.createElement('li');
        li.className = 'list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg';

        const div1 = document.createElement('div');
        div1.className = 'd-flex flex-column';

        const h6 = document.createElement('h6');
        h6.className = 'mb-1 text-dark font-weight-bold text-sm';
        h6.textContent = `Tavolo ${cart.tableId}`;

        const span = document.createElement('span');
        span.className = 'text-xs';
        span.textContent = `Ordine #MS-${cart.id}`;

        div1.appendChild(h6);
        div1.appendChild(span);

        const div2 = document.createElement('div');
        div2.className = 'd-flex align-items-center text-sm';

        const button = document.createElement('button');
        button.className = 'btn btn-link text-dark text-sm mb-0 px-0 ms-4';

        const icon = document.createElement('i');
        icon.className = 'fas fa-file-pdf text-lg me-1';

        button.appendChild(icon);
        button.textContent = 'PDF';

        div2.appendChild(button);

        li.appendChild(div1);
        li.appendChild(div2);

        list.appendChild(li);

        // Aggiungi l'event listener per il button PDF
        button.addEventListener('click', () => {
            // Crea un nuovo oggetto jsPDF
            window.jsPDF = window.jspdf.jsPDF;

            const doc = new jsPDF();

            // Aggiungi il contenuto del PDF
            doc.text(`Dettagli dell'ordine #MS-${cart.id}`, 10, 10);
            doc.text(`Tavolo: ${cart.tableId}`, 10, 20);
            doc.text(`Piatti ordinati:`, 10, 30);
            cart.dishes.forEach((dish, index) => {
                doc.text(`${index + 1}. ${dish}`, 10, 40 + (index * 10));
            });

            // Salva il PDF e apri il file
            doc.save(`Ordine-${cart.id}.pdf`);
        });
    });




}













