$("#login-btn").on("click", function(event) {
    var user = {
      username: $("#userNameLogin")
        .val()
        .trim(),
      password: $("#userLoginPassword")
        .val()
        .trim()
    };
    $.ajax("/login", {
      type: "POST",
      data: user
    }).then(function() {
      console.log("User signed in.");
    });
  });