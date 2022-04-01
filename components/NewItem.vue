<template>
    <div class="c-card p-6 mt-20">
        <div class="c-card__buttons">
            <button @click="close" class="c-card__button"><span class="c-icon icon-close_black_24dp"></span></button>
        </div>
        <div class="flex flex-col md:flex-row items-center">
            <div class="c-badge">
                <img :src="selectedItem.img" />
            </div>
            <div class="c-addon-container flex-1 md:mx-9 u-margin-t-20-md-down">
                <span class="c-icon icon-search_black_24dp"></span>
                <input v-model="searchInput" type="text" class="c-input" placeholder="Rechercher un item Dofus">
                <ul class="c-selectbox" v-if="items.length">
                    <li v-for="(item, index) in items" :key="index" @click="selectItem(item)">
                        <img width="36" height="36" :src="item.img" alt="" loading="lazy">
                        {{ item.name }}
                    </li>
                </ul>
            </div>
            <TheButton class="--primary u-margin-t-20-md-down" @click.native="addItem(selectedItem)">Ajouter</TheButton>
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
            selectedItem: {
                img: '/img/default-item.png'
            }
        }
    },
    props: ['dofusEquiments'],
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
        getItems: async function () {
            let _this = this
            this.items = [] // Clear items table
            this.selectedItem = {img: '/img/default-item.png'} // Remove current search
            if(this.searchInput === '' ) return

            const equipements = await this.$http.$get(`https://dofus-api.vercel.app/api?name=${this.searchInput}&cannotFm=false`)
            
            equipements.forEach(element => {
                _this.items.push({
                    dofusId: element.dofusId,
                    name: element.name,
                    img: `/img/items/${element.imageId}.png`,
                    type: element.type
                })
            });
            


            // const acceptedType = [
            //     "Anneau",
            //     "Amulette",
            //     "Bottes",
            //     "Bouclier",
            //     "Cape",
            //     "Ceinture",
            //     "Chapeau",
            //     "Sac à dos",
            //     "Arc",
            //     "Baguette",
            //     "Bâton",
            //     "Dague",
            //     "Faux",
            //     "Hache",
            //     "Marteau",
            //     "Pelle",
            //     "Épée"
            // ];

            // let _this = this
            // this.dofusEquiments.forEach(element => {
            //     if(element.name.toLowerCase().includes(this.searchInput.toLowerCase())) {
            //         if(acceptedType.includes(element.type)) {
            //             _this.items.push({
            //                 dofusId: element._id,
            //                 name: element.name,
            //                 img: '/img/items/'+element.imgUrl.split('/').slice(-1).pop(),
            //                 type: element.type
            //             })
            //         }
                    
            //     }
            // })
        },
        selectItem: function (item) {
            this.selectedItem = item
            this.searchInput = item.name
            this.items = []
        },
        addItem: function (item) {
            if(this.selectedItem.dofusId) {
                this.$store.dispatch('items/addItem', item)
            } else {
                this.$store.dispatch('items/addItem', {
                    dofusId: 0,
                    img: '/img/default-item.png',
                    name: this.searchInput,
                    type: null
                })
            }
            this.selectedItem = {img: '/img/default-item.png'} // Remove current search
            this.searchInput = '' // clear search input
            this.$store.commit('CLOSE_NEWITEM') // Close composant
        },
        close: function() {
            this.$store.commit('CLOSE_NEWITEM')
        }
    }
}
</script>
