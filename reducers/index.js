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
const selectedTodayIncome = (todayIncome = 0, action) => {
    if (action.type === "TODAY_INCOME") {
        return action.payload;
    }
    return todayIncome
}
const selectedOnePlusOne = (onePlusOne = false, action) => {
    if (action.type === "ONE_PLUSONE") {
        return action.payload;
    }
    return onePlusOne
}
const selectedUserReducer = (selectedUser = null, action) => {
    if (action.type === "USER_SELECTED") {
        return action.payload;
    }
    return selectedUser
}
const selectedShowIncomeReducer = (selectedShow = false, action) => {
    if (action.type === "SHOW_INCOME") {
        return action.payload;
    }
    return selectedShow
}
export default combineReducers({
    selectedTheme: selectedThemeReducer,
    bluetoothStatus: selectedBluetoothStatus,
    todayIncome: selectedTodayIncome,
    onePlusOne: selectedOnePlusOne,
    selectedUser: selectedUserReducer,
    showIncome: selectedShowIncomeReducer,
})