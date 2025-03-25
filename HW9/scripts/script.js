// oading JSON with jQuery, displaying results, applying a plugin
$(document).ready(function () {
  // Define your custom plugin
  $.fn.highlightNew = function () {
    this.css({
      "background-color": "#fff9c4", // light yellow
      "padding": "10px",
      "margin-bottom": "10px",
      "border": "1px solid #ddd",
      "border-radius": "5px"
    });
    return this;
  };

  // Load JSON and display it
  $.getJSON("../scripts/recalls.json", function (data) {
    let output = "";

    $.each(data.results, function (i, item) {
      output += "<div class='recall-card'>";
      output += "<strong>Product:</strong> " + item.product_description + "<br>";
      output += "<strong>Recall Date:</strong> " + item.recall_initiation_date + "<br>";
      output += "<strong>Reason:</strong> " + item.reason_for_recall + "<br>";
      output += "<strong>Firm:</strong> " + item.recalling_firm + "<br>";
      output += "<strong>Location:</strong> " + item.city + ", " + item.state + "<br>";
      output += "<strong>Distribution:</strong> " + item.distribution_pattern;
      output += "</div>";
    });

    $("#recalls").html(output);
    $(".recall-card").highlightNew(); // Apply your plugin
  });
});