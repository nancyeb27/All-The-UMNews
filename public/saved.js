$.getJSON("/saved", function(data) {
    // For each one
    console.log(data);
    for (var i = 0; i < data.length; i++) {
      // Display the apropos information on the page
     
      
      $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title +  "<br />" + "<a href='https://www.umnews.org'" + data[i].link + ">https://www.umnews.org" + data[i].link +
      "<a/>"  + "<br/>" + "<br/>" + data[i].summary + "</p>");
      }
    
  });

  // When you click the Note button
$(document).on("click", ".btn-note", function() {
  
    $(".modal-title").empty();
    $(".input").empty();
  
    // Save the id from .btn-note
    var thisId = $(this).attr("data-id");
  
    $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    })
      // With that done, add the note information to the page
      .done(function(data) {
        console.log(data);
  
        $(".modal-title").append("<h5>" + data.title + "</h5>");
        $(".input").append("<textarea id='bodyinput' name='body'></textarea>");
        $(".input").append("<button data-id='" + data._id + "' id='savenote' class='btn btn-primary btn-sm' style='margin-top:20px;'data-dismiss='modal'>Save Note</button>");
  
        // If there's a note in the article
        if (data.note) {
          // Place the body of the note in the body textarea
          $("#bodyinput").val(data.note.body);
        }
      });
  });
  
    
  // When you click the Save Note button
  $(document).on("click", "#savenote", function() {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");
    // console.log(thisId);
  
    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        // Value taken from note textarea
        body: $("#bodyinput").val()
      }
    })
    
      .done(function(data) {
        // Log the response
        console.log(data);
        // Empty the notes section
        // $("#bodyinput").empty();
      });
  
    // Remove the values entered in the input and textarea for note entry
    $("#bodyinput").val("");
  });
  
  
  // When you click the Delete button
  $(document).on("click", "#btn-delete", function() {
    
    var thisId = $(this).attr("data-id");
    console.log(thisId);
  
    $.ajax({
      method: "PUT",
      url: "/delete/" + thisId,
     
    })
    
    .done(function(data) {
        console.log(data);
        location.reload();
    });
  });