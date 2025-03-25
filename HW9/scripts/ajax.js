// AJAX specifically ( from the AJAX + JSON  with a button click)


$(document).ready(function () {
  $("#loadData").click(function () {
    $.ajax({
      url: "../scripts/recalls.json",
      method: "GET",
      dataType: "json",
      success: function (data) {
        let output = "";
        $.each(data.results, function (i, item) {
          output += "<div><strong>Product:</strong> " + item.product_description + "<br>";
          output += "<strong>Recall Date:</strong> " + item.recall_initiation_date + "<br>";
          output += "<strong>Reason:</strong> " + item.reason_for_recall + "</div><hr>";
        });
        $("#output").html(output);
      },
      error: function () {
        $("#output").html("<p>Failed to load data.</p>");
      }
    });
  });
});