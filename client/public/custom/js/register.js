/* eslint-disable prettier/prettier */


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
                   

                    $.ajax({
                        // todo: sbagliato, devi chiamare il tuo server e internamente il tuo server contatta il backend
                        url: '/auth/signup/',
                        type: 'POST', //send it through get method
                        dataType: "json",
                        data: {
                          email: email,
                          password: password,
                          name: name,
                          surname: surname
                        },
                        success: function(data, textStatus, xhr) {
                            alert("Auth ok")
                            const token = data
                            if(token) {
                                sessionStorage.setItem("jwt", token);
                                window.location.replace("dashboard");
                                
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


