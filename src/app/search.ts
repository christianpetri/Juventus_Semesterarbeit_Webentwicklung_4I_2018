import {addMovies , makeUrlForAPI , postData , renderStandardMovieTemplate} from "./common";

export function renderSearchPage() {
    renderStandardMovieTemplate( 'Search' );
    $( '<input>' ).appendTo( '#searchMovieTitle' )
        .attr( 'id' , 'searchQueryInput' )
        .attr( 'type' , 'text' )
        .css( 'width' , '90%' )
        .attr( 'placeholder' , 'Search for a movie' )
        .prop( 'required' , true );

    $( '<button>' ).appendTo( '#searchMovieTitle' )
        .addClass( 'btn btn-primary btn-sm' )
        .css( 'width' , '90%' )
        .css( 'margin-bottom' , '10px' )
        .text( ' Search the Movie Database ' )
        .on( 'click', () => {
            doSearch();
        } );

    $( '#searchMovieTitle' ).wrap( '<form>');
}

function doSearch() {
    //$( '#resultMovieListDetail' ).empty();
    alert('hello');
    const searchQuery = $( '#searchQueryInput' ).val();
    if (searchQuery != '') {
        const currentPage = 1;
        let url = makeUrlForAPI('search/movie');
        url  += '&query=' + searchQuery + '&page=' + currentPage + '&include_adult=false';
        addMovies( url );
        fetch( url , {
            method: 'get'
        } ).then( (response) => response.json()
        ).then( result => {
            postData( 'moviesearchquery' , {
                searchQuery: searchQuery ,
                totalResults: result.total_results
            } );
        } ).catch( (err) => {
            console.log( err );
        } );
    } else {
        console.log( 'Please enter a search query' );
    }
}
