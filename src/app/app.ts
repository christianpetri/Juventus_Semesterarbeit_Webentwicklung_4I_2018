///<reference path="../../node_modules/@types/jquery/index.d.ts"/>
import 'bootstrap';
import 'less';
import 'riot-route';
import route from 'riot-route';
import {apiKey} from './constants';
import '../css/index.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../img/logo_tmdb.png';
import {DefaultMovieModel} from "./movie-model";
import {Movie} from "./Movie";
import any = jasmine.any;

let model = new DefaultMovieModel();


route('/', function () {
    $('#content').empty();
    $('<h1>').appendTo('#content').text('Search Movie Database');
    $('<input type="text">').appendTo('#content').attr('id', 'searchQueryInput');
    $('<button>').appendTo('#content')
        .addClass('btn btn-primary btn-sm')
        .text(' Search Movie Database ')
        .on('click', () => {doSearch()});
    //'<div id="moviePageNavigation"></div>'
    standardMoiveBody();
});

route('/top', function () {
	$('#content').empty();
	//'<div id="moviePageNavigation"></div>'
    $('<h1>').appendTo('#content').text('Top Rated Movies');
    standardMoiveBody();
	getTopRatedMovies();
});

//https://api.themoviedb.org/3/discover/movie?api_key=84b8bbc00a5c8c683ef60c5709687388&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=12
route('/topgenre', function () {
	$('#content').empty();
	$('<h1>').appendTo('#content').text('Top Rated Movies by Genres');
	$('<div>').appendTo('#content').attr('id' , 'genres').addClass('col-sm-2 list-group');
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
                .addClass('list-group-item')
                .css('margin-right','10px')
                .css('margin-left', '15px')
				.on( 'click', () => { doSearchForGenres( {genreID: genreID } )});
		}
	});
});

//https://api.themoviedb.org/3/movie/upcoming?api_key=<<api_key>>&language=en-US&page=1
route('upcoming', function () {
    $('#content').empty();
    $('<h1>').appendTo('#content').text('Upcoming Movies');
    standardMoiveBody();
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
            .on('click', () => { showDetails( model.getMovie(movie.id)) })
            .addClass('list-group-item')
            .css('margin-left', '15px')
            .css('margin-right','20px');
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
    $('<h1>')
        .appendTo('#resultMovieListDetail')
        .text(movie.title)
        .append($('<small>')
        .text( ' ' +movie.release_date.substring(0, 4))).addClass('media-heading');
    $('<div>').appendTo('#resultMovieListDetail').text(movie.overview);
    if (movie.backdrop_path !== null) {
        $('<img>', {
            src: 'https://image.tmdb.org/t/p/w500' + movie.backdrop_path,
            width: '100%'
        }).appendTo('#resultMovieListDetail').addClass('.img-fluid').css('padding-top', '10px');
    } else{
        $('<div>').appendTo('#resultMovieListDetail').text('No Image found').css('padding-top', '10px');
    }
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

function standardMoiveBody(){
    $('<div>').appendTo('#content').attr('id' , 'resultMovieList').addClass('col-sm-5').addClass('list-group');
    $('<div>').appendTo('#content').attr('id' , 'resultMovieListDetail').addClass('col-sm-7');
    $('#resultMovieList,#resultMovieListDetail').wrapAll('<div>').addClass('row');
}

route.stop(); // clear all the old router callbacks
route.start(true); // start again
