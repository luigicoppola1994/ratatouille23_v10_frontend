/* eslint-disable prettier/prettier */


let pageObjt = undefined;

$(function(){
    pageObjt = {
        selectors: {
            nameDish: $('#dishName'),
            descDish: $('#dishDescription'),
            category: $( "#select" ),
            dishButton: $('#ciao'),
        },
        functions: {
            initPage: function () {
                pageObjt.functions.initEvents()
            },
            initEvents: function (){

                pageObjt.selectors.dishButton.click(function(e) {
                    console.log('clicked')
                    const nomePortata= pageObjt.selectors.nameDish.val()
                    const descDish= pageObjt.selectors.descDish.val()
                    const allergeni = arr.toString()
                    const categoria = pageObjt.selectors.category.val()
                   



                   

                    $.ajax({
                        // todo: sbagliato, devi chiamare il tuo server e internamente il tuo server contatta il backend
                        url: 'http://localhost:3000/api/dish/add',
                        type: 'POST', //send it through get method
                        dataType: "json",
                    
                        data: {
                          name: email,
                          description: password,
                          allergens: name,
                          cost: 10,
                          category_id: categoria,
                          menu_id: 33
                          
                        },
                        success: function(data, textStatus, xhr) {


                            alert("Auth ok")
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
                })
            }
        }
    }
    pageObjt.functions.initPage()
})
