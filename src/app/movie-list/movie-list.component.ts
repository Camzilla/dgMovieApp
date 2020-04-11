import { Component, OnInit } from '@angular/core';
import { MovieApiService } from './../movie-api.service';
import { Movie } from '../movie/movie';

@Component({
    selector: 'app-movie-list',
    templateUrl: './movie-list.component.html',
    styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
    selected = 2000;
    options = [1990, 2000];
    listOfMovies: Movie[] = [];
    filteredListOfMovies: Movie[] = [];

    constructor(private api: MovieApiService) { }

    ngOnInit(): void {
        this.getMovies();
    }

    getMovies() {
        let listOfMovieIds = [];

        this.api.searchMovies().subscribe(res => {

            const data = res["Search"];

            listOfMovieIds = data.map(id => {
                return id.imdbID;
            });

            for (const id of listOfMovieIds) {
                this.getMovieDetails(id);
            };
        });
    }

    getMovieDetails(id: string) {
        this.api.getMovieDetailsById(id).subscribe(data => {

            let movie: Movie;
            movie = { ...data };
            movie.Poster = '/assets/images/' + this.getImageSrc(movie.Poster);
            movie.Year = movie.Released.slice(movie.Released.length - 4);

            this.listOfMovies.push(movie);

            this.filterMovieList();
        });
    }

    getImageSrc(link: string){
        if(!link){ return ""; }
        return link.match(/[^\/]+$/)[0];
    }

    filterMovieList(selected: number = this.selected){

        this.filteredListOfMovies = [];

        this.filteredListOfMovies = this.listOfMovies.filter(movie => {

            let movieYear = parseInt(movie.Year, 10);

            if(selected == 2000){
                return movieYear >= 2000;
            }
            else if(selected == 1990){
                return movieYear >= 1990 && movieYear < 2000;
            }
        });

        this.selected = selected;
    }
}
