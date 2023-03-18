function generateListUsers(){


    $.ajax({
         // todo: sbagliato, devi chiamare il tuo server e internamente il tuo server contatta il backend
         url: 'http://localhost:3000/api/user',
         type: 'GET', //send it through get method
           dataType: "json",
      
         
     
         success: function(data, textStatus, xhr) {
          
           const obj = JSON.parse(xhr.responseText);
           var user = JSON.stringify(obj.data)
           var users = JSON.parse(user)   
           
           
           console.log(users);
  
           buildSelectUsers(users)
          
   
   
   
           
                     
         },
         error: function(xhr, status, error) {
             alert("Auth ko")
             console.log(xhr.responseText);
   
         }
     });
   
   
   
   } 
  
  
   function buildSelectUsers(users){
    
    const select = document.getElementById("userId"); // seleziona l'elemento select dal DOM

    users.forEach(user => { // itera l'array di utenti
      const option = document.createElement("option"); // crea un nuovo elemento option
      option.value = user.id; // imposta l'attributo value della option


      const text = document.createTextNode(user.name.slice(0, 1).toUpperCase() + user.name.slice(1) + ' ' + user.surname.slice(0, 1).toUpperCase() + user.surname.slice(1)); // crea un nuovo nodo di testo per l'opzione
      option.appendChild(text); // aggiungi il nodo di testo all'opzione
      select.appendChild(option); // aggiungi l'opzione al menu a discesa
    });
    
  
   }






















   function usersOrder() {
    axios.all([
        axios.get('/api/cart/all'),
        axios.get('/api/cartdish/all'),
        axios.get('/api/user'),
        axios.get('/api/cart/bill/all'),
        axios.get('/api/dish/all')
    ]).then(axios.spread((cartRes, cartdishRes, usersRes, billsRes, dishesRes) => {





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

        const closedCarts = groupedCartWithDishes.filter(c => c.status === 'CLOSED');
        const cartdishWithClosedCarts = cartdish.filter(cd => openCarts.find(c => c.id === cd.cartId));

        console.log(closedCarts)


        let obj4 = JSON.parse(JSON.stringify(billsRes.data));
        const billRes = JSON.parse(JSON.stringify(obj4.data));
        alert("billRes: " + JSON.stringify(billRes))


        

        const result = billRes.map(bill => {
            const closedCart = closedCarts.find(cart => cart.id === bill.cartId);
            return {
              cartId: bill.cartId,
              total: bill.total,
              userId: closedCart ? closedCart.userId : null,
              createdAt: closedCart ? closedCart.createdAt : null
            };
          });
          
console.log(result);
/*
 */

creaChart(result)






        


    }));

}




function creaChart(result){

    const ordini = result
 
    // Get the select and input elements
const userIdSelect = document.getElementById('userId');
const startDateInput = document.getElementById('startDate');
const endDateInput = document.getElementById('endDate');
// Get the canvas element and set its context
const canvas = document.getElementById('chart');
const ctx = canvas.getContext('2d');
// Define the chart options
const chartOptions = {
  responsive: true,
  scales: {
    xAxes: [{
      type: 'time',
      time: {
        unit: 'day'
      },
      ticks: {
        source: 'auto'
      }
    }],
    yAxes: [{
      ticks: {
        beginAtZero: true,
        callback: function(value) {
          if (value % 1 === 0) {
            return value;
          }
        }
      }
    }]
  }
};

// Define the chart data
const chartData = {
  labels: [],
  datasets: [{
    label: '',
    data: [],
    backgroundColor: 'rgba(54, 162, 235, 0.2)',
    borderColor: 'rgba(54, 162, 235, 1)',
    borderWidth: 1
  }]
};
// Initialize the chart
const chart = new Chart(ctx, {
  type: 'line',
  data: chartData,
  options: chartOptions
});
// Define the function to filter the orders
const filterOrders = () => {
  const userId = userIdSelect.value;
  const startDate = new Date(startDateInput.value);
  const endDate = new Date(endDateInput.value);
  
  const dateRange = getDateRange(startDate, endDate);
  
  const filteredOrders = ordini.filter(order => order.userId == userId && new Date(order.createdAt) >= startDate && new Date(order.createdAt) <= endDate);
  const ordersByDay = {};
  filteredOrders.forEach(order => {
    const day = new Date(order.createdAt).toISOString().slice(0, 10);
    if (ordersByDay[day]) {
      ordersByDay[day]++;
    } else {
      ordersByDay[day] = 1;
    }
  });
  const data = [];
  const labels = [];
  dateRange.forEach(date => {
    const day = date.toISOString().slice(0, 10);
    const count = ordersByDay[day] || 0;
    data.push({
      x: day,
      y: count
    });
    labels.push(day);
  });
  chartData.datasets[0].data = data;
  chartData.labels = labels;
  chartData.datasets[0].label = `User ${userId}`;
  chart.update();
};

function getDateRange(startDate, endDate) {
  const dates = [];
  let currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    dates.push(currentDate);
    currentDate = new Date(currentDate.getTime() + 86400000);
  }
  return dates;
}

// Add event listeners to the select and input elements
userIdSelect.addEventListener('change', filterOrders);
startDateInput.addEventListener('input', filterOrders);
endDateInput.addEventListener('input', filterOrders);
// Initialize the chart with default data
filterOrders();


creaCard(result)


    




}


function creaCard(result){
    alert("RESULTI")
     // Get the select and input elements

     const userIdSelect = document.getElementById('userId');
     const startDateInput = document.getElementById('startDate');
     const endDateInput = document.getElementById('endDate');

userIdSelect.addEventListener("change", () => {
   
    const userId = userIdSelect.value;
    const startDate = startDateInput.value;
    const endDate = endDateInput.value;
    updateResults(userId, startDate, endDate);
  });
  
  startDateInput.addEventListener("change", () => {
    
    const userId = userIdSelect.value;
    const startDate = startDateInput.value;
    const endDate = endDateInput.value;
    updateResults(userId, startDate, endDate);
  });
  
  endDateInput.addEventListener("change", () => {
   
    const userId = userIdSelect.value;
    const startDate = startDateInput.value;
    const endDate = endDateInput.value;
    updateResults(userId, startDate, endDate);
  });


  function updateResults() {
    const userId = parseInt(document.getElementById("userId").value);
    const startDate = new Date(document.getElementById("startDate").value);
    const endDate = new Date(document.getElementById("endDate").value);
  
    const filteredResults = result.filter(
      (order) =>
        order.userId === userId &&
        new Date(order.createdAt) >= startDate &&
        new Date(order.createdAt) <= endDate
    );
  
    const cartIds = [...new Set(filteredResults.map((order) => order.cartId))];
    const cartCount = cartIds.length;
    const cartTotal = filteredResults.reduce((total, order) => total + order.total, 0);
  
    document.getElementById("userIdValue").textContent = userId;
    document.getElementById("cartIdCount").textContent = cartCount;
    document.getElementById("cartIdTotal").textContent = cartTotal.toFixed(2);
  }
  

 
  


   
   // Funzione che aggiorna la card con i risultati in base ai filtri selezionati

   

}























