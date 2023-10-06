import { createSlice } from "@reduxjs/toolkit";

export const songSlice = createSlice({
  name: "song",
  initialState: null, // Cambia el estado inicial a null para representar que no hay datos al principio
  reducers: {
    setSong: (state, action) => {
      return action.payload; // Devuelve el nuevo estado en lugar de mutar state
    },
  },
});

export const albumSlice = createSlice({
  name: "album",
  initialState: null,
  reducers: {
    setAlbum: (_, action) => {
      return action.payload;
    },
  },
});

export const recommendedSlice = createSlice({
  name: "recommended",
  initialState: null,
  reducers: {
    setRecommended: (_, action) => {
      return action.payload;
    },
  },
});

export const tracksSlices = createSlice({
  name: "tracks",
  initialState: null,
  reducers: {
    setTracks: (_, action) => {
      return action.payload;
    },
  },
});

export const queueSlice = createSlice({
  name: "queue",
  initialState: [],
  reducers: {
    setQueue: (_, action) => {
      return action.payload;
    },
  },
});

export const playListSlice = createSlice({
  name: "playList",
  initialState: [],
  reducers: {
    setPlayList: (_, action) => {
      return action.payload;
    }
  }
})

export const pageSlice = createSlice({
  name: "currentPage",
  initialState: 1,
  reducers: {
    setCurrentPage: (_, action) => {
      return action.payload;
    },
  },
});
