import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAsyncDetail, getSelectedMovieOrShow } from '../../features/movies/movieSlice'

const MovieDetail = () => {

	const { imdbID } = useParams()
	// let imdbID = useLocation().pathname.slice(8)
	const dispatch = useDispatch()
	const data = useSelector(getSelectedMovieOrShow)
	useEffect(() => {
		dispatch(fetchAsyncDetail(imdbID.slice(1)))
	}, [dispatch, imdbID])
	console.log(data)
	return (
		<div>

		</div>
	)
}

export default MovieDetail