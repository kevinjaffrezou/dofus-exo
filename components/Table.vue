<template>
    <div>
        <h2 class="c-h2">Filtres</h2>
        <div class="flex flex-col md:flex-row md:items-center">
            <div class="c-addon-container w-full max-w-xs">
                <span class="c-icon icon-search_black_24dp"></span>
                <input type="text" class="c-input" placeholder="Ex : Anneau" v-model="search">
            </div>
            <div class="flex justify-between md:ml-9 u-margin-t-20-md-down">
                <button class="c-button-radio" @click="filterByType('pa')" :class="{ 'is-active': filterType === 'pa' }">
                    <img src="/img/pa.png" alt="">
                </button>
                <button class="c-button-radio ml-4" @click="filterByType('pm')" :class="{ 'is-active': filterType === 'pm' }">
                    <img src="/img/pm.png" alt="">
                </button>
                <button class="c-button-radio ml-4" @click="filterByType('po')" :class="{ 'is-active': filterType === 'po' }">
                    <img src="/img/po.png" alt="">
                </button>
                <button class="c-button-radio ml-4" @click="filterByType('none')" :class="{ 'is-active': filterType === 'none' }">
                    <span class="c-icon icon-highlight_off_black_24dp"></span>
                </button>
            </div>
            <TheButton @click.native="reset()" :disabled="search === '' && filterType === 'all' && sort === 'id'" class="md:ml-12 --grey30 --small u-margin-t-20-md-down">Reset</TheButton>
            <p class="ml-auto u-margin-t-20-md-down"><span class="font-bold">{{itemsFiltered.length}}</span> item{{ (itemsFiltered.length > 1 ? 's' : '')}} affiché{{ (itemsFiltered.length > 1 ? 's' : '')}}</p>
        </div>

        <div class="table-container">
            <table class="mt-5">
                <thead>
                    <tr>
                        <td>
                            <button class="button-sort" :class="{ active: sort === 'id', 'active-reverse': sort === 'id-reverse' }" @click="sortBy('id')">N° <span class="c-icon icon-arrow_drop_down_black_24dp"></span></button>
                        </td>
                        <td>
                            <p>Image</p>
                        </td>
                        <td>
                            <button class="button-sort" :class="{ active: sort === 'name', 'active-reverse': sort === 'name-reverse' }" @click="sortBy('name')">Nom de l’item <span class="c-icon icon-arrow_drop_down_black_24dp"></span></button>
                        </td>
                        <td>
                            <button class="button-sort" :class="{ active: sort === 'type', 'active-reverse': sort === 'type-reverse' }" @click="sortBy('type')">Type <span class="c-icon icon-arrow_drop_down_black_24dp"></span></button>
                        </td>
                        <td>
                            <button class="button-sort" :class="{ active: sort === 'attempts', 'active-reverse': sort === 'attempts-reverse' }" @click="sortBy('attempts')">Nb de tenta <span class="c-icon icon-arrow_drop_down_black_24dp"></span></button>
                        </td>
                        <td>
                            <button class="button-sort" :class="{ active: sort === 'benefice', 'active-reverse': sort === 'benefice-reverse' }" @click="sortBy('benefice')">Bénéfice <span class="c-icon icon-arrow_drop_down_black_24dp"></span></button>
                        </td>
                        <td>
                            <button class="button-sort" :class="{ active: sort === 'benefice-estime', 'active-reverse': sort === 'benefice-estime-reverse' }" @click="sortBy('benefice-estime')">Bénéfice estimé <span class="c-icon icon-arrow_drop_down_black_24dp"></span></button>
                        </td>
                        <td>
                            <button class="button-sort" :class="{ active: sort === 'cout-acquisition', 'active-reverse': sort === 'cout-acquisition-reverse' }" @click="sortBy('cout-acquisition')">Coût d’acquisition <span class="c-icon icon-arrow_drop_down_black_24dp"></span></button>
                        </td>
                        <td>
                            <button class="button-sort" :class="{ active: sort === 'cout-rune', 'active-reverse': sort === 'cout-rune-reverse' }" @click="sortBy('cout-rune')">Coût total des runes <span class="c-icon icon-arrow_drop_down_black_24dp"></span></button>
                        </td>
                        <td>
                            <button class="button-sort" :class="{ active: sort === 'prix', 'active-reverse': sort === 'prix-reverse' }" @click="sortBy('prix')">Prix de vente <span class="c-icon icon-arrow_drop_down_black_24dp"></span></button>
                        </td>
                        <td>
                            <p>Jet</p>
                        </td>
                        <td>
                            <p>Actions</p>
                        </td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item) in itemsSorted" :key="item.id" :class="{'u-bg-red5': item.exoPasse === false}">
                        <td>
                            <p>{{item.id}}</p>
                        </td>
                        <td>
                            <img class="w-8" :src="item.img" alt="">
                        </td>
                        <td>
                            <p>{{item.name}}</p>
                        </td>
                        <td>
                            <span v-if="item.typeExo === 'none'" class="c-icon icon-highlight_off_black_24dp"></span>
                            <img class="w-8" v-else :src="'/img/'+item.typeExo+'.png'" alt="">
                        </td>
                        <td class="text-right">
                            <p>{{item.attempts}}</p>
                        </td>
                        <td class="text-right">
                            <p class="text-sm" :class="{
                                'u-green10': Math.sign(benefice(item)) === 1, 
                                'u-red10': Math.sign(benefice(item)) === -1}">
                                {{$nuxt.$numberWithSpaces(benefice(item))}}
                            </p>
                        </td>
                        <td class="text-right">
                            <p class="text-sm" :class="{
                                'u-green10': Math.sign(beneficeEstime(item)) === 1, 
                                'u-red10': Math.sign(beneficeEstime(item)) === -1}">
                                {{$nuxt.$numberWithSpaces(beneficeEstime(item))}}
                            </p>
                        </td>
                        <td class="text-right">
                            <p class="text-sm">{{$nuxt.$numberWithSpaces(item.coutAcquisition)}}</p>
                        </td>
                        <td class="text-right">
                            <p class="text-sm">(<span class="font-bold">{{$nuxt.$numberWithSpaces(item.coutTenta)}}</span>/tenta) {{$nuxt.$numberWithSpaces(coutTotalRunes(item))}}</p>
                        </td>
                        <td class="text-right">
                            <p class="text-sm">{{$nuxt.$numberWithSpaces(item.prixDeVente)}}</p>
                        </td>
                        <td>
                            <a target="_blank" :href="item.url" class="c-link --blue" v-if="item.url">Lien</a>
                        </td>
                        <td>
                            <button @click="unsavedItem(item.id)" class="c-button-icon">
                                <span class="c-icon icon-unarchive_black_24dp"></span>
                            </button>
                            <button @click="$store.commit('OPEN_MODALDELETEITEM', item.id)" class="c-button-icon ml-5">
                                <span class="c-icon icon-delete_black_24dp"></span>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="calltoaction" v-if="items.length === 0">
            <img src="/img/default-item.png" class="c-img" alt="">
            <p class="text-2xl u-grey20 mt-4">
                0 item enregistré
            </p>
            <p class="text-xl u-grey20 mt-4">
                Valider votre premier exo et <br>
                analysez vos bénéfices
            </p>
        </div>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            search: "",
            filterType: "all",
            sort: 'id'
        }
    },
    computed: {
        items: function() {
            return this.$store.getters['items/getItems'].filter(item => item.isSave)
        },
        itemsFiltered: function() {
            return this.items.filter(item => {
                let pass = true

                // Si l'utilisateur utilise le champ de recherche
                if(this.search !== "") {
                    pass = false
                    if (item.name.toLowerCase().includes(this.search.toLowerCase())) pass = true
                    if (item.type.toLowerCase().includes(this.search.toLowerCase())) pass = true
                }

                // Si l'utilisateur filtre par type
                if(this.filterType !== "all" && pass !== false) {
                    pass = false
                    if (item.typeExo === this.filterType) pass = true
                }

                return pass
            });
        },
        itemsSorted: function() {
            let vm = this
            return this.itemsFiltered.sort(function (b, a) {

                if(vm.sort == "id") return a.id - b.id;
                if(vm.sort == "name") return (a.name < b.name) ? 1 : ((b.name < a.name) ? -1 : 0)
                if(vm.sort == "name-reverse") return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)
                if(vm.sort == "type") return (a.typeExo > b.typeExo) ? 1 : ((b.typeExo > a.typeExo) ? -1 : 0)
                if(vm.sort == "type-reverse") return (a.typeExo < b.typeExo) ? 1 : ((b.typeExo < a.typeExo) ? -1 : 0)
                if(vm.sort == "attempts") return a.attempts - b.attempts;
                if(vm.sort == "attempts-reverse") return b.attempts - a.attempts;
                if(vm.sort == "benefice") return vm.benefice(a) - vm.benefice(b);
                if(vm.sort == "benefice-reverse") return vm.benefice(b) - vm.benefice(a);
                if(vm.sort == "benefice-estime") return vm.beneficeEstime(a) - vm.beneficeEstime(b);
                if(vm.sort == "benefice-estime-reverse") return vm.beneficeEstime(b) - vm.beneficeEstime(a);
                if(vm.sort == "cout-acquisition") return a.coutAcquisition - b.coutAcquisition;
                if(vm.sort == "cout-acquisition-reverse") return b.coutAcquisition - a.coutAcquisition;
                if(vm.sort == "cout-rune") return vm.coutTotalRunes(a) - vm.coutTotalRunes(b);
                if(vm.sort == "cout-rune-reverse") return vm.coutTotalRunes(b) - vm.coutTotalRunes(a);
                if(vm.sort == "prix") return a.prixDeVente - b.prixDeVente;
                if(vm.sort == "prix-reverse") return b.prixDeVente - a.prixDeVente;
                
                
                return b.id - a.id;
            });
        }
    },
    methods: {
        beneficeEstime: function(item) {
            let nbTentaMoyen =  (item.typeExo === "po") ? 51 : 100
            return item.prixDeVente - item.coutAcquisition - item.coutTenta * nbTentaMoyen
        },
        benefice: function(item) {
            return item.prixDeVente - item.coutAcquisition - item.coutTenta * item.attempts
        },
        coutTotalRunes: function(item) {
            return item.coutTenta * item.attempts
        },
        filterByType: function(type) {
            if(this.filterType === type) {
                this.filterType = "all"
            } else {
                this.filterType = type
            }
        },
        reset: function() {
            this.search = ""
            this.filterType = "all"
            this.sort = "id"
        },
        unsavedItem: function(id) {
            this.$store.dispatch('items/updateActiveItem', id)
            this.$store.dispatch('items/updateItem', {
                id: id,
                data: {'isSave': false}
            })
        },
        sortBy: function(type) {
            if(type === this.sort) {
                this.sort = type + '-reverse'
            } else {
                this.sort = type
            }
        }
    }
}
</script>

<style scoped lang="scss">
.table-container {
    @media (max-width: 768px) { 
        max-width: 100%;
        overflow: scroll;
    }
}

table {
    table-layout: auto;
    width: 100%;

    td {
        height: 50px;
        padding-right: 40px;

        &:first-child {
            padding-left: 20px;
        }

        &:last-child {
            padding-right: 20px;
        }
    }
}

thead {
    background: $blue20;

    button,
    p {
        color: $purple30;
        font-weight: 600;
    }
}

tbody {
    background: white;

    tr + tr {
        border-top: 1px solid $blue30;
    }
}

.calltoaction {
    padding-top: 80px;
    padding-bottom: 140px;
    background-color: #fff;
    text-align: center;

    .c-img {
        height: 100px;
        margin: auto;
    }
}

.button-sort {
        position: relative;

        .c-icon {
            opacity: 0;
            position: absolute;
            top: 50%;
            right: 0;
            transform: translate(100%, -50%);
            font-size: 24px;
            transition: opacity $transition;
        }

        &:focus,
        &:hover {
            outline: 0;

            .c-icon {
                opacity: 1;
            }
        }

        &.active {
            .c-icon {
                opacity: 1;
            }
        }

        &.active-reverse {
            .c-icon {
                transform: translate(100%, -50%) rotate(180deg);
                opacity: 1;
            }
        }
    }
</style>