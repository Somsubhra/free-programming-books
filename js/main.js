var apiRoot = "http://it-ebooks-api.info/v1";

function fetchSearchResults() {

  $("#message").hide();
  $("#results").html("");

  var query = $("#search-input").val();

  if(query == "") {
    return;
  }

  $.getJSON(apiRoot + "/search/" +  query, function(data) {

    var books = data.Books;

    for(var i = 0 ; i < books.length ; i++) {

      var bookId = books[i].ID;

      $.getJSON(apiRoot + "/book/" + bookId, function(book) {

        var content = '<div class="col-md-8 book-result">' +
          '<h3>' + book.Title + '</h3><hr>' +
          '<div class="row">' +
          '<div class="col-md-3">' +
          '<img src="' + book.Image + '" class="thumbnail">' +
          '<p class="center">' + book.Page + ' pages</p>' +
          '<a id="download-btn" class="btn btn-primary" href="' + book.Download + '">Download book here</a>' +
          '</div>' +
          '<div class="col-md-8">' +
          '<h4>' + book.SubTitle + '</h4>' +
          '<p>' + book.Description + '</p>' +
          '<ul>' +
          '<li>Author: ' + book.Author + '</li>' +
          '<li>Publisher: ' + book.Publisher + '</li>' +
          '<li>Year: ' + book.Year + '</li>' +
          '</ul>' +
          '</div>' +
          '</div>' +
          '</div>';

          $("#results").append(content);
      });
    }
  });
}

$(function() {
  $("#search-button").click(fetchSearchResults);
});
