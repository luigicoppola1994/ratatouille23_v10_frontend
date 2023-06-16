
let pageObjt = undefined;

$(function(){
    pageObjt = {
        selectors: {
            nameInputText: $('#nameInputText2'),
            surnameInputText: $('#surnameInputText2'),
            emailInputText: $('#emailInputText2'),
            passwordInputText: $('#passwordInputText2'),            
            insertButton: $('#btn_insertadmin'),
        },
        functions: {
            initPage: function () {
                pageObjt.functions.initEvents()
            },
            initEvents: function (){
                pageObjt.selectors.insertButton.click(function(e) {
                    console.log('clicked')
                    const name = pageObjt.selectors.nameInputText.val()
                    const surname = pageObjt.selectors.surnameInputText.val()
                    const email = pageObjt.selectors.emailInputText.val()
                    const password = pageObjt.selectors.passwordInputText.val()

                    
                    // Rimuove eventuali classi di errore precedentemente aggiunte
                    pageObjt.selectors.nameInputText.removeClass('input-error');
                    pageObjt.selectors.surnameInputText.removeClass('input-error');
                    pageObjt.selectors.emailInputText.removeClass('input-error');
                    pageObjt.selectors.passwordInputText.removeClass('input-error');
                    
                    let hasError = false;
                    
                    if (email === '') {
                        pageObjt.selectors.emailInputText.addClass('input-error');
                        hasError = true;
                    }
                    if (password === '') {
                        pageObjt.selectors.passwordInputText.addClass('input-error');
                        hasError = true;
                    }
                    if (name === '') {
                        pageObjt.selectors.nameInputText.addClass('input-error');
                        hasError = true;
                    }
                    if (surname === '') {
                        pageObjt.selectors.surnameInputText.addClass('input-error');
                        hasError = true;
                    }
                    
                    
                    if (hasError) {
                        return;
                    }
                    

                    // Effettua la chiamata AJAX solo se tutti i campi sono compilati
                    $.ajax({
                        url: '/auth/signup',
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            email: email,
                            password: password,
                            name: name,
                            surname: surname
                            
                        },
                        success: function(data, textStatus, xhr) {
                            
                            alert('UTENTE CREATO CON SUCCESSO!');
                            const token = data;
                            if (token) {
                                sessionStorage.setItem('jwt', token);
                                window.location.replace('login');
                                
                            }
                        },
                        error: function(xhr, status, error) {
                            alert("EMAIL INSERITA GIA' ESISTENTE.")
                            pageObjt.selectors.emailInputText.addClass('input-error');
                            hasError = true;
                            console.log(xhr.responseText);
                        }
                    });
                });
                
                // Aggiunge un evento di input per ripristinare il colore originale del campo
                pageObjt.selectors.emailInputText.on('input', function() {
                    pageObjt.selectors.emailInputText.removeClass('input-error');
                });
                pageObjt.selectors.passwordInputText.on('input', function() {
                    pageObjt.selectors.passwordInputText.removeClass('input-error');
                });
                pageObjt.selectors.nameInputText.on('input', function() {
                    pageObjt.selectors.nameInputText.removeClass('input-error');
                });
                pageObjt.selectors.surnameInputText.on('input', function() {
                    pageObjt.selectors.surnameInputText.removeClass('input-error');
                });
                
            }
        }
    }
    pageObjt.functions.initPage();
});



/*

let pageObj = undefined;

$(function(){
    pageObj = {
        selectors: {
            nameInputText: $('#nameInputText2'),
            surnameInputText: $('#surnameInputText2'),
            emailInputText: $('#emailInputText2'),
            passwordInputText: $('#passwordInputText2'),
            registerButton: $('#btn_register'),
        },
        functions: {
            initPage: function () {
                pageObj.functions.initEvents()
            },
            initEvents: function (){
                pageObj.selectors.registerButton.click(function(e) {
                    console.log('clicked')
                    const name= pageObj.selectors.nameInputText.val()
                    const surname= pageObj.selectors.surnameInputText.val()
                    const email = pageObj.selectors.emailInputText.val()
                    const password = pageObj.selectors.passwordInputText.val()
                   
                    
                    // Rimuove eventuali classi di errore precedentemente aggiunte
                    pageObj.selectors.nameInputText.removeClass('input-error');
                    pageObj.selectors.surnameInputText.removeClass('input-error');
                    pageObj.selectors.emailInputText.removeClass('input-error');
                    pageObj.selectors.passwordInputText.removeClass('input-error');
                    
                    
                    let hasError = false;
                    
                    if (email === '') {
                        pageObj.selectors.emailInputTextDip.addClass('input-error');
                        hasError = true;
                    }
                    if (password === '') {
                        pageObj.selectors.passwordInputTextDip.addClass('input-error');
                        hasError = true;
                    }
                    if (name === '') {
                        pageObj.selectors.nameInputTextDip.addClass('input-error');
                        hasError = true;
                    }
                    if (surname === '') {
                        pageObj.selectors.surnameInputTextDip.addClass('input-error');
                        hasError = true;
                    }
                   
                    if (hasError) {
                        return;
                    }
                    
                    // Effettua la chiamata AJAX solo se tutti i campi sono compilati
                    $.ajax({
                        url: '/auth/signup/op',
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            email: email,
                            password: password,
                            name: name,
                            surname: surname,
                            role: role
                        },
                        success: function(data, textStatus, xhr) {
                            
                            alert('UTENTE CREATO CON SUCCESSO!');
                            const token = data;
                            if (token) {
                                sessionStorage.setItem('jwt', token);
                                window.location.replace('login');
                            }
                        },
                        error: function(xhr, status, error) {
                            alert("EMAIL INSERITA GIA' ESISTENTE.")
                            pageObj.selectors.emailInputText.addClass('input-error');
                            hasError = true;
                            console.log(xhr.responseText);
                        }
                    });
                });
                
                
               
            }
        }
    }
    pageObj.functions.initPage();
});


/*


function generateListAllergens(){


  $.ajax({
       // todo: sbagliato, devi chiamare il tuo server e internamente il tuo server contatta il backend
       url: '/api/allergens/all',
       type: 'GET', //send it through get method
         dataType: "json",
    
       
   
       success: function(data, textStatus, xhr) {
        
         const obj = JSON.parse(xhr.responseText);
         var allergens = JSON.stringify(obj.data)
         var allergeni = JSON.parse(allergens)   
         
         
         console.log(allergeni);

         buildCheckBox(allergeni)
        
 
 
 
         
                   
       },
       error: function(xhr, status, error) {
          // alert("Auth ko")
           console.log(xhr.responseText);
 
       }
   });
 
 
 
 } */



/*

 let pageObj = undefined;

$(function(){
    pageObj = {
        selectors: {
            nameInputText: $('#nameInputText2'),
            surnameInputText: $('#surnameInputText2'),
            emailInputText: $('#emailInputText2'),
            passwordInputText: $('#passwordInputText2'),
            registerButton: $('#btn_register'),
        },
        functions: {
            initPage: function () {
                pageObj.functions.initEvents()
            },
            initEvents: function (){

                pageObj.selectors.registerButton.click(function(e) {
                   alert('clicked')
                    const name= pageObj.selectors.nameInputText.val()
                    const surname= pageObj.selectors.surnameInputText.val()
                    const email = pageObj.selectors.emailInputText.val()
                    const password = pageObj.selectors.passwordInputText.val()
                   

                    $.ajax({
                        // todo: sbagliato, devi chiamare il tuo server e internamente il tuo server contatta il backend
                        url: '/auth/signup',
                        type: 'POST', //send it through get method
                        dataType: "json",
                        data: {
                          email: email,
                          password: password,
                          name: name,
                          surname: surname
                        },
                        success: function(data, textStatus, xhr) {
                            alert("Registrazione convalidata.")
                            const token = data
                            if(token) {
                                sessionStorage.setItem("jwt", token);
                                window.location.replace("login");
                                
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
    pageObj.functions.initPage()
})
*/