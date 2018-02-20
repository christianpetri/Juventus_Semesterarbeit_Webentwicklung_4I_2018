function httpGetAsync(theUrl)
{
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
          console.log(xmlHttp.responseText);
          document.getElementById("searchContainer").innerHTML = xmlHttp.responseText;
  }
  xmlHttp.open("GET", theUrl, true); // true for asynchronous
  xmlHttp.send(null);
}

var searchQuery = "Dark Nigh Rises";
window.onload = httpGetAsync("https://api.themoviedb.org/3/search/movie?api_key=84b8bbc00a5c8c683ef60c5709687388&language=en-US&query="+ searchQuery + "&page=1&include_adult=false");
