


/* eslint-disable prettier/prettier */

    let pageObj = undefined;

$(function(){
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
            initEvents: function (){

                pageObj.selectors.insertButtonActivity.click(function(e) {
                    
                    const titleActivity= pageObj.selectors.nameActivity.val()
                    const addressActivityCompleted= pageObj.selectors.addressCompleted.val()
                    alert(titleActivity)

                   

                    $.ajax({
                        // todo: sbagliato, devi chiamare il tuo server e internamente il tuo server contatta il backend
                        url: 'http://localhost:3000/api/restaurant',
                        type: 'POST', //send it through get method
                        dataType: "json",
                    
                        data: {
                         
                          name: titleActivity,
                          address: addressActivityCompleted
                          
                        },
                        success: function(data, textStatus, xhr) {


                            alert(" ok")


                            const token = data
                            if(token) {
                                sessionStorage.setItem("jwt", token);
                                window.location.replace("attivita");
                                
                               
                                
                            }
                        },
                        error: function(xhr, status, error) {
                            alert("ko")
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