export const state = () => ({
    items: []
})

export const getters = {
    getItems: (state) => {
        return state.items
    },
    getActiveItem: (state) => {
        let ActiveItemIndex = state.items.map(function(item) { return item.active; }).indexOf(true);
        return state.items[ActiveItemIndex]
    }
}

export const mutations = {
    ADD_ITEM(state, item) {
        state.items.forEach(element => element.active = false)
        item = Object.assign(item, {
            "attempts": 0,
            "id": '_' + Math.random().toString(36).substr(2, 9),
            "active": true,
            "typeExo": "pa"
        })
        state.items.unshift(item)
    },
    UPDATE_ITEM(state, {itemId, data}) {
        // Search item index
        let itemIndex = state.items.map(function(e) { return e.id; }).indexOf(itemId);
        // Get item
        let item = state.items[itemIndex]
        // Update item data
        item = Object.assign(item, data)
        this._vm.$set(state.items, itemIndex, item);
    }
}

export const actions = {
    updateActiveItem({state, commit}, id) {
        state.items.forEach(element => element.active = false)
        commit('UPDATE_ITEM', {
            itemId: id,
            data: {"active": true}
        })
    },
}