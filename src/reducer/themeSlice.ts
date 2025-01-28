// themeSlice.ts  
import { createSlice } from '@reduxjs/toolkit';

interface ThemeState {
  theme: 'light' | 'dark';
}

const initialState: ThemeState = {
  theme: 'light'
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      console.log("toggleTheme", state.theme);
    },
    setTheme(state, action) {
      state.theme = action.payload;
      console.log("setTheme", state.theme);
    }
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;