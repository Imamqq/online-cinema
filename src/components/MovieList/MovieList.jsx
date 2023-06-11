import React from 'react'
import { useSelector } from 'react-redux'
import Slider from "react-slick";

import { fetching, getAllMovies, getAllShows } from '../../features/movies/movieSlice'
import MovieCard from '../../components/MovieCard/MovieCard'
import "./MovieList.scss"
import { settings } from '../../common/settings';


const MovieList = () => {

    const movies = useSelector(getAllMovies)
    const shows = useSelector(getAllShows)
    let loading = useSelector(fetching)
    console.log(loading)
    let renderMovies, renderShows = "";

    renderMovies = movies.Response === "True"
        ? (movies.Search.map((movie, index) => {
            return <MovieCard key={index} data={movie} />
        }))
        : (<div className="movies-error">
            <h3>{movies.Error}</h3>
        </div >)

    renderShows = shows.Response === "True"
        ? (shows.Search.map((movie, index) => {
            return <MovieCard key={index} data={movie} />
        }))
        : (<div className="shows-error">
            <h3>{shows.Error}</h3>
        </div >)

    if (!loading) {
        return (<div className='loading'>...Loading</div>)
    } return (
        <div className='movie-wrapper'>
            <div className='movie-list'>
                <h2>Movies</h2>
                <div className='movie-container'>
                    <Slider {...settings}>{renderMovies}</Slider>
                </div>
            </div>

            <div className='shows-list'>
                <h2>Shows</h2>
                <div className='movie-container'>
                    <Slider {...settings}>{renderShows}</Slider>
                </div>
            </div>

        </div>
    )
}

export default MovieList