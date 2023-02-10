//button validation of inputs 
$(document).ready(function() {
    $(".form").on("input", function() {
      if ($("input[name='name']").val() && $("input[name='email']").val()) {
        $("button").css("background-color", "white");
        $("button").removeAttr("disabled");
      } else {
        $("button").css("background-color", "grey");
        $("button").attr("disabled", true);
      }
    });
  });
