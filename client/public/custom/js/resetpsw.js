/* eslint-disable prettier/prettier */
let pageObj = undefined;

$(function(){
    pageObj = {
        selectors: {
            passwordNew: $('#passwordInputText'), 
            passwordConfirm : $('#confermapasswordInputText'),         
            submitButton: $('#submitPsw'),
        },
        functions: {
            initPage: function () {
                pageObj.functions.initEvents()
            },
            initEvents: function (){

                pageObj.selectors.submitButton.click(function(e) {
                    console.log('clicked')
                    const psw= pageObj.selectors.passwordNew.val()
                    const confirm= pageObj.selectors.passwordConfirm.val()
                    


                   
                   
                    if(psw == confirm){

                    var pathname = window.location.pathname.split("/").pop()
                    //alert(pathname)


                    $.ajax({
                        // todo: sbagliato, devi chiamare il tuo server e internamente il tuo server contatta il backend
                        url: "/api/auth/signup/op/resetpassword",
                        type: 'POST', //send it through get method
                        dataType: "json",
                    
                        data: {
                         
                          password: psw
                          
                        },
                        success: function(data, textStatus, xhr) {


                           
                            const token = data
                            if(token) {
                                sessionStorage.setItem("jwt", token);
                                window.location.replace("/dashboard");
                                
                                
                            }
                        },
                        error: function(xhr, status, error) {
                           // alert("Auth ko")
                            console.log(xhr.responseText);

                        }
                    });
                } else alert("PASSWORD NON COINCIDONO!")
                })
            }
        }
    }
    pageObj.functions.initPage()
})
