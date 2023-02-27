/* eslint-disable prettier/prettier */




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
                    const name= pageObjt.selectors.nameInputTextDip.val()
                    const surname= pageObjt.selectors.surnameInputTextDip.val()
                    const email = pageObjt.selectors.emailInputTextDip.val()
                    const password = pageObjt.selectors.passwordInputTextDip.val()
                   // const role = pageObj.selectors.roleInputDip.val()
                   const role = "SUPERVISOR"



                   console.log(role)
                   

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
                        success: function(data, textStatus, xhr) {


                            alert("Auth ok")
                            const token = data
                            if(token) {
                                sessionStorage.setItem("jwt", token);
                                window.location.replace("dashboard");
                                addListOp(email,password,name,surname,role)
                                
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
