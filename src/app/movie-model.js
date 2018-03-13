
class Movie{
	constructor(id, title, rating, votes){
		this.id = id;
		this.title = title;
		this.rating = rating;
		this.votes = votes;
	}
}

function addMovie(movie) {
	model.movieList.push(new Movie(movie.id, movie.title,movie.rating, movie.votes));
	notifyModelChange();
}

function notifyModelChange() {
	$model.trigger('modelchange');
}

function resetMovieList() {
	model.movieList = [];
	notifyModelChange();
}

const model = {addMovie,resetMovieList}; //, getMovie, resetMovieList
model.movieList = [];
const $model = $(model);
export default model;