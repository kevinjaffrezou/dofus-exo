export const state = () => ({
    settings: {
        openNewItem: false,
        openStatistics: false
    },
    modalDeleteItem: {
        show: false,
        itemId: ''
    },
    modalArchiveItem: {
        show: false,
        itemId: ''
    }
})

export const getters = {
    getSettings: (state) => {
        return state.settings
    },
    getModalDeleteItem: (state) => {
        return state.modalDeleteItem
    },
    getModalArchiveItem: (state) => {
        return state.modalArchiveItem
    }
}

export const mutations = {
    OPEN_NEWITEM(state) {
        state.settings.openNewItem = true
    },
    CLOSE_NEWITEM(state) {
        state.settings.openNewItem = false
    },
    OPEN_STATISTICS(state) {
        state.settings.openStatistics = true
    },
    CLOSE_STATISTICS(state) {
        state.settings.openStatistics = false
    },
    OPEN_MODALDELETEITEM(state, itemId) {
        state.modalDeleteItem.show = true
        state.modalDeleteItem.itemId = itemId
    },
    CLOSE_MODALDELETEITEM(state) {
        state.modalDeleteItem.show = false
        state.modalDeleteItem.itemId = ''
    },
    OPEN_MODALARCHIVEITEM(state, itemId) {
        state.modalArchiveItem.show = true
        state.modalArchiveItem.itemId = itemId
    },
    CLOSE_MODALARCHIVEITEM(state) {
        state.modalArchiveItem.show = false
        state.modalArchiveItem.itemId = ""
    }
}