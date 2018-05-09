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
        .on( 'click' , () => {
            doSearch();
        } );
    $( '#searchMovieTitle' ).wrap( '<form>' );
}

function doSearch() {
    const searchQuery = $( '#searchQueryInput' ).val();
    if (searchQuery != '') {
        let url = makeUrlForAPI( 'search/movie','&query=' + searchQuery );
        addMovies( url ).then( total_results =>{
            postData( 'moviesearchquery' , {
                searchQuery: searchQuery ,
                totalResults: total_results
            });
        });
    } else {
        console.log( 'Please enter a search query' );
    }
}
