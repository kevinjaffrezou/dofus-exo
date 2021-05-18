export const state = () => ({
    settings: {
        openNewItem: false
    }
})

export const getters = {
    getSettings: (state) => {
        return state.settings
    }
}

export const mutations = {
    OPEN_NEWITEM(state) {
        state.settings.openNewItem = true
    },
    CLOSE_NEWITEM(state) {
        state.settings.openNewItem = false
    }
}