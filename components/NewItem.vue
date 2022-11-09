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
                <span class="c-spinner" v-if="isLoading"></span>
                <input ref="search" v-model="searchInput" type="text" class="c-input" placeholder="Rechercher un item Dofus" @focus="isSearchbarFocused = true" @blur="isSearchbarFocused = false">
                <div>
                    <ul class="c-selectbox" v-if="items.length && isSearchbarFocused">
                        <li :class="{'is-focus': items[focusedItem] == item}" v-for="(item, index) in items" :key="index" @mousedown="selectItem(item)">
                            <img width="36" height="36" :src="item.img" alt="" loading="lazy">
                            {{ item.name }}
                        </li>
                    </ul>
                </div>
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
            isLoading: false,
            searchInput: '',
            items: [],
            focusedItem: null,
            isSearchbarFocused: false,
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
    mounted() {
        this.$refs.search.focus()
        document.addEventListener('keydown', this.keyboardAccessibility);
    },
    destroyed() {
        document.removeEventListener('keydown', this.keyboardAccessibility);
    },
    created() {
        this.debouncedGetItems = _.debounce(this.getItems, 500)
    },
    methods: {
        keyboardAccessibility: function(event) {
            switch (event.key) {
                case 'ArrowDown':
                    if(this.focusedItem === null || this.focusedItem >= this.items.length -1) {
                        this.focusedItem = 0
                    } else {
                        this.focusedItem++
                    }
                    break;
                case 'ArrowUp':
                    if(this.focusedItem === null || this.focusedItem === 0) {
                        this.focusedItem = this.items.length - 1
                    } else {
                        this.focusedItem--
                    }
                    break;
                case 'Enter':
                    if(this.focusedItem) this.selectItem(this.items[this.focusedItem])
                    if(this.searchInput !== '' && this.focusedItem === null) this.addItem(this.selectedItem)
                    break;
            }
        },
        getItems: async function () {
            let _this = this
            this.items = [] // Clear items table
            this.focusedItem = null // reset focusedItem index
            this.selectedItem = {img: '/img/default-item.png'} // Remove current search
            if(this.searchInput === '' ) return
            this.isLoading = true
            // const equipements = await this.$http.$get(`https://dofus-api.vercel.app/api?name=${this.searchInput}&cannotFm=false&limit=6`)
            const equipements = await this.$http.$get(`http://176.31.163.107/equipements?name=${this.searchInput}&cannotFm=false&limit=6`)
            this.isLoading = false
            
            equipements.forEach(element => {
                _this.items.push({
                    dofusId: element.dofusId,
                    name: element.name,
                    img: `/img/items/${element.imageId}.png`,
                    type: element.type
                })
            })
        },
        selectItem: function (item) {
            this.focusedItem = null // reset focusedItem index
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
