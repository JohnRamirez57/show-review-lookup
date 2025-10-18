import {configureStore, createSlice} from "@reduxjs/toolkit"

interface ShowValues {
  searchResultShows: string[];
  favoritedShows: string[];
  query: string;
  showFavorites: boolean;
}

interface ShowState {
  value: ShowValues;
}

const initialState: ShowState = {value: {searchResultShows: [], favoritedShows: [], query: "", showFavorites: false}}

const userSlice = createSlice({
  name: "shows",
  initialState: initialState,
  reducers: {
    updateSearchResultShows: (state, action) => {
      state.value.searchResultShows = action.payload;
    },

    clearSearchResultShows: (state) => {
      state.value.searchResultShows = initialState.value.searchResultShows
    },

    updateFavoritedShows: (state, action) => {
      if (state.value.favoritedShows.includes(action.payload)){
        state.value.favoritedShows = state.value.favoritedShows.filter((show: string) => 
          show !== action.payload
        )
      } else {
        state.value.favoritedShows.push(action.payload)
      }
    },

    updateQuery: (state, action) => {
      state.value.query = action.payload
    },

    updateShowFavorites: (state) => {
      state.value.showFavorites = !state.value.showFavorites;
    }
  }
})

export const {updateSearchResultShows, updateQuery, updateFavoritedShows, updateShowFavorites} = userSlice.actions;

export const store = configureStore({
  reducer: {
    shows: userSlice.reducer
  }
})