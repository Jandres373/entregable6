import {configureStore} from "@reduxjs/toolkit"
import { userSlice, userToken } from "./slices/user.slice"
import {songSlice,recommendedSlice, albumSlice, tracksSlices, queueSlice, playListSlice, pageSlice} from "./slices/song.slice"


const user = userSlice.reducer
const song = songSlice.reducer 
const recommended = recommendedSlice.reducer
const token = userToken.reducer
const album = albumSlice.reducer
const tracks = tracksSlices.reducer
const queue = queueSlice.reducer
const page = pageSlice.reducer
const playList = playListSlice.reducer

export default configureStore({
	reducer: {
		user,
		song,
		recommended,
		token,
		album,
		tracks,
		queue,
		page,
		playList,
	}
})