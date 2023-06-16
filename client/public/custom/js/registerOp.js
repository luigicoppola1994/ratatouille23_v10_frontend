let pageObjt = undefined;

$(function(){
    pageObjt = {
        selectors: {
            nameInputTextDip: $('#nameDip'),
            surnameInputTextDip: $('#surnameDip'),
            emailInputTextDip: $('#emailDip'),
            passwordInputTextDip: $('#passwordDip'),
            roleInputDip: $('#role'),
            insertButton: $('#btn_insert'),
        },
        functions: {
            initPage: function () {
                pageObjt.functions.initEvents()
            },
            initEvents: function (){
                pageObjt.selectors.insertButton.click(function(e) {
                    console.log('clicked')
                    const name = pageObjt.selectors.nameInputTextDip.val()
                    const surname = pageObjt.selectors.surnameInputTextDip.val()
                    const email = pageObjt.selectors.emailInputTextDip.val()
                    const password = pageObjt.selectors.passwordInputTextDip.val()
                    const role = $('#role').val();
                    
                    // Rimuove eventuali classi di errore precedentemente aggiunte
                    pageObjt.selectors.emailInputTextDip.removeClass('input-error');
                    pageObjt.selectors.passwordInputTextDip.removeClass('input-error');
                    pageObjt.selectors.nameInputTextDip.removeClass('input-error');
                    pageObjt.selectors.surnameInputTextDip.removeClass('input-error');
                    pageObjt.selectors.roleInputDip.removeClass('input-error');
                    
                    let hasError = false;
                    
                    if (email === '') {
                        pageObjt.selectors.emailInputTextDip.addClass('input-error');
                        hasError = true;
                    }
                    if (password === '') {
                        pageObjt.selectors.passwordInputTextDip.addClass('input-error');
                        hasError = true;
                    }
                    if (name === '') {
                        pageObjt.selectors.nameInputTextDip.addClass('input-error');
                        hasError = true;
                    }
                    if (surname === '') {
                        pageObjt.selectors.surnameInputTextDip.addClass('input-error');
                        hasError = true;
                    }
                    if (role === 'Seleziona il ruolo...') {
                        pageObjt.selectors.roleInputDip.addClass('input-error');
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
                            
                            alert('UTENTE CREATO CON SUCCESSO!\n VALIDO SE EMAIL ESISTENTE.');
                            const token = data;
                            if (token) {
                                sessionStorage.setItem('jwt', token);
                                window.location.replace('dipendenti');
                                addListOp(email, password, name, surname, role);
                            }
                        },
                        error: function(xhr, status, error) {
                            alert("EMAIL INSERITA GIA' ESISTENTE.")
                            pageObjt.selectors.emailInputTextDip.addClass('input-error');
                            hasError = true;
                            console.log(xhr.responseText);
                        }
                    });
                });
                
                // Aggiunge un evento di input per ripristinare il colore originale del campo
                pageObjt.selectors.emailInputTextDip.on('input', function() {
                    pageObjt.selectors.emailInputTextDip.removeClass('input-error');
                });
                pageObjt.selectors.passwordInputTextDip.on('input', function() {
                    pageObjt.selectors.passwordInputTextDip.removeClass('input-error');
                });
                pageObjt.selectors.nameInputTextDip.on('input', function() {
                    pageObjt.selectors.nameInputTextDip.removeClass('input-error');
                });
                pageObjt.selectors.surnameInputTextDip.on('input', function() {
                    pageObjt.selectors.surnameInputTextDip.removeClass('input-error');
                });
                pageObjt.selectors.roleInputDip.on('change', function() {
                    pageObjt.selectors.roleInputDip.removeClass('input-error');
                });
            }
        }
    }
    pageObjt.functions.initPage();
});



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
 
 
 
 } 
