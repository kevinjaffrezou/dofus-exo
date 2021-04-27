export const state = () => ({
    inventory: []
})

export const getters = {
    getItem: (state) => {
        return state.inventory
    },
}

export const mutations = {
    addItemToInventory(state, item) {
        state.inventory.push(item)
    },
}