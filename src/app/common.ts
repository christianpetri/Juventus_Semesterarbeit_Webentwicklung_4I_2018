import {apiImageQuality , apiImageSecureBaseUrl , apiKey , baseUrlForAPI , baseUrlForBackend} from "./constants";
import {DefaultMovieModel} from "./Movie-Model";
import {Movie} from "./Movie";

let model = new DefaultMovieModel();

export function renderStandardMoviePage(title: string, apiRequest: string) {
    renderStandardMovieTemplate( title );
    addMovies( makeUrlForAPI( apiRequest ) );
}

export function renderStandardMovieTemplate(title: string) {
    $( '#content' ).empty();
    $( '<div>' ).appendTo( '#content' ).addClass( 'row' ).attr( 'id' , 'mainGridBody' );
    $( '<div>' ).appendTo( '#mainGridBody' ).addClass( 'col-sm-4' ).attr( 'id' , 'leftSide' );
    $( '<div>' ).appendTo( '#leftSide' ).addClass( 'row' ).attr( 'id' , 'nestedSequence' );
    $( '<h1>' )
        .appendTo( '#nestedSequence' ).addClass( 'col' )
        .text( title ).addClass( 'media-heading' )
        .attr( 'id' , 'pageTitle' )
        .addClass( 'page-header-blue' );
    $( '<span>' ).appendTo( '#nestedSequence' ).addClass( 'col' ).attr( 'id' , 'searchMovieTitle' );
    $( '<div>' ).appendTo( '#nestedSequence' ).attr( 'id' , 'resultMovieList' ).addClass( 'col' );
    $( '<div>' ).appendTo( '#mainGridBody' ).attr( 'id' , 'resultMovieListDetail' ).addClass( 'col-sm-8' );
}

export function makeUrlForAPI(option: string , query: string = ''): string {
    return baseUrlForAPI + option + '?api_key=' + apiKey + '&language=en-US' + query;
}

export function makeUrlForBackend(option: string , query: string = ''): string {
    if(query != ''){
        return baseUrlForBackend + option + '?' + query;
    } else {
        return baseUrlForBackend + option;
    }

}

export function addMovies(url: string) : any {
    model.resetMovieList();
    return fetch( url ).then( (response) => response.json()
    ).then( movies => {
        for (const movie of movies.results) { // Going over the results
            model.addMovie( movie ); // Add every movie to the model
        }
        renderMovies();
        return  movies.total_results;
    } ).catch( (err) => {
        console.log( err );
    } );
}

export function addMovie(url: string): any {
    model.resetMovieList();
    return fetch( url ).then( (response) => response.json()
    ).then( movie => {
        model.addMovie( movie ); // Add every movie to the model
        return;
    } ).catch( (err) => {
        console.log( err );
    } );
}

export function renderMovies() {
    $( '#resultMovieList' ).empty();
    let first_iteration = true;
    //console.log(model.movieList.length);
    for (const movie of model.movieList) { //Show all movies in the model
        $( '<div>' )
            .appendTo( '#resultMovieList' )
            .add( 'col-sm-5' )
            .text( movie.title )
            .on( 'click' , () => {
                showDetails( model.getMovie( movie.id ) )
            } )
            .addClass( 'movie-list-item' );
        if (first_iteration) {
            first_iteration = false;
            showDetails( model.getMovie( movie.id ) );
        }
    }
}

function showDetails(movie: Movie) {
    $( '#resultMovieListDetail' ).empty();
    $( '<h1>' )
        .appendTo( '#resultMovieListDetail' )
        .text( movie.title )
        .addClass( 'media-heading' )
        .append(
            $( '<small>' )
                .text( ' ' + movie.release_date.substring( 0 , 4 ) ).css( 'color' , '#lightgray' )
        );
    if (movie.backdrop_path !== null) {
        $( '<img>' , {
            src: apiImageSecureBaseUrl + apiImageQuality + movie.backdrop_path ,
            width: '100%' ,
            alt: 'movie poster'
        } ).appendTo( '#resultMovieListDetail' ).addClass( '.img-fluid' ).css( 'padding-top' , '10px' );
    } else {
        $( '<div>' ).appendTo( '#resultMovieListDetail' ).text( 'No Image found' ).css( 'padding-top' , '10px' );
    }

    $( '<span>' ).appendTo( '#resultMovieListDetail' ).text( 'average rating: ' + movie.vote_average + ' votes: ' + movie.vote_count )
        .css( 'color' , '#fda2a2' )
        .css( 'font-weight' , 'bold' )
        .css( 'font-size' , '18px' );
    let isAFavoriteMovie = false;

    $( '<span>' )
        .appendTo( '#resultMovieListDetail' )
        .attr( 'id' , 'favButton' )
        .addClass( 'glyphicon glyphicon-heart x1' )
        .css( 'color' , 'grey' )
        .css( 'padding-left' , '20px' )
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

    $( '<div>' ).appendTo( '#resultMovieListDetail' ).text( movie.overview );
}

function movieIsFavorite(id: any): any {
    return fetch( makeUrlForBackend('is/movie/a/favorite','movieID=' + id) )
        .then( (response) => response.json() )
        .then( (responseData) => {
            return responseData;
        } )
        .catch( error => console.warn( error ) );
}

function removeMovieFromFavoriteList(id: any) {
    postData( 'moviefavorite/remove' , {movieID: id} );
    let favoriteButton = $( '#favButton' );
    favoriteButton.empty();
    $( '<span>' ).appendTo( '#favButton' ).text( ' removed!' ).attr( 'id' , 'favButtonFade' );
    $( '#favButtonFade' ).fadeOut( 1000 );
    favoriteButton.css( 'color' , 'black' ).attr( 'title' , 'Add as a favorite' );

}

function addMovieToFavoriteList(id: any) {
    postData( 'moviefavorite/add' , {movieID: id} );
    let favoriteButton = $( '#favButton');
    favoriteButton.empty();
    $( '<span>' ).appendTo( '#favButton' ).text( ' added!' ).attr( 'id' , 'favButtonFade' );
    $( '#favButtonFade' ).fadeOut( 1000 );
    favoriteButton.css( 'color' , 'red' ).attr( 'title' , 'Remove as a favorite' );
}

export function postData(destiny: string , data: any) {
    fetch( makeUrlForBackend(destiny) ,
        {
            method: 'post' ,
            body: JSON.stringify( data ) ,
            headers: new Headers( {
                'Content-Type': 'application/json'
            } )
        } ).then( (response) => {
        console.log( response );
    } ).catch( (err) => {
        console.log( err );
    } );
}

