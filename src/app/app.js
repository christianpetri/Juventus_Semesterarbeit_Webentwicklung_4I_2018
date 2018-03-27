import 'bootstrap';
import 'less';
import route from 'riot-route';
import {apiKey} from './constants';
import '../css/index.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../img/logo_tmdb.png';
//import model from "./movie-model";
import {DefaultMovieModel} from "./movie-model";

let model = new DefaultMovieModel();

route('/', function () {
    $('#content').empty();
    $('<div>').appendTo('#content').html(
        '<h1>Search Movie Database</h1>' +
        '<input type="text" id="searchQueryInput"/>' +
        '<br>'
        /*'<button id="searchQueryButton" type="button" class="btn btn-primary btn-lg">Search Movie Database</button>'*/
    );
    $('<button>').appendTo('#content')
        .addClass('btn btn-primary btn-sm')
        .text('Search Movie Database')
        .on('click', () => {doSearch()});
    $('<div>').appendTo('#content').html(
    '<div id="moviePageNavigation"></div>' +
    '<div class="row">' +
    '<div id="resultMovieList" class="col-sm-5"></div>' +
    '<div id="resultMovieListDetail" class="col-sm-7"></div>' +
    '</div>'
);
});
route('/top', function () {
	$('#content').empty();
	$('<div>').appendTo('#content').html(
		'<h1>Top Rated Movies</h1>' +
		'<br>' +
		'<div id="moviePageNavigation"></div>' +
		'<div class="row">' +
		'<div id="resultMovieList" class="col-sm-5"></div>' +
		'<div id="resultMovieListDetail" class="col-sm-7"></div>' +
		'</div>'
	);
	getTopRatedMovies();
});
route('/topgenre', function () {
	$('#content').empty();
	$('<div>').appendTo('#content').html(
		'<h1>Movie Genre</h1>' +
		'<br>'
		/*'<button id="searchQueryButton" type="button" class="btn btn-primary btn-lg">Search Movie Database</button>'*/
	);
	$('<div>').appendTo('#content').html(
		'<div id="moviePageNavigation"></div>' +
		'<div class="row">' +
		'<div id="resultMovieList" class="col-sm-5"></div>' +
		'<div id="resultMovieListDetail" class="col-sm-7"></div>' +
		'</div>'
	);
	getMovieGenres();
});

route('search', function () {
	$('#content').empty().html('Search');
});

$(document).ready(function () {
    $('#searchQueryInput').keyup(() => {
        if (event.keyCode === 13)  //13 --> pressed enter key
           doSearch();
    });
});

$(model).on('modelchange',() => {
	renderMovies();
});

function renderMovies() {
	const $resultList = $('#resultMovieList');
	$resultList.html('');
	for (const movie of model.movieList) { // Alle Filme im Model
		$('<div>') // anzeigen
			.appendTo('#resultMovieList')
            .add('col-sm-5')
			.text(movie.title)
            .on('click', () => { showDetails( model.getMovie(movie.id)) });
	}
}

function doSearch() {
    model.resetMovieList();
    $('#resultMovieListDetail').html('');
	const searchQuery = $('#searchQueryInput').val();
    const currentPage = 1;
    const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + apiKey + '&language=en-US&query=' + searchQuery + '&page=' + currentPage + '&include_adult=false';
	$.get(url, function (data) { // URL with movies that meet the search criteria
		const movies = data.results;
		for (const movie of movies) { // Going over the results
			model.addMovie(movie); // Add every movie to the model
		}
	});
}
function showDetails(movie) {
    //alert(movieDetail.title);
    const resultMovieListDetail = $('#resultMovieListDetail');
    resultMovieListDetail.html('');
   /*
    $('<div>') // anzeigen
        .appendTo('#resultMovieListDetail')
        .add('col-sm-5')
        .text(movie.title)
    */
    let image = '';
    if (movie.backdrop_path !== null) {
        image = '<br><img src=\'https://image.tmdb.org/t/p/w500' + movie.backdrop_path + '\' style=\'width:100%\'/>';
    } else {
        image = '<br> No image available';
    }

    $('<div>')
        .appendTo('#resultMovieListDetail')
        .html('<h1>' + movie.title + ' <small>(' + movie.release_date.substring(0, 4) + ')</small></h1>' + movie.overview)
        .append('<br>' + image);

}
//https://api.themoviedb.org/3/movie/top_rated?api_key=<<api_key>>&language=en-US&page=1
function getTopRatedMovies() {
	model.resetMovieList();
	$('#resultMovieListDetail').html('');
	const currentPage = 1;
	const url = 'https://api.themoviedb.org/3/movie/top_rated?api_key=' + apiKey + '&language=en-US&&page=' + currentPage;
	$.get(url, function (data) { // URL with movies that meet the search criteria
		const movies = data.results;
		for (const movie of movies) { // Going over the results
			model.addMovie(movie); // Add every movie to the model
		}
	});
}

//https://api.themoviedb.org/3/genre/movie/list?api_key=<<api_key>>&language=en-US
function getMovieGenres() {
	model.resetMovieList();
	$('#resultMovieListDetail').html('');
	const url = 'https://api.themoviedb.org/3/genre/movie/list?api_key=' + apiKey + '&language=en-US';
	$.get(url, function (data) { // URL with movies that meet the search criteria
		const movies = data.results;
		for (const movie of movies) { // Going over the results
			model.addMovie(movie); // Add every movie to the model
		}
	});
}
route.stop(); // clear all the old router callbacks
route.start(true); // start again
