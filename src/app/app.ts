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

//with_genres
// string
// Comma separated value of genre ids that you want to include in the results.
//sort_by: Popularity
//Choose from one of the many available sort options.
//Allowed Values: , popularity.asc, popularity.desc, release_date.asc, release_date.desc, revenue.asc, revenue.desc, primary_release_date.asc, primary_release_date.desc, original_title.asc, original_title.desc, vote_average.asc, vote_average.desc, vote_count.asc, vote_count.desc
//default: popularity.desc
////https://api.themoviedb.org/3/discover/movie?api_key=84b8bbc00a5c8c683ef60c5709687388&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=12
route('/topgenre', function () {
	$('#content').empty();
	$('<h1>').appendTo('#content').text('Top ... by genres');
	$('<div>').appendTo('#content').attr('id' , 'genres').addClass('col-sm-2');
	//$('<hr>').appendTo('#content');
	$('<div>').appendTo('#content').attr('id' , 'resultMovieList').addClass('col-sm-4');
	$('<div>').appendTo('#content').attr('id' , 'resultMovieListDetail').addClass('col-sm-5');

	const url = 'https://api.themoviedb.org/3/genre/movie/list?api_key=' + apiKey + '&language=en-US';
	$.get(url, function (data) { // URL with movies that meet the search criteria
		const genre = data.genres;
		for(var i = 0; i < genre.length; i++) {
			const genreID : number = genre[i].id;
			$('<div>').appendTo('#genres')
				.html(genre[i].name) //genre[i].id
				.on( 'click', () => { doSearchForGenres( {genreID: genreID } )});
		}
	});
});

route('search', function () {
	$('#content').empty().html('Search');
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

function doSearchForGenres(parameters: { genreID: any }) {
    let genreID = parameters.genreID;
	model.resetMovieList();
	$('#resultMovieListDetail').html('');
	////https://api.themoviedb.org/3/discover/movie?language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=12
	const url = 'https://api.themoviedb.org/3/discover/movie?&api_key=' + apiKey + '&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=' + genreID;
	$.get(url, function (data) { // URL with movies that meet the search criteria
		const movies = data.results;
		for (const movie of movies) { // Going over the results
			model.addMovie(movie); // Add every movie to the model
		}
	});
}

function showDetails(movie : Movie) {
    //alert(movieDetail.title);
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
//
//
//https://api.themoviedb.org/3/genre/movie/list?api_key=<<api_key>>&language=en-US
function getMovieGenres() {
	$('#resultMovieListDetail').html('');
	const url = 'https://api.themoviedb.org/3/genre/movie/list?api_key=' + apiKey + '&language=en-US';
	$.get(url, function (data) { // URL with movies that meet the search criteria
		const genre = data.genres;

		for(var i = 0; i < genre.length; i++)
			$('<option>').appendTo('#resultMovieListDetail').text( genre[i].id + " " + genre[i].name );
		$("#resultMovieListDetail").appendTo('#resultMovieListDetail').text("</select>");
	})
}

route.stop(); // clear all the old router callbacks
route.start(true); // start again
