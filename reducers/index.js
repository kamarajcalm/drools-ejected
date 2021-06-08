import { combineReducers } from 'redux';
const selectedThemeReducer = (selectedTheme = null, action) => {
    if (action.type === "THEME_SELECTED") {
        return action.payload;
    }
    return selectedTheme
}
export default combineReducers({
    selectedTheme: selectedThemeReducer,
})