/*import*/
import 'bootstrap';
import 'less';
import 'riot-route';
import route from 'riot-route';

import '../less/index.less';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../img/logo_tmdb.png';

//import any = jasmine.any;
import {renderUpcomingMovies} from './upcoming';
import {renderTestPage} from './test';
import {renderFavoriteMoviePage} from './favoriteMovies';
import {renderPopularMoviesPage} from './popularMovies';
import {renderSearchPage} from './search';
import {renderTopGenrePage} from './topGenre';
import {renderTopRatedMoviesPage} from './topRated';
import {renderShowHistoryPage} from './showHistory';

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
