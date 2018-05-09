import {baseUrlForBackend} from "./constants";
import {makeUrlForAPI} from "./common";

export function renderTestPage(){
    $( '#content' ).empty();
    fetch( baseUrlForBackend , {
        method: 'get'
    } ).then( (response) => {
        if (response.status == 200) {
            $( '<div>' ).appendTo( '#content' ).text( 'Backend is online' );
        }
        return response.json();
    } ).then( (response) => {
        $( '<div>' ).appendTo( '#content' ).text( response.response );
    } ).catch( (err) => {
        $( '<div>' ).appendTo( '#content' ).text( 'Backend offline. (Restart Backend with npm run start)' );
        console.warn( err );
    } );

    fetch( makeUrlForAPI('search/movie','&query=test') )
        .then(response => response.json())
        .then( (response) => {
            if(response.status_message != null){
                console.log( response.status_message);
                $( '<div>' ).appendTo( '#content' ).text( 'TMDb '+ response.status_message);
            } else {
                $( '<div>' ).appendTo( '#content' ).text('Connected to the TMDb API');
            }

    } ).catch( (err) => {
        $( '<div>' ).appendTo( '#content' ).text( 'Not connected to the TMDb API (Are you offline?)' );
        console.warn( err );
    } );
}