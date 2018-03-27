
import {Movie} from "./Movie";


export interface MovieModel {
	movieList: Movie [];
	addMovie : (movie : any ) => void;
	getMovie : (id : string) => Movie ;
    resetMovieList : () => void;
}


export class DefaultMovieModel implements MovieModel {
    public movieList: Movie [];
    private $model = $(this);

    public addMovie(movie : Movie) {
        this.movieList.push(new Movie(movie.id, movie.title,  movie.release_date,  movie.overview, movie.vote_average, movie.vote_count, movie.backdrop_path));
        this.notifyModelChange();
    }

    private notifyModelChange() {
       this.$model.trigger('modelchange');
    }

    public resetMovieList() {
        this.movieList = [];
        this.notifyModelChange();
    }

    public getMovie(id) {
        return this.movieList.find(function(movie){
            return movie.id === id;
        });
    }

    public getGenere() {

    }
}