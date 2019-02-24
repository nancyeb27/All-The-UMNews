// Grab the articles as a json
$.getJSON("/articles", function (data) {
  // For each one
  // console.log(data);
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    console.log(data[i].summary);
    if (data[i].summary != "") {}

    $("#articles").append(
      "<div class='col-lg-12' style='margin-bottom:60px;'><div class='card'><div class='card-body'><a class='title-link' a href='https://www.umnews.org'" +
      data[i].link + "https://www.umnews.org" +
      data[i].link + "'><h5>" +
      data[i].title + "</h5></a><hr><p class='card-text'>" +
      data[i].summary + "</p><button data-id='" +
      data[i]._id + "' class='btn-note btn btn-outline-primary btn-sm' data-toggle='modal' data-target='#myModal' style='margin-right:10px;'>Note</button><button id='btn-save' data-id='" +
      data[i]._id + "' class='btn btn-outline-primary btn-sm'>Save Article</button></div></div></div>"
    );
  }

  console.log(data);
});



// Whenever someone clicks a fetch button
$(document).on("click", ".btn-fetch", function () {
  alert("Articles up-to-date!");

  $.ajax({
      method: "GET",
      url: "/scrape"
    })
    .done(function (data) {
      location.reload();
    });
});

// When you click the Note button
$(document).on("click", ".btn-note", function () {

  $(".modal-title").empty();
  $(".input").empty();

  // Save the id from .btn-note
  var thisId = $(this).attr("data-id");
  console.log(thisId);


  // Empty the notes from the note section
  // $("#notes").empty();
  // Save the id from the p tag
  // var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    })
    // With that done, add the note information to the page
    .then(function (data) {
      console.log(data);
      // The title of the article
      $(".modal-title").append("<h5>" + data.title + "</h5>");
      $(".input").append("<textarea id='bodyinput' name='body'></textarea>");
      $(".input").append("<button data-id='" + data._id + "' id='savenote' class='btn btn-primary btn-sm' style='margin-top:20px;'data-dismiss='modal'>Save Note</button>");
      $(".input").append("<button data-id='" + data._id + "' id='removenote' class='btn btn-primary btn-sm' style='margin-top:20px;'data-dismiss='modal'>Delete Note</button>");
      // If there's a note in the article
      if (data.note) {
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.note.body);
      }
    });
});

// When you click the savenote button
$(document).on("click", "#savenote", function () {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        
        // Value taken from note textarea
        body: $("#bodyinput").val()
      }
    })
    // With that done
    .done(function (data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      // $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
   $("#bodyinput").val("");
});

// When you click the Save Article button
$(document).on("click", "#btn-save", function () {
  $(this).addClass("disabled");
  var thisId = $(this).attr("data-id");
  console.log(thisId);

  $.ajax({
      method: "PUT",
      url: "/saved/" + thisId,

    })

    .done(function (data) {
      console.log(data);
    });
});


// When you click the removenote button
$(document).on("click", "#removenote", function () {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");


  // Run a DELETE request to change the note.
  $.ajax({
      method: "DELETE",
      url: "/articles/" + thisId,
      data: {
        // Value taken from note textarea
        body: $("#bodyinput").val()
      }
    })
    // With that done
    .done(function (data) {
      // A button to submit a delete note, with the id of the article saved to it

      // Log the response
      // console.log(data);
      // Empty the notes section
      // $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
    $("#bodyinput").val("");
});