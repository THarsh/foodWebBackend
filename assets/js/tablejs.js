function check(form)/*function to check userid & password*/
 {
  /*the following code checkes whether the entered userid and password are matching*/

	if(form.email.value == "abc" && form.password.value == "abc")
   {
   
     window.open('home.html')/*opens the target page while Id & password matches*/
   }
  else
  {

	alert("Error Password or Username 123")/*displays error message*/
   }
}

function showPassword() {
   
    var password_attr = $('#password').attr('type');
			if(password_attr != 'text') {
       
       $('.checkbox').addClass('show');
       $('#password').attr('type', 'text');
       
   } else {
       
       $('.checkbox').removeClass('show');
      $('#password').attr('type', 'password');
        
    }
    
}

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyBqt2hWrLMarnnLSOewq4-4d8uLXe77MrM",
    authDomain: "webtest-23138.firebaseapp.com",
    databaseURL: "https://webtest-23138.firebaseio.com",
    projectId: "webtest-23138",
    storageBucket: "webtest-23138.appspot.com",
    messagingSenderId: "214329619474"
  };
  firebase.initializeApp(config);
  
// //Submitting data
// document.getElementById('testForm').addEventListener('submit',submitForm);

// function submitForm(e){
	// e.preventDefault();
	
	// var emailval=getInputVal('em');
	// var passval=getInputVal('pass');
	// var msgval=getInputVal('message');
	// console.log(passval,emailval,msgval);
	
	// savedata(emailval,passval,msgval);
// }

// function getInputVal(id){
	
	// return document.getElementById(id).value;
// }

  // var userdetails=firebase.database().ref('users');

// function savedata(emailval,passval,msgval){
	  
	// var newUserDerails=userdetails.push();
  
	// var r = confirm("Do you want to save this record?");
    // if (r == true){
      // newUserDerails.set({
      // emailval:emailval,
      // passwrd:passval,
      // msgval:msgval
  // });
      // window.location.reload();
    // }
// }

//Updating data function
function updateData(emailValu, pwdValu, msgValu, pushId) {
            // A post entry.
            var dataToUpdate = {
                emailval: emailValu,
                passwrd: pwdValu,
				msgval: msgValu
            };
            var userdetails=firebase.database().ref('users').child(pushId);

            userdetails.once('value', function (snapshot) {

                
                    userdetails.update(dataToUpdate);
                

            });
			window.location.reload();
}

// var key;

// function deleteDATA(key){
	// alert('yu entered');
	// var userRef = firebase.database().ref().child("users").child(key);
            // userRef.once('value', function (snapshot) {

                // if (snapshot.val() == null) {
                    // /* does not exist */
                    // alert('does not exist');
                // } else {
                    // userRef.remove();
                // }

            // });
		// window.location.reload();
	
// }



// retrieving data to the table
// var rootRef = firebase.database().ref().child('users');

// rootRef.on("child_added", snap => {

  // var email = snap.child("emailval").val();
  // var password = snap.child("passwrd").val();
  // var message = snap.child("msgval").val();

  // $("#table_body").append("<tr><td>"+email+"</td><td>"+password+"</td><td>"+message+"</td><td><button>Remove</button></td></tr>");


// });

// Displaying data
var ref = firebase.database().ref().child("users");

            ref.on("value", function (snapshot) {
                snapshot.forEach(function (childSnapshot) {
                   
                    //var key = childSnapshot.key;
                    
                    var childData = childSnapshot.val();
					
					
                    var tr = '<tr data-id="'+childSnapshot.key+'">' +
                                '<td>' + childData.emailval + '</td>' +
                                '<td>' + childData.passwrd + '</td>' +
                                '<td>' + childData.msgval + '</td>' +
								'<td>' + childSnapshot.key + '</td>' +
								'<td> <button data-event="update">Edit</button> </td>'+
								'<td> <button data-event="delete">Remove</button> </td>'+
                            '</tr> ';
                    $('#table_body').append(tr);
                    console.log(snapshot.val());
					
                });
				
				//to Delete
				$('[data-event="delete"]').click(function(e){
					e.preventDefault();
					
					var pushId = $(this).closest('tr').attr('data-id');
					var r = confirm("Do you want to delete this record?");
					if (r == true){
					ref.child(pushId).remove();
					
					window.location.reload();
					}
				});
				
				//to Update
				$('[data-event="update"]').click(function(e){
					e.preventDefault();
					
					var pushId = $(this).closest('tr').attr('data-id');
					
					var par = $(this).parent().parent();
					
					var tdEmail = par.children("td:nth-child(1)"); 
					var tdPwd = par.children("td:nth-child(2)"); 
					var tdMsg = par.children("td:nth-child(3)"); 
					var tdeditBtn = par.children("td:nth-child(5)"); 
					
					tdEmail.html("<input type='text' id='txtEmail' value='"+tdEmail.html()+"'/>"); 
					tdPwd.html("<input type='text' id='txtPwd' value='"+tdPwd.html()+"'/>"); 
					tdMsg.html("<input type='text' id='txtMsg' value='"+tdMsg.html()+"'/>"); 
					tdeditBtn.html("<button data-event='save'> Save </button>");
					
					
						$('[data-event="save"]').click(function(e){
						e.preventDefault();
						
							// var pushId = $(this).closest('tr').attr('data-id');
							
							// var par = $(this).parent().parent();
							
							var tdEmail = par.children("td:nth-child(1)"); 
							var tdPwd = par.children("td:nth-child(2)"); 
							var tdMsg = par.children("td:nth-child(3)"); 
							var tdsaveBtn = par.children("td:nth-child(5)"); 
							
							var emailValu = tdEmail.children("input[type=text]").val(); 
							var pwdValu = tdPwd.children("input[type=text]").val(); 
							var msgValu = tdMsg.children("input[type=text]").val(); 
							tdsaveBtn.html("<button data-event='edit'> Edit </button>");


							 var b = confirm("Do you want to update this record?");
							 if (b == true){
								 
								updateData(emailValu, pwdValu, msgValu, pushId);
								// window.location.reload();
							 }
						});
				});
				
				
            }, function (error) {
                console.log("Error: " + error.code);
            });

// var table = document.getElementById('table');
                
                // for(var i = 1; i < table.rows.length; i++)
                // {
                    // table.rows[i].onclick = function()
                    // {
                         
                         // document.getElementById("em").value = this.cells[0].innerHTML;
                         // document.getElementById("pass").value = this.cells[1].innerHTML;
                         // document.getElementById("message").value = this.cells[2].innerHTML;
                    // };
                // }


