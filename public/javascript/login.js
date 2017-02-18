/**
 * Created by Caciano on 2/9/2017.
 */

$("#new").click(function() { window.location = "sign-up.html"; });

$("#login").click(()=> {
    var email = $("#login-email").val(), password = $("#login-pass").val();
    $.ajax(
        {
            type: "POST",
            url: "/login.html",
            data: JSON.stringify({email: email, password: password}),
            contentType: "application/json"
        }
    )
});