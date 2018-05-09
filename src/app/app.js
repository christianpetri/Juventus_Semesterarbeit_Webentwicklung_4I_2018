/*import*/
import 'bootstrap';
import 'less';
import 'riot-route';
import route from 'riot-route';

import '../less/index.less';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../img/logo_tmdb.png';
import '../img/favicon.ico';

//import any = jasmine.any;
import {renderUpcomingMovies} from './page/upcoming';
import {renderTestPage} from './page/test';
import {renderFavoriteMoviePage} from './page/favoriteMovies';
import {renderPopularMoviesPage} from './page/popularMovies';
import {renderSearchPage} from './page/search';
import {renderTopGenrePage} from './page/topGenre';
import {renderTopRatedMoviesPage} from './page/topRated';
import {renderShowHistoryPage} from './page/showHistory';

route( '/search' , function() {
	renderSearchPage();
});

route( '/top' , function() {
	renderTopRatedMoviesPage();
} );

route( '/topgenre' , function() {
	renderTopGenrePage();
});

//Upcoming movies
route( '/' , function() {
	renderUpcomingMovies();
} );

route( '/test' , function () {
	renderTestPage();
} );

route( 'showhistory' , function() {
	renderShowHistoryPage();
});

route( 'favoriteMovie' , function() {
	renderFavoriteMoviePage();
});

route( 'popularmovies' , function() {
	renderPopularMoviesPage();
} );

route.stop(); // clear all the old router callbacks
route.start( true ); // start again
