import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import movieApi from '../../common/apis/movieApi';
import { APIKey } from '../../common/apis/movieApiKey';

export const fetchAsyncMovies = createAsyncThunk("movies/fetchAsyncMovies",
    async (term) => {
        const response = await movieApi.get(
            `?apiKey=${APIKey}&s=${term}&type=movie`
        )
        return response.data;
    })

export const fetchAsyncShows = createAsyncThunk("movies/fetchAsyncShows",
    async (term) => {
        const response = await movieApi.get(
            `?apiKey=${APIKey}&s=${term}&type=series`
        )
        return response.data;
    })

export const fetchAsyncDetail = createAsyncThunk("movies/fetchAsyncDetail",
    async (id) => {
        const response = await movieApi.get(
            `?apiKey=${APIKey}&i=${id}&Plot=full`
        )
        return response.data;
    })

const initialState = {
    movies: {},
    shows: {},
    selectMovieOrShow: {},
    isFetching: false,
}

const movieSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        removeSelectedMovieOrShow: (state) => {
            state.selectMovieOrShow = {}
        },
    },
    extraReducers: {
        [fetchAsyncMovies.pending]: (state) => {
            console.log('pending')
            state.isFetching = false
        },
        [fetchAsyncMovies.fulfilled]: (state, { payload }) => {
            console.log('Fetched success1')
            return { ...state, movies: payload, isFetching: true }
        },
        [fetchAsyncMovies.rejected]: () => {
            console.log('Rejected')
        },
        [fetchAsyncShows.fulfilled]: (state, { payload }) => {
            console.log('Fetched success2')
            return { ...state, shows: payload, isFetching: true }
        },
        [fetchAsyncDetail.fulfilled]: (state, { payload }) => {
            console.log('Fetched success3')
            return { ...state, selectMovieOrShow: payload }
        },
    }
})

export const { removeSelectedMovieOrShow } = movieSlice.actions

export const getAllMovies = (state) => state.movies.movies
export const getAllShows = (state) => state.movies.shows
export const fetching = (state) => state.movies.isFetching
export const getSelectedMovieOrShow = (state) => state.movies.selectMovieOrShow

export default movieSlice.reducer