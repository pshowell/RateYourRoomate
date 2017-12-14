$(document).ready(function() {
  var signUpForm = $("form.signup");
  var userInput = $("input#username");
  var passwordInput = $("input#password");

  signUpForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      username: userInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.username || !userData.password) {
      return;
    }
    signUpUser(userData.username, userData.password);
    userInput.val("");
    passwordInput.val("");
  });

  function signUpUser(username, password) {
    $.post("/api/signup", {
      username: username,
      password: password
    }).then(function(data) {
      window.location.replace(data);
    }).catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
