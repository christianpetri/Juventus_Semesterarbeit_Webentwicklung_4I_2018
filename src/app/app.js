
import 'bootstrap';
import 'less';
import 'riot-route';
import route from 'riot-route';

import '../less/index.less';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../img/logo_tmdb.png';
import '../img/favicon.ico';
//import any = jasmine.any;

import {renderStandardMoviePage} from './common';

import {renderSearchPage} from './page/search';
import {renderTopGenrePage} from './page/topGenre';
import {renderShowHistoryPage} from './page/showHistory';
import {renderFavoriteMoviePage} from './page/favoriteMovies';
import {renderTestPage} from './page/test';

//Upcoming movies
route( '/' , function() {
	renderStandardMoviePage('Upcoming Movies','movie/upcoming');
} );

route( '/search' , function() {
	renderSearchPage();
});
route( 'popularMovies' , function() {
	renderStandardMoviePage( 'Popular Movies' , 'movie/popular' );
} );

route( '/topRated' , function() {
	renderStandardMoviePage( 'Top Rated Movies' , 'movie/top_rated' );
} );

route( '/topGenre' , function() {
	renderTopGenrePage();
});

route( 'showHistory' , function() {
	renderShowHistoryPage();
});

route( 'favoriteMovie' , function() {
	renderFavoriteMoviePage();
});

route( '/test' , function () {
	renderTestPage();
} );

route.stop(); // clear all the old router callbacks
route.start( true ); // start again
