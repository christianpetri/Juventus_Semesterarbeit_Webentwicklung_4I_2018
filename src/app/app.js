
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
    $("#moviePageNavigation").empty();
    $url = 'https://api.themoviedb.org/3/search/movie?api_key='+ $apiKey +'&language=en-US&query=' + $searchQuery + '&page='+$currentPage+'&include_adult=false';
    $.get($url, function (data) {
        var movies = data.results;
        $movie = data;
        if($movie.total_results !== 0){
            movies.forEach(function (movie) {
                $('<div>')
                    .appendTo('#result')
                    .html('<a onclick="getMovieDetails(' + movie.id + ')">'+ movie.title +"</a>")

            })
            $('<div>')
                .appendTo('#moviePageNavigation')
                .append(
                    movieSearchResultNavigation( $currentPage, $movie.total_pages )
                )
        } else{
            $('<div>')
                .appendTo('#result')
                .html("Not movie(s) found")
        }
    });
}
function movieSearchResultNavigation($currentPage, $movie_total_pages) {
    //.text("Page " + $currentPage + " of " + $movie_total_pages +" ")
    var $html = "";
    if(parseInt($movie_total_pages, 10) > 1000){ //API restriction
        $movie_total_pages = 1000;
    }
    var $moveOnePageForward = $currentPage;
    var $moveOnePageBack = $currentPage;
    if(parseInt($currentPage,10) < 1000)
        $moveOnePageForward =   parseInt($currentPage, 10)  +   1;
    if($currentPage > 1)
        $moveOnePageBack    =   parseInt($currentPage, 10)  -   1;

    if($currentPage !== "1"){
        $html += "<a href='#' title=\"first page\"    onclick=\"getMoviesQuery('1')\"> << </a>" ;
        $html += "<a href='#' title=\"previous page\" onclick=\"getMoviesQuery('" + $moveOnePageBack + "')\"> < </a>" ;
    }
    for($i = 1; $i < 10;$i++){
        if( $i === parseInt($currentPage, 10))
            $html += "<a href='#'  title=\""+$i+"\" onclick=\"getMoviesQuery('" + $i + "')\"><strong>["+ $i +"]</strong></a>";
        else
            $html += "<a href='#'  title=\""+$i+"\" onclick=\"getMoviesQuery('" + $i + "')\">["+ $i +"]</a>";
        if($i === parseInt($movie_total_pages, 10))
            break;
    }
    $html += "<a href='#'  title=\"next page\"      onclick=\"getMoviesQuery('" + $moveOnePageForward + "')\"> > </a>";
    $html += "<a href='#'   title=\"last page\"       onclick=\"getMoviesQuery('" + $movie_total_pages + "')\"> >> </a>";
    return $html;
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
