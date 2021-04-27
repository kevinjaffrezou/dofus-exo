<template>
    <div class="new-item c-card">
        <div class="flex flex-row items-center">
            <div class="u-bg-blue10">
                <img class="new-item__img" :src="selectedItem.img" />
            </div>
            <div class="c-addon-container flex-1 mx-9">
                <span class="c-icon icon-search_black_24dp"></span>
                <input v-model="searchText" type="text" class="c-input" placeholder="Rechercher un item Dofus">
                <ul class="c-selectbox" v-if="items.length">
                    <li v-for="(item, index) in items" :key="index" @click="selectItem(item)">
                        <img :src="item.img" alt="">
                        {{ item.name }}
                    </li>
                </ul>
            </div>
            <TheButton class="--primary" @click.native="addItem(selectedItem)">Ajouter</TheButton>
        </div>
        {{getItem}}
    </div>
</template>

<script>
import _ from "lodash"

export default {
    data() {
        return {
            searchText: '',
            items: [],
            dofusEquiments: {},
            selectedItem: {
                img: require('~/assets/img/gelano@2x.png')
            }
        }
    },
    computed: {
        getItem: function () {
            return this.$store.getters.getItem
        }  
    },
    async fetch() {
        this.dofusEquiments = await this.$http.$get('https://fr.dofus.dofapi.fr/equipments')
    },
    watch: {
        searchText: function (text) {
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
            this.items = [] // Clear items from table
            this.selectedItem = {img: require('~/assets/img/gelano@2x.png')}
            if(this.searchText === '' ) return
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
                if(element.name.toLowerCase().includes(this.searchText.toLowerCase())) {
                    if(acceptedType.includes(element.type)) {
                        _this.items.push({
                            id: element._id,
                            name: element.name,
                            img: require('~/assets/img/gelano-colored.png'),
                            // img: require('../assets/img/items/'+element.imgUrl.split('/').slice(-1).pop()),
                            type: element.type
                        })
                    }
                    
                }
            })
        },
        selectItem: function (item) {
            this.selectedItem = item
            this.searchText = item.name
            this.items = []
        },
        addItem: function (item) {
            this.$store.commit('addItemToInventory', item)
        }
    }
}
</script>

<style lang="scss" scoped>
.new-item {
    margin-top: 130px;

    &__img {
        max-height: 100px;
    }
}
</style>