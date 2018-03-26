
class Movie{
	constructor(id, title, release_date, overview, vote_average, vote_count, backdrop_path){
		this.id = id;
		this.title = title;
		this.release_date = release_date;
		this.overview = overview;
		this.vote_average = vote_average;
		this.vote_count = vote_count;
		this.backdrop_path = backdrop_path;
	}
}

function addMovie(movie) {
	model.movieList.push(new Movie(movie.id, movie.title,  movie.release_date,  movie.overview, movie.vote_average, movie.vote_count, movie.backdrop_path));
	notifyModelChange();
}

function notifyModelChange() {
	$model.trigger('modelchange');
}

function resetMovieList() {
	model.movieList = [];
	notifyModelChange();
}

function getMovie(id) {
    return model.movieList.find(function(movie){
        return movie.id === id;
    });
}

function getGenere() {
	
}

const model = {addMovie, getMovie, resetMovieList};
model.movieList = [];
const $model = $(model);
export default model;