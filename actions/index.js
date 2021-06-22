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