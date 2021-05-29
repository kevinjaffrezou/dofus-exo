export const state = () => ({
    settings: {
        openNewItem: false
    },
    modalDeleteItem: {
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
    }
}

export const mutations = {
    OPEN_NEWITEM(state) {
        state.settings.openNewItem = true
    },
    CLOSE_NEWITEM(state) {
        state.settings.openNewItem = false
    },
    OPEN_MODALDELETEITEM(state, itemId) {
        state.modalDeleteItem.show = true
        state.modalDeleteItem.itemId = itemId
    },
    CLOSE_MODALDELETEITEM(state) {
        state.modalDeleteItem.show = false
        state.modalDeleteItem.itemId = ''
    }
}