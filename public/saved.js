$.getJSON("/saved", function(data) {
    // For each one
    console.log(data);
    for (var i = 0; i < data.length; i++) {
      // Display the apropos information on the page
     
      if (data[i].summary != "") {}

        $("#articles").append(
      "<div class='col-lg-12' style='margin-bottom:60px;'><div class='card'><div class='card-body'><a class='title-link' a href='https://www.umnews.org'" +
      data[i].link + "https://www.umnews.org" +
      data[i].link + "'><h5>" +
      data[i].title + "</h5></a><hr><p class='card-text'>" +
      data[i].summary + "</p><button data-id='" +
      data[i]._id + "' class='btn-note btn btn-outline-primary btn-sm' data-toggle='modal' data-target='#myModal' style='margin-right:10px;'>Note</button><button id='btn-save' data-id='" +
      data[i]._id + "' class='btn btn-outline-primary btn-sm'>Delete Article</button></div></div></div>"
    );
  }

  console.log(data);
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
        $(".input").append("<button data-id='" + data._id + "' id='removenote' class='btn btn-primary btn-sm' style='margin-top:20px;'data-dismiss='modal'>Save Note</button>");
        $(".input").append("<button data-id='" + data._id + "' id='removearticle' class='btn btn-primary btn-sm' style='margin-top:20px;'data-dismiss='modal'>Delete Note</button>");
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
  $(document).on("click", "#removearticle", function() {
   
    var thisId = $(this).attr("data-id");
    console.log(thisId);
  
    $.ajax({
        method: "DELETE",
        url: "/saved/" + thisId,
  
    })
    
    .done(function(data) {
        console.log(data);
        location.reload();
    });
  });