
$(document).ready(function () {
    $("#searchQueryInput").keyup(function(event) {
        if (event.keyCode === 13)  //13 --> pressed enter key
            $('#seachQueryButton').click();
    });

});



function  getMoviesQuery($currentPage) {
    $searchQuery = $('#searchQueryInput').val();

    $apiKey = "84b8bbc00a5c8c683ef60c5709687388";
    $("#result").empty();
    $("#resultDetail").empty();
    $url = 'https://api.themoviedb.org/3/search/movie?api_key='+ $apiKey +'&language=en-US&query=' + $searchQuery + '&page='+$currentPage+'&include_adult=false';
    $.get($url, function (data) {
        var movies = data.results;
        $movie = data;
        movies.forEach(function (movie) {
            $('<li>')
                .appendTo('#result')
                .text(movie.title +" ")
                .append(
                    $(' <button onclick="getMovieDetails(' + movie.id + ')">')
                        .text("Get Details")
                )
        })
        $("#moviePageNavigation").empty();
        $moveOnePageForward = $currentPage;
        $moveOnePageBack = $currentPage;
        if($currentPage < $movie.total_pages)
            $moveOnePageForward =   parseInt($currentPage, 10)  +   1;
        if($currentPage > 1)
            $moveOnePageBack    =   parseInt($currentPage, 10)  -   1;

        $('<div>')
            .appendTo('#moviePageNavigation')
            .text("Page " + $currentPage + " of " + $movie.total_pages +" ")

            .append(
                $("<button onclick=\"getMoviesQuery('1')\">First Page</button>" ),
                $("<button onclick=\"getMoviesQuery('" + $moveOnePageBack + "')\">previous page</button>" ),
                $("<button onclick=\"getMoviesQuery('" + $moveOnePageForward + "')\">next page</button>" ),
                $("<button onclick=\"getMoviesQuery('" + $movie.total_pages + "')\">last page</button>" )

            )

    });
}

function getMovieDetails($movieID) {
    $url    = 'https://api.themoviedb.org/3/movie/' + $movieID +'?api_key=84b8bbc00a5c8c683ef60c5709687388';
    //$url="https://api.themoviedb.org/3/movie/4911?api_key=84b8bbc00a5c8c683ef60c5709687388";
    $.get($url, function (data) {
        var movie = data;
        $imgae = "";
        $("#resultDetail").empty();
        if(movie.backdrop_path !== null) {
            $image = "<br><img src='https://image.tmdb.org/t/p/w500" + movie.backdrop_path + "' style='width:100%'/>";
        } else{
            $image = "<br> No image available";
        }

        $('<div>')
            .appendTo('#resultDetail')
            .html("<h1>" + movie.title + " <small>("+movie.release_date.substring(0, 4)+")</small></h1>" + movie.overview)
            .append( "<br>" + $image )

    })
}


/*
function httpGetAsync(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            console.log(xmlHttp.responseText);
        document.getElementById("searchContainer").innerHTML = xmlHttp.responseText;
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
}
*/
