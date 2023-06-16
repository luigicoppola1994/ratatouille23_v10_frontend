/* eslint-disable prettier/prettier */
let pageObjc = undefined;


$(function(){

    pageObjc = {
        selectors: {
            emailInputText: $('#emailInputText'),
            passwordInputText: $('#passwordInputText'),
            loginButton: $('#loginSubmitButton'),
        },
        functions: {
            initPage: function () {
                pageObjc.functions.initEvents()
            },
            initEvents: function (){

                pageObjc.selectors.loginButton.click(function(e) {
                    console.log('clicked')
                    const email = pageObjc.selectors.emailInputText.val()
                    const password = pageObjc.selectors.passwordInputText.val()

                  if(email==null)    
                    alert("null")          

                    

                
                    $.ajax({
                        url: '/api/auth/login',
                        type: 'POST', //send it through get method,
                        dataType: "json",
                        data: {
                         email: email,
                         password: password
                        
                        },
                        success: function(data, textStatus, xhr) {
                           //alert("Entrato")
                            const em = email;
                            
                            sessionStorage.setItem("emailUtente", em); 



                           //CREO API USER
                           $.ajax({
                            // todo: sbagliato, devi chiamare il tuo server e internamente il tuo server contatta il backend
                            url: '/api/user/'+em,
                            type: 'GET', //send it through get method
                              dataType: "json",
                         
                            
                        
                            success: function(data, textStatus, xhr) {
                      console.log(xhr.responseText)
                      
                            
                      
                      
                      
                      const obj = JSON.parse(xhr.responseText);
                      var utente = JSON.stringify(obj.data)
                      var user = JSON.parse(utente)

                      //alert(user.email)
                      //alert(user.role)

                      if(user.firstAccess == 0) // se 0 ancora deve fare il primo accesso
                        window.location.replace("/validate")

                     else {
                            if(user.role == 'WAITER')
                               window.location.replace("/ordinazioni")
                            else 
                               window.location.replace("/attivita")
                          }

                        },
                            error: function(xhr, status, error) {
                               // alert("Auth ko")
                                console.log(xhr.responseText);
                      
                            }
                        });





                           //FINISCO








                        },
                        error: function(xhr, status, error) {
                            var error = document.getElementById("error").innerHTML="Combinazione email/password errata";
                                                   

                            console.log(xhr.responseText);
                        }
                    });
                })
            }
        }
    }
    pageObjc.functions.initPage()
}) 




