<template>
    <div class="c-card p-6">
        <div class="flex flex-row items-center">
            <div class="c-badge">
                <img :src="selectedItem.img" />
            </div>
            <div class="c-addon-container flex-1 mx-9">
                <span class="c-icon icon-search_black_24dp"></span>
                <input v-model="searchInput" type="text" class="c-input" placeholder="Rechercher un item Dofus">
                <ul class="c-selectbox" v-if="items.length">
                    <li v-for="(item, index) in items" :key="index" @click="selectItem(item)">
                        <img :src="item.img" alt="">
                        {{ item.name }}
                    </li>
                </ul>
            </div>
            <TheButton class="--primary" @click.native="addItem(selectedItem)">Ajouter</TheButton>
        </div>
    </div>
</template>

<script>
import _ from "lodash"

export default {
    data() {
        return {
            searchInput: '',
            items: [],
            dofusEquiments: {},
            selectedItem: {
                img: '/img/default-item.png'
            }
        }
    },
    async fetch() {
        this.dofusEquiments = await this.$http.$get('https://fr.dofus.dofapi.fr/equipments')
    },
    watch: {
        searchInput: function (text) {
            if (text !== this.selectedItem.name) {
                this.debouncedGetItems()
            }
        }
    },
    created() {
        this.debouncedGetItems = _.debounce(this.getItems, 500)
    },
    methods: {
        getItems: function () {
            this.items = [] // Clear items table
            this.selectedItem = {img: '/img/default-item.png'} // Remove current search
            if(this.searchInput === '' ) return
            const acceptedType = [
                "Anneau",
                "Amulette",
                "Bottes",
                "Bouclier",
                "Cape",
                "Ceinture",
                "Chapeau",
                "Sac à dos",
                "Arc",
                "Baguette",
                "Bâton",
                "Dague",
                "Faux",
                "Hache",
                "Marteau",
                "Pelle",
                "Épée"
            ];

            let _this = this
            this.dofusEquiments.forEach(element => {
                if(element.name.toLowerCase().includes(this.searchInput.toLowerCase())) {
                    if(acceptedType.includes(element.type)) {
                        _this.items.push({
                            dofusId: element._id,
                            name: element.name,
                            img: '/img/items/'+element.imgUrl.split('/').slice(-1).pop(),
                            type: element.type
                        })
                    }
                    
                }
            })
        },
        selectItem: function (item) {
            this.selectedItem = item
            this.searchInput = item.name
            this.items = []
        },
        addItem: function (item) {
            if(!this.selectedItem.dofusId) return
            this.$store.commit('items/addItemToInventory', item)
            this.selectedItem = {img: '/img/default-item.png'} // Remove current search
            this.searchInput = ''
        }
    }
}
</script>
