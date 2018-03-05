/*
$(document).ready(function () {
    $searchQuery = "dark";
    $url = 'https://api.themoviedb.org/3/search/movie?api_key=84b8bbc00a5c8c683ef60c5709687388&language=en-US&query=' + $searchQuery + '&page=1&include_adult=false';
    $.get($url, function (data) {
        var movies = data.results;
        movies.forEach(function (movie) {
            $('<li>')
                .appendTo('#result')
                .text(movie.title)
                .append(
                    $('<button onclick="getMovieDetails('+movie.id +')">')
                        .text("Get Details")
                )
        })
    })
});
*/
function  getMoviesQuery() {
    $searchQuery = $('#searchQueryInput').val();
    $("#result").empty();
    $url = 'https://api.themoviedb.org/3/search/movie?api_key=84b8bbc00a5c8c683ef60c5709687388&language=en-US&query=' + $searchQuery + '&page=1&include_adult=false';
    $.get($url, function (data) {
        var movies = data.results;
        movies.forEach(function (movie) {
            $('<li>')
                .appendTo('#result')
                .text(movie.title)
                .append(
                    $(' <button onclick="getMovieDetails('+movie.id +')">')
                        .text("Get Details")
                )
        })
    })
}
/*
function getMovieDetails($movieID) {
    $url    = 'https://api.themoviedb.org/3/movie/' + $movieID +'?api_key=84b8bbc00a5c8c683ef60c5709687388';
    //$url="https://api.themoviedb.org/3/movie/4911?api_key=84b8bbc00a5c8c683ef60c5709687388";
    $.get($url, function (data) {
        var movie = data;
        $("#resultDetail").empty();
        $('<li>')
                .appendTo('#resultDetail')
                .text(movie.overview)
                .append(
                    $("<br><img src='https://image.tmdb.org/t/p/w500"+ movie.backdrop_path + "' style='height:100px'/>")
                )
    })
}
*/
function getMovieDetails($movieID) {
    $url    = 'https://api.themoviedb.org/3/movie/' + $movieID +'?api_key=84b8bbc00a5c8c683ef60c5709687388';
    //$url="https://api.themoviedb.org/3/movie/4911?api_key=84b8bbc00a5c8c683ef60c5709687388";
    $.get($url, function (data) {
        var movie = data;
        $("#resultDetail").empty();
        $('<li>')


            .text(movie.overview)
            .append(
                $("<br><img src='https://image.tmdb.org/t/p/w500"+ movie.backdrop_path + "' style='height:100px'/>")
            )
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
