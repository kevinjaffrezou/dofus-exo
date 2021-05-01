export const state = () => ({
    inventory: [],
    currentId: 0
})

export const getters = {
    getInventory: (state) => {
        return state.inventory
    },
    getActiveItem: (state) => {
        let ActiveItemIndex = state.inventory.map(function(e) { return e.active; }).indexOf(true);
        return state.inventory[ActiveItemIndex]
    }
}

export const mutations = {
    addItemToInventory(state, item) {
        state.inventory.forEach(element => element.active = false)
        item = Object.assign(item, {
            "attempts": 0,
            "id": state.currentId++,
            "active": true,
            "coutAcquisition": null,
            "coutTenta": null,
            "prixDeVente": null
        })
        state.inventory.unshift(item)
    },
    updateActiveItem(state, item) {
        state.inventory.forEach(element => element.active = false)
        item = Object.assign(item, {
            "active": true
        })
        let itemIndex = state.inventory.map(function(e) { return e.id; }).indexOf(item.id);
        this._vm.$set(state.inventory, itemIndex, item);
    },
    refreshItemData(state, item) {
        // Enable resfresh data in inventory component
        let itemIndex = state.inventory.map(function(e) { return e.id; }).indexOf(item.id);
        this._vm.$set(state.inventory, itemIndex, item);
    }
}