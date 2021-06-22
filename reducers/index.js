import { combineReducers } from 'redux';
const selectedThemeReducer = (selectedTheme = null, action) => {
    if (action.type === "THEME_SELECTED") {
        return action.payload;
    }
    return selectedTheme
}
const selectedBluetoothStatus = (bluetoothStatus = false, action) => {
    if (action.type === "BLUETOOTH_STATUS"){
        return action.payload;
    }
    return bluetoothStatus
}
export default combineReducers({
    selectedTheme: selectedThemeReducer,
    bluetoothStatus: selectedBluetoothStatus
})