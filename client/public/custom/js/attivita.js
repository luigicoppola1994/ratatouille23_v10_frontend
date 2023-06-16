//INSERISCE L'ORDINE DEL TAVOLO NEL DB
function creaTableOrders() {
    axios.all([
        axios.get('/api/user'),
        axios.get('/api/restaurant'),
        
    ]).then(axios.spread((userRes, restaurantRes) => {





        let obj1 = JSON.parse(JSON.stringify(userRes.data));
        const users = JSON.parse(JSON.stringify(obj1.data))
        //alert("USERS: " + JSON.stringify(users))




        let obj2 = JSON.parse(JSON.stringify(restaurantRes.data));
        const restaurant = JSON.parse(JSON.stringify(obj2.data))
        //alert("RESTAURANTS: " + JSON.stringify(cartdish))










    }));

}
















































/* eslint-disable prettier/prettier */

let pageObj = undefined;

$(function () {
    pageObj = {
        selectors: {
            nameActivity: $('#nameActivity'),
            addressCompleted: $('#addressActivity'),
            insertButtonActivity: $('#btn_insertActivity'),
        },
        functions: {
            initPage: function () {
                pageObj.functions.initEvents()
            },
            initEvents: function () {

                pageObj.selectors.insertButtonActivity.click(function (e) {

                    const titleActivity = pageObj.selectors.nameActivity.val()
                    const addressActivityCompleted = pageObj.selectors.addressCompleted.val()
                   // alert(titleActivity)



                    $.ajax({
                        // todo: sbagliato, devi chiamare il tuo server e internamente il tuo server contatta il backend
                        url: '/restaurant',
                        type: 'POST', //send it through get method
                        dataType: "json",

                        data: {

                            name: titleActivity,
                            address: addressActivityCompleted

                        },
                        success: function (data, textStatus, xhr) {


                            alert("LOCALE OK")


                            $.ajax({
                                // todo: sbagliato, devi chiamare il tuo server e internamente il tuo server contatta il backend
                                url: '/api/menu/add',
                                type: 'POST', //send it through get method
                                dataType: "json",
        
                                
                                success: function (data, textStatus, xhr) {
        
        
                                    //alert("menu OK")
        
        
                                    const token = data
                                    if (token) {
                                        sessionStorage.setItem("jwt", token);
                                        window.location.replace("attivita");
        
        
        
                                    }
                                },
                                error: function (xhr, status, error) {
                                    alert("REGISTRAZIONE LOCALE E MENU' AVVENUTA CON SUCCESSO!")
                                    console.log(xhr.responseText);
        
                                }
                            });





                        },
                        error: function (xhr, status, error) {
                           // alert("ko")
                            console.log(xhr.responseText);

                        }
                    });
                })
            }
        }
    }
    pageObj.functions.initPage()
})








function searchByTable() {
    // Declare variables
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('searchTable');
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName('li');

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}








//INSERISCE L'ORDINE DEL TAVOLO NEL DB
function creaTableOrders() {
    axios.all([
        axios.get('/api/cart/all'),
        axios.get('/api/cartdish/all'),
        axios.get('/api/get/all/user'),
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


        const groupedCartWithDishesWithCost = groupedCartWithDishes.map(cart => {
            const dishesWithCost = cart.dishIds.map(dishId => {
                const dish = dishes.find(dish => dish.id === dishId);
                return {
                    name: dish.name,
                    cost: dish.cost
                }
            });

            return {
                ...cart,
                dishesWithCost
            }
        });

        console.log(groupedCartWithDishesWithCost);















        const openCarts = groupedCartWithDishesWithCost.filter(c => c.status === 'OPEN');
        const cartdishWithOpenCarts = cartdish.filter(cd => openCarts.find(c => c.id === cd.cartId));
        buildTableOrders(openCarts)

        const closedCarts = groupedCartWithDishesWithCost.filter(c => c.status === 'CLOSED');
        const cartdishWithClosedCarts = cartdish.filter(cd => openCarts.find(c => c.id === cd.cartId));

        console.log(closedCarts)
        buildTableClosedOrders(closedCarts)







    }));

}


function buildTableOrders(groupedCartWithNameAndDishes) {




    const cartWithNames = groupedCartWithNameAndDishes;
    console.log(JSON.stringify(cartWithNames))

    // Get a reference to the parent element
    const parentElement = document.querySelector('.list-group-2');

    // Loop through the cartWithNames array
    cartWithNames.forEach(order => {
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





        const orderDishes = document.createElement('span');
        orderDishes.classList.add('text-xs', 'mb-2');
        orderDishes.innerHTML = 'Portate: ';

        order.dishesWithCost.forEach(dish => {
            const dishElement = document.createElement('span');
            dishElement.classList.add('text-dark', 'ms-sm-2');
            dishElement.innerHTML = `<span class="text-dark ms-sm-2 font-weight-bold">${dish.name} - ${dish.cost} euro</span>`;
            orderDishes.appendChild(dishElement);
        });





        orderDetails.appendChild(orderId);
        orderDetails.appendChild(tableNumber);
        orderDetails.appendChild(employeeName);
        orderDetails.appendChild(orderDishes);


        // Create the action buttons
        const actionButtons = document.createElement('div');
        actionButtons.classList.add('ms-auto', 'text-end');

        const deleteButton = document.createElement('a');
        deleteButton.classList.add('btn', 'btn-link', 'text-danger', 'text-gradient', 'px-3', 'mb-0');
        deleteButton.href = 'javascript:;';
        deleteButton.setAttribute('data-id', order.id); // Aggiungi l'attributo data-id
        deleteButton.innerHTML = '<i class="far fa-trash-alt me-2"></i>Chiudi';


        const detailsButton = document.createElement('a');
        detailsButton.classList.add('btn', 'btn-link', 'text-dark', 'px-3', 'mb-0');
        detailsButton.href = 'javascript:;';
        detailsButton.setAttribute('data-id2', order.id2); // Aggiungi l'attributo data-id
        detailsButton.innerHTML = '<i class="fas fa-pencil-alt text-dark me-2" aria-hidden="true"></i>Dettagli';

        actionButtons.appendChild(deleteButton);
        actionButtons.appendChild(detailsButton);


        // Add the order details and action buttons to the list item
        listItem.appendChild(orderDetails);
        listItem.appendChild(actionButtons);

        // Add the list item to the parent element
        parentElement.appendChild(listItem);


        //GESTIONE PULSANTE CHIUDI CONTO
        const closeButtonList = document.querySelectorAll('.btn-link.text-danger.text-gradient.px-3.mb-0');
        closeButtonList.forEach((button) => {
            button.addEventListener('click', (event) => {
                // Recupera l'ID dell'ordine selezionato
                const orderId = event.target.getAttribute('data-id');




                // Recupera i dati dell'ordine corrispondente dall'array "cartWithNames"
                const orderData = cartWithNames.find(order => order.id == orderId);
                //alert("ORDERDATA:" + orderId)

                $.ajax({
                    url: '/api/cart/close/' + orderId,
                    method: 'PUT',

                    success: function (response) {
                        console.log('Dati aggiornati con successo', response);
                        //alert("ORDERDATA: " + JSON.stringify(orderData))
                        // Crea un nuovo documento PDF utilizzando jsPDF
                        window.jsPDF = window.jspdf.jsPDF;


                        //alert("PORTATE: " + JSON.stringify(orderData.dishes))



                        // Creare un nuovo documento PDF
                        let docScontrino = new jsPDF();

                        // Aggiungere il testo "Scontrino" come titolo
                        docScontrino.setFontSize(18);
                        docScontrino.text('Scontrino', 10, 20);
                        
                        // Aggiungere le informazioni dell'ordine come intestazione
                        docScontrino.setFontSize(12);
                        docScontrino.text('Ordine #' + orderData.id, 10, 40);
                        docScontrino.text('Tavolo: ' + orderData.tableId, 10, 50);
                        docScontrino.text('Dipendente: ' + orderData.name + ' ' + orderData.surname, 10, 60);
                        
                        // Aggiungere le portate con i prezzi
                        docScontrino.setFontSize(10);
                        let y = 90; // coordinata y iniziale
                        orderData.dishesWithCost.forEach(function (dish) {
                          docScontrino.cell(10, y, 70, 10, dish.name);
                          docScontrino.cell(80, y, 20, 10, dish.cost + ' €', 0, 'right');
                          y += 10; // aggiorna la coordinata y per la portata successiva
                        });
                        
                        // Calcolare e aggiungere il totale
                        docScontrino.setFontSize(12);
                        let total = orderData.dishesWithCost.reduce(function(acc, curr) {
                          return acc + curr.cost;
                        }, 0);
                        docScontrino.text('Totale: ' + total + ' euro', 10, y + 10);
                        
                        // Scaricare il PDF come file
                        docScontrino.save('Scontrino.pdf');
                        




                        window.location.reload()


                    },
                    error: function (error) {
                        console.error('Errore durante l\'aggiornamento dei dati', error);
                    }
                });



            });
        });


        //GESTIONE DETTAGLI BUTTON

        const detButtonList = document.querySelectorAll('.btn-link.text-dark.px-3.mb-0');
        detButtonList.forEach((buttonDet) => {
            buttonDet.addEventListener('click', (event) => {
                // Recupera l'ID dell'ordine selezionato
                const orderId = event.target.getAttribute('data-id');

               // alert(JSON.stringify(cartWithNames))


                // Recupera i dati dell'ordine corrispondente dall'array "cartWithNames"
                const orderData2 = cartWithNames.find(order2 => order2.id2 == orderId);


               // alert("ORDERDATA: " + JSON.stringify(orderData2))
                // Crea un nuovo documento PDF utilizzando jsPDF
                window.jsPDF = window.jspdf.jsPDF;


                //alert("PORTATE: " + JSON.stringify(orderData2.dishes))



                // Creare un nuovo documento PDF
                let docDet = new jsPDF();

                // Aggiungere il testo "Scontrino" come titolo
                docDet.setFontSize(18);
                docDet.text('Scontrino', 10, 20);

                // Aggiungere le informazioni dell'ordine come intestazione
                docDet.setFontSize(12);
                docDet.text('Ordine #' + orderData2.id, 10, 40);
                docDet.text('Tavolo: ' + orderData2.tableId, 10, 50);
                docDet.text('Dipendente: ' + orderData2.name + ' ' + orderData2.surname, 10, 60);

                // Aggiungere il titolo "PORTATE"
                docDet.setFontSize(12);
                docDet.text('PORTATE:', 10, 80);

                // Aggiungere le portate con i prezzi
                docDet.setFontSize(10);
                let y = 90; // coordinata y iniziale
                orderData2.dishesWithCost.forEach(function (dish) {
                    docDet.text(dish.name, 10, y);
                    docDet.text(dish.cost + ' €', 80, y, { align: 'right' });
                    docDet.line(10, y + 5, 100, y + 5); // disegna una linea sotto la portata
                    y += 10; // aggiorna la coordinata y per la portata successiva
                });

                // Aggiungere il totale
                docDet.setFontSize(12);
                docDet.text('Totale: non disponibile conto aperto.', 10, y + 10);


                // Scaricare il PDF come file
                docDet.save('dettagli.pdf');


            });
        });



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

            /* Crea un nuovo oggetto jsPDF
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
            doc.save(`Ordine-${cart.id}.pdf`);*/

            // Creare un nuovo documento PDF
            window.jsPDF = window.jspdf.jsPDF;

            const docScontrino = new jsPDF();

            // Aggiungere il testo "Scontrino" come titolo
            docScontrino.setFontSize(18);
            docScontrino.text('Scontrino', 10, 20);
            
            // Aggiungere le informazioni dell'ordine come intestazione
            docScontrino.setFontSize(12);
            docScontrino.text('Ordine #' + cart.id, 10, 40);
            docScontrino.text('Tavolo: ' + cart.tableId, 10, 50);
            docScontrino.text('Dipendente: ' + cart.name + ' ' + cart.surname, 10, 60);
            
            // Aggiungere le portate con i prezzi
            docScontrino.setFontSize(10);
            let y = 90; // coordinata y iniziale
           cart.dishesWithCost.forEach(function (dish) {
              docScontrino.cell(10, y, 70, 10, dish.name);
              docScontrino.cell(80, y, 20, 10, dish.cost + ' €', 0, 'right');
              y += 10; // aggiorna la coordinata y per la portata successiva
            });
            
            // Calcolare e aggiungere il totale
            docScontrino.setFontSize(12);
            let total = cart.dishesWithCost.reduce(function(acc, curr) {
              return acc + curr.cost;
            }, 0);
            docScontrino.text('Totale: ' + total + ' euro', 10, y + 10);
            
            // Scaricare il PDF come file
            docScontrino.save('Scontrino.pdf');
            


        });
    });





       
         
    }








    


    let pageObjt = undefined;

    $(function(){
        pageObjt = {
            selectors: {
                seatsNumber: $('#seatsNumber'),
                insertButton: $('#btn_insertTable'),
            },
            functions: {
                initPage: function () {
                    pageObjt.functions.initEvents()
                },
                initEvents: function (){
                    pageObjt.selectors.insertButton.click(function(e) {
                        console.log('clicked')
                        
                        const seats = pageObjt.selectors.seatsNumber.val();
                        
                        let hasError = false;
                        
                        if (seats <= 0) {
                            
                            pageObjt.selectors.seatsNumber.addClass('input-error');
                            hasError = true;
                        }
                        
                        if (!hasError) {
                            $.ajax({
                                url: '/api/tablerestaurant/add',
                                type: 'POST',
                                dataType: "json",
                                data: {
                                    "id": null,
                                    "seats": seats,
                                },
                                success: function(data, textStatus, xhr) {
                                    alert("TAVOLO REGISTRATO.");
                                    $('#tableModal').modal('hide');
                                    window.location.reload()

                                },
                                error: function(xhr, status, error) {
                                    alert("NUMERO PERSONE NON VALIDO");
                                    console.log(xhr.responseText);
                                }
                            });
                        }
                    });
                }
            }
        }
        pageObjt.functions.initPage();
    });




    // GESTIONE CONTEGGIO TAVOLI
    function guestTable(){
        $.ajax({
            // todo: sbagliato, devi chiamare il tuo server e internamente il tuo server contatta il backend
            url: '/api/tablerestaurant/all',
            type: 'GET', //send it through get method
            dataType: "json",

           
            success: function (data, textStatus, xhr) {

                const obj = JSON.parse(xhr.responseText);
                var table = JSON.stringify(obj.data)
                var tables = JSON.parse(table)
                document.getElementById("totalTables").textContent = tables.length
            },
            error: function (xhr, status, error) {
                //alert("ko")
                console.log(xhr.responseText);

            }
        });
    }


      // GESTIONE CONTEGGIO TAVOLI
      function openCarts(){
        $.ajax({
            // todo: sbagliato, devi chiamare il tuo server e internamente il tuo server contatta il backend
            url: '/api/get/all/user',
      type: 'GET', //send it through get method
        dataType: "json",
   
      
  
      success: function(data, textStatus, xhr) {
       
        const obj = JSON.parse(xhr.responseText);
        var utente = JSON.stringify(obj.data)
        var user = JSON.parse(utente)   
       // alert(xhr.responseText)

        //filtro solo gli op escludendo gli admins
        const filteredUsers = user.filter(user => user.role !== "ADMIN" && user.enabled !== false);
                             
       

                document.getElementById("freeTables").textContent = filteredUsers.length


            },
            error: function (xhr, status, error) {
               // alert("ko")
                console.log(xhr.responseText);

            }
        });
    }

  