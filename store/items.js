export const state = () => ({
    items: []
})

export const getters = {
    getItems: (state) => {
        return state.items
    },
    getActiveItem: (state) => {
        return state.items.find(item => item.active === true)
    },
    getItemById: (state) => (id) => {
        return state.items.find(item => item.id === id)
    }
}

export const mutations = {
    ADD_ITEM(state, item) {
        state.items.unshift(item)
    },
    ADD_ITEMS(state, items) {
        // Put active item in first position
        items.sort(function (a, b) {
            return (a.active === b.active) ? 0 : a.active ? -1 : 1;
        });
        state.items = items
    },
    DELETE_ITEM(state, id) {
        let item = state.items.find(item => item.id === id)
        let itemIndex = state.items.indexOf(item);
        // Vérifie que l'item existe
        if (itemIndex !== -1) state.items.splice(itemIndex, 1)
    },
    UPDATE_ITEM(state, {
        id,
        data
    }) {
        let item = state.items.find(item => item.id === id)
        let itemIndex = state.items.indexOf(item);
        item = Object.assign({}, item, data)
        this._vm.$set(state.items, itemIndex, item);
    },
    REMOVE_ACTIVE_ITEMS(state) {
        state.items.forEach(element => element.active = false)
    }
}

export const actions = {
    updateActiveItem({
        commit,
        dispatch
    }, id) {
        dispatch('removeActiveItems')

        $nuxt.$DB.inventory.update(id, {
                active: true
            })
            .then(function () {
                commit('UPDATE_ITEM', {
                    id: id,
                    data: {
                        "active": true
                    }
                })
            })
            .catch(function (error) {
                console.error("Dexie: " + error);
            });
    },
    addItem({
        commit,
        dispatch
    }, item) {
        dispatch('removeActiveItems')

        item = Object.assign(item, {
            "attempts": 0,
            "coutTenta": 0,
            "prixDeVente": 0,
            "coutAcquisition": 0,
            "active": true,
            "typeExo": "pa",
            "isSave": false
        })

        $nuxt.$DB.inventory.put(item)
            .then(function (result) {
                item = Object.assign(item, {
                    'id': result
                })
                commit('ADD_ITEM', item)
            })
            .catch(function (error) {
                console.error("Dexie: " + error);
            });
    },
    deleteItem({
        commit
    }, id) {
        $nuxt.$DB.inventory.delete(id)
            .then(function () {
                commit('DELETE_ITEM', id)
            })
            .catch(function (error) {
                console.error("Dexie: " + error);
            });
    },
    updateItem({
        commit,
        getters
    }, {
        id,
        data
    }) {
        let item = getters.getItemById(id)
        item = Object.assign({}, item, data)

        $nuxt.$DB.inventory.put(item, id)
            .then(function () {
                commit('UPDATE_ITEM', {
                    id,
                    data
                })
            })
            .catch(function (error) {
                console.error("Dexie: " + error);
            });
    },
    removeActiveItems({
        commit
    }) {
        $nuxt.$DB.inventory.toCollection().modify(item => {
                item.active = false;
            })
            .then(function () {
                commit('REMOVE_ACTIVE_ITEMS')
            })
            .catch(function (error) {
                console.error("Dexie: " + error);
            });
    }
}