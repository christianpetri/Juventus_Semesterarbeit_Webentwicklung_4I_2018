///<reference path="../../node_modules/@types/jquery/index.d.ts"/>
import 'bootstrap';
import 'less';
import 'riot-route';
import route from 'riot-route';
import {apiKey , databaseURL} from './constants';
import '../css/index.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../img/logo_tmdb.png';
import {DefaultMovieModel} from "./movie-model";
import {Movie} from "./Movie";
//import any = jasmine.any;

let model = new DefaultMovieModel();

route( '/search' , function () {
    standardMovieBody( 'Search' );
    $( '<input>' ).appendTo( '#searchMovieTitle' )
        .attr( 'id' , 'searchQueryInput' )
        .attr( 'type' , 'text' )
        .attr( 'placeholder' , 'Search for a movie' )
        .prop( 'required' , true );
    $( '<button>' ).appendTo( '#searchMovieTitle' )
        .addClass( 'btn btn-primary btn-sm' )
        .text( ' Search the Movie Database ' )
        .on( 'click' , () => {
            doSearch()
        } );
    $( '#searchMovieTitle' ).wrap( '<form>' );
} );

function doSearch() {
    $( '#resultMovieListDetail' ).empty();
    const searchQuery = $( '#searchQueryInput' ).val();
    const currentPage = 1;
    const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + apiKey + '&language=en-US&query=' + searchQuery + '&page=' + currentPage + '&include_adult=false';
    addMovies( url );
    fetch( url , {
        method: 'get'
    } ).then( (response) => {
        //console.log(response.json());
        return response.json();
    } ).then( result => {
        postData( 'moviesearchquery' , {
            searchQuery: searchQuery ,
            totalResults: result.total_results
        } );
    } ).catch( (err) => {
        console.log( err );
    } );
}

route( '/top' , function () {
    standardMovieBody( 'Top Rated Movies' );
    const url = 'https://api.themoviedb.org/3/movie/top_rated?api_key=' + apiKey + '&language=en-US';
    addMovies( url );
} );

//https://api.themoviedb.org/3/discover/movie?api_key=84b8bbc00a5c8c683ef60c5709687388&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=12
route( '/topgenre' , function () {
    $( '#content' ).empty();
    $( '<div>' ).appendTo( '#content' ).addClass( 'row' ).attr( 'id' , 'mainGridBodyGenre' );
    $( '<div>' ).appendTo( '#mainGridBodyGenre' ).addClass( 'col-sm-5' ).attr( 'id' , 'leftSide' );
    $( '<div>' ).appendTo( '#leftSide' ).addClass( 'row' ).attr( 'id' , 'nestedSequence' );
    $( '<div>' ).appendTo( '#nestedSequence' ).attr( 'id' , 'genres' ).addClass( 'col-sm-4' );
    $( '<h1>' ).appendTo( '#genres' ).text( 'Genre' ).addClass( 'media-heading' );
    $( '<div>' ).appendTo( '#nestedSequence' ).attr( 'id' , 'titleTopMovies' ).addClass( 'col-md-8' );
    $( '<div>' ).appendTo( '#titleTopMovies' ).attr( 'id' , 'resultMovieListTitle' );
    $( '<div>' ).appendTo( '#titleTopMovies' ).attr( 'id' , 'resultMovieList' );
    $( '<div>' ).appendTo( '#mainGridBodyGenre' ).attr( 'id' , 'resultMovieListDetail' ).addClass( 'col-md-7' );

    const url = 'https://api.themoviedb.org/3/genre/movie/list?api_key=' + apiKey + '&language=en-US';
    $.get( url , function (data) { // URL with movies that meet the search criteria
        const genre = data.genres;
        for (let i = 0; i < genre.length; i++) {
            const genreID: number = genre[i].id;
            $( '<div>' ).appendTo( '#genres' )
                .text( genre[i].name )
                .addClass( 'movie-list-item' )
                .on( 'click' , () => {
                    $( '#resultMovieListTitle' ).empty();
                    $( '<h1>' ).appendTo( '#resultMovieListTitle' ).text( genre[i].name ).addClass( 'media-heading' );
                    doSearchForGenres( {genreID: genreID} );
                } );
        }
    } );
} );

function doSearchForGenres(parameters: { genreID: any }) {
    let genreID = parameters.genreID;
    model.resetMovieList();
    $( '#resultMovieListDetail' ).empty();
    $( '<h1>' ).appendTo( '#resultMovieList' ).text( 'Genre' ).addClass( 'media-heading' );
    ////https://api.themoviedb.org/3/discover/movie?language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=12
    const url = 'https://api.themoviedb.org/3/discover/movie?&api_key=' + apiKey + '&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=' + genreID;
    addMovies( url );
}

//https://api.themoviedb.org/3/movie/upcoming?api_key=<<api_key>>&language=en-US&page=1
route( '/' , function () {
    standardMovieBody( 'Upcoming Movies' );
    const url = 'https://api.themoviedb.org/3/movie/upcoming?api_key=' + apiKey + '&language=en-US';
    addMovies( url );
} );

route( 'showhistory' , function () {
    $( '#content' ).empty();
    $( '<h1>' ).appendTo( '#content' ).text( 'Search history' );
    getMovieHistoryTemplate( '' , 'Last 5 search queries' , 'http://localhost:3000/movie/query/sort/last/5/' );
    $( '<span>' ).appendTo( '#content' ).text( 'Total Results: ' );
    getMovieHistoryTemplate( 'Total Results' , 'descending' , 'http://localhost:3000/movie/query/sort/totalresults/desc' );
    getMovieHistoryTemplate( 'Total Results' , 'ascending' , 'http://localhost:3000/movie/query/sort/totalresults/asc' );
    $( '<span>' ).appendTo( '#content' ).text( 'Search Date: ' );
    getMovieHistoryTemplate( 'Search Date' , 'descending' , 'http://localhost:3000/movie/query/sort/date/desc' );
    getMovieHistoryTemplate( 'Search Date' , 'ascending' , 'http://localhost:3000/movie/query/sort/date/asc' );
    $( '<form>' ).appendTo( '#content' ).attr( 'id' , 'searchDate' );
    $( '<span>' ).appendTo( '#searchDate' ).text( 'Search queries from ' );
    $( '<input>' ).appendTo( '#searchDate' ).attr( 'type' , 'date' ).attr( 'id' , 'searchDateFrom' ).prop( 'required' , true );
    $( '<span>' ).appendTo( '#searchDate' ).text( ' until now ' );
    $( '<input>' ).attr( 'type' , 'submit' ).attr( 'value' , 'submit' ).appendTo( '#searchDate' ).on( 'click' , () => {
        let date: any = $( '#searchDateFrom' ).val();
        let dateFrom: any = new Date( date ).getTime();
        getMovieSearchHistory( 'http://localhost:3000/movie/query/date?timestampDateFrom=' + dateFrom );
        $( '#searchQueryTitle' ).empty();
        $( '<h2>' ).appendTo( '#searchQueryTitle' ).text( ' Date' );
    } );
    $( '<div>' ).appendTo( '#content' ).attr( 'id' , 'searchQueryTitle' );
    $( '<h2>' ).appendTo( '#searchQueryTitle' ).text( ' Date' ).text( 'Last 5 search queries' );
    getMovieSearchHistory( 'http://localhost:3000/movie/query/sort/last/5/' );
    $( '<table>' ).appendTo( '#content' ).addClass( 'table table-striped' ).attr( 'id' , 'searchHistory' );
    $( '<thead>' ).appendTo( '#searchHistory' ).html( '<tr><th scope=\'col\'>Search</th><th scope=\'col\'>Total Results</th><th scope=\'col\'>Search Date / Time</th></tr>' );
    $( '<tbody>' ).appendTo( '#searchHistory' ).attr( 'id' , 'searchHistoryBody' );
} );

function getMovieHistoryTemplate(topic: string , description: string , url: string) {
    $( '<span>' ).appendTo( '#content' ).html( description ).addClass( 'movie-list-item' ).css( 'margin-right' , '15px' ).on( 'click' , () => {
        getMovieSearchHistory( url );
        $( '#searchQueryTitle' ).empty();
        $( '<h2>' ).appendTo( '#searchQueryTitle' ).text( topic + ' ' + description );
    } );
}

function getMovieSearchHistory(url: string) {
    $( '#searchHistoryBody' ).empty();
    fetch( url , {
        method: 'get'
    } ).then( (response) => {
        //console.log(response.json());
        return response.json();
    } ).then( (responses) => {
        for (const response of responses) { // Going over the results
            console.log( response.searchString );
            var title = response.searchString;
            var total = response.totalResults;
            var date = new Date( response.ts );
            var dateString = date.toLocaleString();
            $( '<tr>' ).appendTo( '#searchHistoryBody' ).html( '<th scope=\'row\'>' + title + '</th><td>' + total + '</td><td>' + dateString + '</td>' );
        }
    } ).catch( (err) => {
        console.log( err );
    } );
}

route( 'favoriteMovie' , function () {
    standardMovieBody( 'Favorite Movie' );
    getfavoriteMovies( 'http://localhost:3000/moviefavorite' );
} );

function getfavoriteMovies(url: string) {
    fetch( url , {
        method: 'get'
    } ).then( (response) => {
        return response.json();
    } ).then( (responses) => {
        //console.log( responses );
        model.resetMovieList();
        for (const response of responses) {
            addMovie( 'http://api.themoviedb.org/3/movie/' + response.id + '?api_key=' + apiKey );
        }
    } ).catch( (err) => {
        console.log( err );
    } );
}

$( model ).on( 'modelchange' , () => {
    renderMovies();
} );

function standardMovieBody(title: string) {
    $( '#content' ).empty();
    $( '<div>' ).appendTo( '#content' ).addClass( 'row' ).attr( 'id' , 'mainGridBody' );
    $( '<div>' ).appendTo( '#mainGridBody' ).addClass( 'col-sm-4' ).attr( 'id' , 'leftSide' );
    $( '<div>' ).appendTo( '#leftSide' ).addClass( 'row' ).attr( 'id' , 'nestedSequence' );
    $( '<h1>' ).appendTo( '#nestedSequence' ).addClass( 'col' ).text( title ).addClass( 'media-heading' ).attr( 'id' , 'pageTitle' );
    $( '<span>' ).appendTo( '#nestedSequence' ).addClass( 'col' ).attr( 'id' , 'searchMovieTitle' );
    $( '<div>' ).appendTo( '#nestedSequence' ).attr( 'id' , 'resultMovieList' ).addClass( 'col' );
    $( '<div>' ).appendTo( '#mainGridBody' ).attr( 'id' , 'resultMovieListDetail' ).addClass( 'col-sm-8' );
}

function renderMovies() {
    $( '#resultMovieList' ).empty();
    for (const movie of model.movieList) { // Alle Filme im Model anzeigen
        $( '<div>' )
            .appendTo( '#resultMovieList' )
            .add( 'col-sm-5' )
            .text( movie.title )
            .on( 'click' , () => {
                showDetails( model.getMovie( movie.id ) )
            } )
            .addClass( 'movie-list-item' );
    }
}

function showDetails(movie: Movie) {
    $( '#resultMovieListDetail' ).empty();
    $( '<h1>' )
        .appendTo( '#resultMovieListDetail' )
        .text( movie.title )
        .append( $( '<small>' )
            .text( ' ' + movie.release_date.substring( 0 , 4 ) ) ).addClass( 'media-heading' );
    let isAFavoriteMovie = false;

    $( '<div>' )
        .appendTo( '#resultMovieListDetail' )
        .attr( 'id' , 'favButton' )
        .addClass( 'glyphicon glyphicon-heart x1' )
        .css( 'color' , 'grey' )
        .attr( 'title' , 'Add as a favorite Movie' )
        .on( 'click' , () => {
            if (isAFavoriteMovie) {
                removeMovieFromFavoriteList( movie.id );
                isAFavoriteMovie = false;
            } else {
                addMovieToFavoriteList( movie.id );
                isAFavoriteMovie = true;
            }
        } );
    movieIsFavorite( movie.id ).then( responseData => {
            if (responseData.answer) {
                isAFavoriteMovie = true;
                $( '#favButton' )
                    .css( 'color' , 'red' )
                    .attr( 'title' , 'Remove as a favorite Movie' );
            } else {
                $( '#favButton' )
                    .css( 'color' , 'black' );
            }
        }
    );
    /*
    this.vote_average = vote_average;
        this.vote_count = vote_count;
    */
    $( '<div>' ).appendTo( '#resultMovieListDetail' ).text( 'vote average ' + movie.vote_average + ' vote count ' + movie.vote_count );
    $( '<div>' ).appendTo( '#resultMovieListDetail' ).text( movie.overview );
    if (movie.backdrop_path !== null) {
        $( '<img>' , {
            src: 'https://image.tmdb.org/t/p/w500' + movie.backdrop_path ,
            width: '100%'
        } ).appendTo( '#resultMovieListDetail' ).addClass( '.img-fluid' ).css( 'padding-top' , '10px' );
    } else {
        $( '<div>' ).appendTo( '#resultMovieListDetail' ).text( 'No Image found' ).css( 'padding-top' , '10px' );
    }
}

function removeMovieFromFavoriteList(id: any) {
    postData( 'moviefavorite/remove' , {movieID: id} );
    $( '#favButton' ).empty();
    $( '<span>' ).appendTo( '#favButton' ).text( ' removed!' ).attr( 'id' , 'favButtonFade' );
    $( '#favButtonFade' ).fadeOut( 1000 )
    $( '#favButton' ).css( 'color' , 'black' ).attr( 'title' , 'Add as a favorite' );

}

function addMovieToFavoriteList(id: any) {
    postData( 'moviefavorite/add' , {movieID: id} );
    $( '#favButton' ).empty();
    $( '<span>' ).appendTo( '#favButton' ).text( ' added!' ).attr( 'id' , 'favButtonFade' );
    $( '#favButtonFade' ).fadeOut( 1000 );
    $( '#favButton' ).css( 'color' , 'red' ).attr( 'title' , 'Remove as a favorite' );
}

function movieIsFavorite(id: any): any {
    let url = databaseURL + 'ismovieafavorite?movieID=' + id;
    return fetch( url , {
        method: 'get'
    } ).then( (response) => response.json() )
        .then( (responseData) => {
            return responseData;
        } )
        .catch( error => console.warn( error ) );
}

function addMovies(url: string) {
    model.resetMovieList();
    fetch( url , {
        method: 'get'
    } ).then( (response) => {
        //console.log(response.json());
        return response.json();
    } ).then( movies => {
        for (const movie of movies.results) { // Going over the results
            model.addMovie( movie ); // Add every movie to the model
        }
    } ).catch( (err) => {
        console.log( err );
    } );
}

function addMovie(url: string) {
    model.resetMovieList();
    fetch( url , {
        method: 'get'
    } ).then( (response) => {
        //console.log(response.json());
        return response.json();
    } ).then( movie => {
        model.addMovie( movie ); // Add every movie to the model
    } ).catch( (err) => {
        console.log( err );
    } );
}

function postData(destiny: string , data: any) {
    //console.log(url + destiny);
    fetch( databaseURL + '' + destiny ,
        {
            method: 'post' ,
            body: JSON.stringify( data ) ,
            headers: new Headers( {
                'Content-Type': 'application/json'
            } )
        } ).then( (response) => {
        console.log( response );
        //return response.json();
    } ).catch( (err) => {
        console.log( err );
    } );
}

route.stop(); // clear all the old router callbacks
route.start( true ); // start again
