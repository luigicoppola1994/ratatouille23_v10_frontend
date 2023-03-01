


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





function addPortata(){

                 var nomePortata =document.getElementById("search").value
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
                        success: function(data, textStatus, xhr) {


                            alert("PORTATA AGGIUNTA")

                            const token = data
                            if(token) {
                                sessionStorage.setItem("jwt", token);
                                window.location.replace("dashboard");
                                //addListOp(email,password,name,surname,role)
                                
                            }
                        },
                        error: function(xhr, status, error) {
                            alert("Auth ko")
                            console.log(xhr.responseText);

                        }
                    });

}


function generateListDishes(){


    $.ajax({
         // todo: sbagliato, devi chiamare il tuo server e internamente il tuo server contatta il backend
         url: 'http://localhost:3000/api/restaurant/users/SUPERVISOR',
         type: 'GET', //send it through get method
           dataType: "json",
      
         
     
         success: function(data, textStatus, xhr) {
          
           const obj = JSON.parse(xhr.responseText);
           var utente = JSON.stringify(obj.data)
           var user = JSON.parse(utente)   
           
           
           buildTable(user)
          
   
   
   
           
                     
         },
         error: function(xhr, status, error) {
             alert("Auth ko")
             console.log(xhr.responseText);
   
         }
     });
   
   
   
   } 
   
   




   

