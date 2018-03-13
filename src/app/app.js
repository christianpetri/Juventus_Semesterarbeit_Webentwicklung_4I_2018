import 'bootstrap';
import 'less';
import route from 'riot-route';
import {apiKey} from './constants';
import '../css/index.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../img/logo_tmdb.png';

route('/', function () {
	$('#content').empty();
	$('<div>').appendTo('#content').html(
		'<h1>Search Movie Database</h1>' +
		'<input type="text" id="searchQueryInput"/>' +
		'<br>' +
		'<button id="seachQueryButton" type="button" class="btn btn-primary btn-lg">Search Movie Database</button>' +
		'<div id="moviePageNavigation"></div>' +
		'<div class="row">' +
		'<div id="result" class="col-sm-5"></div>' +
		'<div id="resultDetail" class="col-sm-5"></div>' +
		'</div>'
	);
});

route('/page/*', function (currentPage) {
	getMoviesQuery (currentPage);
});

route('search', function () {
	$('#content').empty();
	$('#content').html('Search');
});

$(document).ready(function () {
	$('#searchQueryInput').keyup(function (event) {
		if (event.keyCode === 13)  //13 --> pressed enter key
			$('#seachQueryButton').click();
	});
	$('#seachQueryButton').on('click', function(){
		getMoviesQuery('1');
	});
});
function getMoviesQuery (currentPage) {
	var searchQuery = $('#searchQueryInput').val();
	$('#result').empty();
	$('#resultDetail').empty();
	$('#moviePageNavigation').empty();
	var url = 'https://api.themoviedb.org/3/search/movie?api_key=' + apiKey + '&language=en-US&query=' + searchQuery + '&page=' + currentPage + '&include_adult=false';
	$.get(url, function (data) {
		var movies = data.results;
		var movie = data;

		if (movie.total_results !== 0) {
			movieSearchResultNavigation(movie.page,movie.total_pages);
			movies.forEach(function (movie) {
				$('<div>')
					.appendTo('#result')
					.html('<u>' + movie.title + '</u>')
					.on('click', () => getMovieDetails(movie.id));
			});

		} else
			$('<div>').appendTo('#result').html('Not movie(s) found');
	});
}

function movieSearchResultNavigation(currentPage, movie_total_pages) {

	var $html = '';
	if (parseInt(movie_total_pages, 10) > 1000) { //API restriction
		movie_total_pages = 1000;
	}
	var $moveOnePageForward = currentPage;
	var $moveOnePageBack = currentPage;
	if (parseInt(currentPage, 10) < 1000)
		$moveOnePageForward = parseInt(currentPage, 10) + 1;
	if (currentPage > 1)
		$moveOnePageBack = parseInt(currentPage, 10) - 1;

	if (currentPage !== '1') {
		$('<span>')
			.appendTo('#moviePageNavigation')
			.html('<< ')
			.on('click', () => getMoviesQuery(1));
		$('<span>')
			.appendTo('#moviePageNavigation')
			.html('< ')
			.on('click', () => getMoviesQuery($moveOnePageBack));
		//$html += '<a href=\'#\' title="previous page" onclick="getMoviesQuery(\'' + $moveOnePageBack + '\')"> < </a>';
	}
	if (currentPage == '1')
		$html += '<< < ';
	if (parseInt(movie_total_pages, 10) <= 9 || parseInt(currentPage, 10) < 5) {
		for (var i = 1; i < 10; i++) {
			var pageNumber = i;
			if (pageNumber === parseInt(currentPage, 10))
				$('<span>')
					.appendTo('#moviePageNavigation')
					.html('<strong>[' + pageNumber + ']</strong>')
					.on('click', () => getMoviesQuery(pageNumber));
			//$html += '<a href=\'#\'  title="' + pageNumber + '" onclick="getMoviesQuery(\'' + pageNumber + '\')"><strong>[' + pageNumber + ']</strong></a>';
			else
				$('<span>')
					.appendTo('#moviePageNavigation')
					.html('[' + pageNumber + ']');
			//$html += '<a href=\'#\'  title="' + pageNumber + '" onclick="getMoviesQuery(\'' + pageNumber + '\')">[' + pageNumber + ']</a>';
			if (parseInt(movie_total_pages, 10) == i)
				break;
		}
	} else {
		for (i = -4; i < 5; i++) {
			pageNumber = parseInt(currentPage, 10) + i;
			if ((pageNumber === parseInt(currentPage, 10)))
				$html += '<a href=\'#\'  title="' + pageNumber + '" onclick="getMoviesQuery(\'' + pageNumber + '\')"><strong>[' + pageNumber + ']</strong></a>';
			else
				$html += '<a href=\'#\'  title="' + pageNumber + '" onclick="getMoviesQuery(\'' + pageNumber + '\')">[' + pageNumber + ']</a>';
			if (parseInt(pageNumber, 10) == movie_total_pages)
				break;
		}
	}
	if (parseInt(currentPage, 10) < parseInt(movie_total_pages, 10)) {
		$html += '<a href=\'#\'  title="next page"      onclick="getMoviesQuery(\'' + $moveOnePageForward + '\')"> > </a>';
		$html += '<a href=\'#\'   title="last page"       onclick="getMoviesQuery(\'' + movie_total_pages + '\')"> >> </a>';
	}
	return $html;

}

/*
function movieSearchResultNavigation(currentPage, movie_total_pages) {
	//.text("Page " + currentPage + " of " + movie_total_pages +" ")
	var $html = '';
	if (parseInt(movie_total_pages, 10) > 1000) { //API restriction
		movie_total_pages = 1000;
	}
	var $moveOnePageForward = currentPage;
	var $moveOnePageBack = currentPage;
	if (parseInt(currentPage, 10) < 1000)
		$moveOnePageForward = parseInt(currentPage, 10) + 1;
	if (currentPage > 1)
		$moveOnePageBack = parseInt(currentPage, 10) - 1;

	if (currentPage !== '1') {
		$html += '<a href=\'#page/1\' title="first page"    onclick="getMoviesQuery(\'1\')"> << </a>';
		$html += '<a href=\'#\' title="previous page" onclick="getMoviesQuery(\'' + $moveOnePageBack + '\')"> < </a>';
	}
	if (currentPage == '1')
		$html += '<< < ';
	if (parseInt(movie_total_pages, 10) <= 9 || parseInt(currentPage, 10) < 5) {
		for (var i = 1; i < 10; i++) {
			var pageNumber = i;
			if (pageNumber === parseInt(currentPage, 10))
				$html += '<a href=\'#\'  title="' + pageNumber + '" onclick="getMoviesQuery(\'' + pageNumber + '\')"><strong>[' + pageNumber + ']</strong></a>';
			else
				$html += '<a href=\'#\'  title="' + pageNumber + '" onclick="getMoviesQuery(\'' + pageNumber + '\')">[' + pageNumber + ']</a>';
			if (parseInt(movie_total_pages, 10) == i)
				break;
		}
	} else {
		for (i = -4; i < 5; i++) {
			pageNumber = parseInt(currentPage, 10) + i;
			if ((pageNumber === parseInt(currentPage, 10)))
				$html += '<a href=\'#\'  title="' + pageNumber + '" onclick="getMoviesQuery(\'' + pageNumber + '\')"><strong>[' + pageNumber + ']</strong></a>';
			else
				$html += '<a href=\'#\'  title="' + pageNumber + '" onclick="getMoviesQuery(\'' + pageNumber + '\')">[' + pageNumber + ']</a>';
			if (parseInt(pageNumber, 10) == movie_total_pages)
				break;
		}
	}
	if (parseInt(currentPage, 10) < parseInt(movie_total_pages, 10)) {
		$html += '<a href=\'#\'  title="next page"      onclick="getMoviesQuery(\'' + $moveOnePageForward + '\')"> > </a>';
		$html += '<a href=\'#\'   title="last page"       onclick="getMoviesQuery(\'' + movie_total_pages + '\')"> >> </a>';
	}
	return $html;
}
*/
function getMovieDetails(movieID) {
	var url = 'https://api.themoviedb.org/3/movie/' + movieID + '?api_key=84b8bbc00a5c8c683ef60c5709687388';
	//var url="https://api.themoviedb.org/3/movie/4911?api_key=84b8bbc00a5c8c683ef60c5709687388";
	$.get(url, function (data) {
		var movie = data;
		var image = '';
		$('#resultDetail').empty();
		if (movie.backdrop_path !== null) {
			image = '<br><img src=\'https://image.tmdb.org/t/p/w500' + movie.backdrop_path + '\' style=\'width:100%\'/>';
		} else {
			image = '<br> No image available';
		}

		$('<div>')
			.appendTo('#resultDetail')
			.html('<h1>' + movie.title + ' <small>(' + movie.release_date.substring(0, 4) + ')</small></h1>' + movie.overview)
			.append('<br>' + image);

	});
}

route.stop(); // clear all the old router callbacks
route.start(true); // start again