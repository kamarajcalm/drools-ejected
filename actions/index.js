export const selectTheme = (theme) => {
    return {
        type: 'THEME_SELECTED',
        payload: theme
    }
}
export const bluetoothStatus = (status) => {
    return {
        type: 'BLUETOOTH_STATUS',
        payload:status
    }
}
export const setTodayIncome = (income) => {
    return {
        type: 'TODAY_INCOME',
        payload: income
    }
}
export const setOnePlusOne = (status) => {
    return {
        type:'ONE_PLUSONE',
        payload: status
    }
}
export const selectUser = (user) => {
    return {
        type: 'USER_SELECTED',
        payload: user
    }
}
export const setShowIncome = (bool) => {
    return {
        type: 'SHOW_INCOME',
        payload: bool
    }
}