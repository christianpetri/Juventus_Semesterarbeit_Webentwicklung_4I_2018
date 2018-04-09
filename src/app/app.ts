///<reference path="../../node_modules/@types/jquery/index.d.ts"/>
import 'bootstrap';
import 'less';
import 'riot-route';
import route from 'riot-route';
import {apiKey} from './constants';
import '../css/index.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../img/logo_tmdb.png';
//import model from "./movie-model";
import {DefaultMovieModel} from "./movie-model";
import {Movie} from "./Movie";
import any = jasmine.any;

let model = new DefaultMovieModel();


route('/', function () {
    $('#content').empty();
    $('<div>').appendTo('#content').html(
        '<h1>Search Movie Database</h1>' +
        '<input type="text" id="searchQueryInput"/>' +
        '<br>'
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

////https://api.themoviedb.org/3/discover/movie?api_key=84b8bbc00a5c8c683ef60c5709687388&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=12
route('/topgenre', function () {
	$('#content').empty();
	$('<h1>').appendTo('#content').text('Top ... by genres');
	$('<div>').appendTo('#content').attr('id' , 'genres').addClass('col-sm-2');
	$('<div>').appendTo('#content').attr('id' , 'resultMovieList').addClass('col-sm-4');
	$('<div>').appendTo('#content').attr('id' , 'resultMovieListDetail').addClass('col-sm-5');
    $('#genres,#resultMovieList,#resultMovieListDetail').wrapAll('<div>').addClass('row');
	const url = 'https://api.themoviedb.org/3/genre/movie/list?api_key=' + apiKey + '&language=en-US';
	$.get(url, function (data) { // URL with movies that meet the search criteria
		const genre = data.genres;
		for(let i = 0; i < genre.length; i++) {
			const genreID : number = genre[i].id;
			$('<div>').appendTo('#genres')
				.html(genre[i].name)
				.on( 'click', () => { doSearchForGenres( {genreID: genreID } )});
		}
	});
});

//https://api.themoviedb.org/3/movie/upcoming?api_key=<<api_key>>&language=en-US&page=1
route('upcoming', function () {
    $('#content').empty();
    $('<h1>').appendTo('#content').text('Upcoming Movies');
    $('<div>').appendTo('#content').attr('id' , 'resultMovieList').addClass('col-sm-5');
    $('<div>').appendTo('#content').attr('id' , 'resultMovieListDetail').addClass('col-sm-7');
    $('#resultMovieList,#resultMovieListDetail').wrapAll('<div>').addClass('row');
    getUpcomingMovies();
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
    $('#resultMovieListDetail').html('');
	const searchQuery = $('#searchQueryInput').val();
    const currentPage = 1;
    const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + apiKey + '&language=en-US&query=' + searchQuery + '&page=' + currentPage + '&include_adult=false';
    addMovies(url);
}

function doSearchForGenres(parameters: { genreID: any }) {
    let genreID = parameters.genreID;
	model.resetMovieList();
	$('#resultMovieListDetail').html('');
	////https://api.themoviedb.org/3/discover/movie?language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=12
	const url = 'https://api.themoviedb.org/3/discover/movie?&api_key=' + apiKey + '&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=' + genreID;
    addMovies(url);
}

function showDetails(movie : Movie) {
    const resultMovieListDetail = $('#resultMovieListDetail');
    resultMovieListDetail.html('');
    let image = '';
    if (movie.backdrop_path !== null) {
        image = '<br><img src=\'https://image.tmdb.org/t/p/w500' + movie.backdrop_path + '\' style=\'width:100%\'/>';
    } else {
        image = '<br> No image available';
    }

    $('<div>')
        .appendTo('#resultMovieListDetail')
        .html('<h1 class="media-heading">' + movie.title + ' <small>(' + movie.release_date.substring(0, 4) + ')</small></h1>' + movie.overview)
        .append('<br>' + image);

}
//https://api.themoviedb.org/3/movie/top_rated?api_key=<<api_key>>&language=en-US&page=1
function getTopRatedMovies() {
	const currentPage = 1;
	const url = 'https://api.themoviedb.org/3/movie/top_rated?api_key=' + apiKey + '&language=en-US&&page=' + currentPage;
    addMovies(url);
}

function addMovies(url : string) {
    model.resetMovieList();
    $.get(url, function (data) { // URL with movies that meet the search criteria
        const movies = data.results;
        for (const movie of movies) { // Going over the results
            model.addMovie(movie); // Add every movie to the model
        }
    });
}

function getUpcomingMovies() {
    const currentPage = 1;
    const url = 'https://api.themoviedb.org/3/movie/upcoming?api_key=' + apiKey + '&language=en-US&&page=' + currentPage;
    addMovies(url);
}

route.stop(); // clear all the old router callbacks
route.start(true); // start again
