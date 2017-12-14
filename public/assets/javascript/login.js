$(document).ready(function() {
  var loginForm = $("form.login");
  var userInput = $("input#username");
  var passwordInput = $("input#password");

  loginForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      username: username.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.username || !userData.password) {
      return;
    }

    loginUser(userData.username, userData.password);
    userInput.val("");
    passwordInput.val("");
  });

  function loginUser(username, password) {
    $.post("/api/login", {
      username: username,
      password: password
    }).then(function(data) {
      window.location.replace(data);
    }).catch(function(err) {
      console.log(err);
    });
  }

});
