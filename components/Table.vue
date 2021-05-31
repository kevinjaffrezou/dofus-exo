<template>
    <div>
        <h2 class="c-h2">Filtres</h2>
        <div class="flex">
            <div class="c-addon-container w-full max-w-xs">
                <span class="c-icon icon-search_black_24dp"></span>
                <input type="text" class="c-input" placeholder="Ex : Anneau" v-model="search">
            </div>
            <div class="flex justify-between ml-9">
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
            <TheButton @click.native="reset()" :disabled="search === '' && filterType === 'all'" class="ml-12 --grey30 --small">Reset</TheButton>

        </div>

        {{sort}}

        <table class="mt-5">
            <thead>
                <tr>
                    <td>
                        <button @click="sortBy('id')">N° <span class="c-icon icon-arrow_drop_down_black_24dp"></span></button>
                    </td>
                    <td>
                        <p>Image</p>
                    </td>
                    <td>
                        <button @click="sortBy('name')">Nom de l’item <span class="c-icon icon-arrow_drop_down_black_24dp"></span></button>
                    </td>
                    <td>
                        <button @click="sortBy('type')">Type <span class="c-icon icon-arrow_drop_down_black_24dp"></span></button>
                    </td>
                    <td>
                        <button @click="sortBy('attempts')">Nb de tenta <span class="c-icon icon-arrow_drop_down_black_24dp"></span></button>
                    </td>
                    <td>
                        <button @click="sortBy('benefice')">Bénéfice <span class="c-icon icon-arrow_drop_down_black_24dp"></span></button>
                    </td>
                    <td>
                        <button @click="sortBy('benefice-estime')">Bénéfice estimé <span class="c-icon icon-arrow_drop_down_black_24dp"></span></button>
                    </td>
                    <td>
                        <button @click="sortBy('cout-acquisition')">Coût d’acquisition <span class="c-icon icon-arrow_drop_down_black_24dp"></span></button>
                    </td>
                    <td>
                        <button @click="sortBy('cout-rune')">Coût total des runes <span class="c-icon icon-arrow_drop_down_black_24dp"></span></button>
                    </td>
                    <td>
                        <button @click="sortBy('prix')">Prix de vente <span class="c-icon icon-arrow_drop_down_black_24dp"></span></button>
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
                <tr v-for="(item) in itemsSorted" :key="item.id">
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
                            'u-green10': Math.sign(benefice(item.prixDeVente,item.coutAcquisition,item.coutTenta,item.attempts)) === 1, 
                            'u-red10': Math.sign(benefice(item.prixDeVente,item.coutAcquisition,item.coutTenta,item.attempts)) === -1}">

                            {{$nuxt.$numberWithSpaces(benefice(item.prixDeVente,item.coutAcquisition,item.coutTenta,item.attempts))}}
                        </p>
                    </td>
                    <td class="text-right">
                        <p class="text-sm" :class="{
                            'u-green10': Math.sign(beneficeEstime(item.typeExo,item.prixDeVente,item.coutAcquisition,item.coutTenta)) === 1, 
                            'u-red10': Math.sign(beneficeEstime(item.typeExo,item.prixDeVente,item.coutAcquisition,item.coutTenta)) === -1}">

                            {{$nuxt.$numberWithSpaces(beneficeEstime(item.typeExo,item.prixDeVente,item.coutAcquisition,item.coutTenta))}}
                        </p>
                    </td>
                    <td class="text-right">
                        <p class="text-sm">{{$nuxt.$numberWithSpaces(item.coutAcquisition)}}</p>
                    </td>
                    <td class="text-right">
                        <p class="text-sm">(<span class="font-bold">{{$nuxt.$numberWithSpaces(item.coutTenta)}}</span>/tenta) {{$nuxt.$numberWithSpaces(coutTotalRunes(item.coutTenta, item.attempts))}}</p>
                    </td>
                    <td class="text-right">
                        <p class="text-sm">{{$nuxt.$numberWithSpaces(item.prixDeVente)}}</p>
                    </td>
                    <td>
                        <a target="_blank" :href="item.url" class="c-link --blue" v-if="item.url">Lien</a>
                    </td>
                    <td>
                        <button @click="unsavedItem(item.id)" class="c-button-icon">
                            <span class="c-icon icon-replay_black_24dp"></span>
                        </button>
                        <button @click="$store.commit('OPEN_MODALDELETEITEM', item.id)" class="c-button-icon ml-5">
                            <span class="c-icon icon-delete_black_24dp"></span>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            search: "",
            filterType: "all",
            sort: 'id-reverse'
        }
    },
    computed: {
        items: function () {
            let items = this.$store.getters['items/getItems']
            return items.filter(item => item.isSave);
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
            return this.itemsFiltered.sort(function (a, b) {

                if(vm.sort == "id") return a.id - b.id;
                if(vm.sort == "type") return (a.typeExo > b.typeExo) ? 1 : ((b.typeExo > a.typeExo) ? -1 : 0)
                if(vm.sort == "type-reverse") return (a.typeExo < b.typeExo) ? 1 : ((b.typeExo < a.typeExo) ? -1 : 0)
                if(vm.sort == "attempts") return a.attempts - b.attempts;
                if(vm.sort == "attempts-reverse") return b.attempts - a.attempts;
                if(vm.sort == "benefice") {
                    let beneficeA = vm.benefice(a.prixDeVente,a.coutAcquisition,a.coutTenta,a.attempts)
                    let beneficeB = vm.benefice(b.prixDeVente,b.coutAcquisition,b.coutTenta,b.attempts)
                    return beneficeA - beneficeB;
                }
                if(vm.sort == "benefice-reverse") {
                    let beneficeA = parseInt(vm.benefice(a.prixDeVente,a.coutAcquisition,a.coutTenta,a.attempts))
                    let beneficeB = parseInt(vm.benefice(b.prixDeVente,b.coutAcquisition,b.coutTenta,b.attempts))
                    return beneficeB - beneficeA;
                }
                if(vm.sort == "name") return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)
                if(vm.sort == "name-reverse") return (a.name < b.name) ? 1 : ((b.name < a.name) ? -1 : 0)
                if(vm.sort == "cout-acquisition") return a.coutAcquisition - b.coutAcquisition;
                if(vm.sort == "cout-acquisition-reverse") return b.coutAcquisition - a.coutAcquisition;
                if(vm.sort == "prix") return a.prixDeVente - b.prixDeVente;
                if(vm.sort == "prix-reverse") return b.prixDeVente - a.prixDeVente;
                
                
                return b.id - a.id;
            });
        }
    },
    methods: {
        beneficeEstime: function(typeExo,prixDeVente,coutAcquisition,coutTenta) {
            let nbTentaMoyen =  (typeExo === "po") ? 51 : 100
            return prixDeVente - coutAcquisition - coutTenta * nbTentaMoyen
        },
        benefice: function(prixDeVente,coutAcquisition,coutTenta,attempts) {
            return prixDeVente - coutAcquisition - coutTenta * attempts
        },
        coutTotalRunes: function(coutTenta, nbTenta) {
            return coutTenta * nbTenta
        },
        filterByType: function(type) {
            this.filterType = type
        },
        reset: function() {
            this.search = ""
            this.filterType = "all"
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

    button {
        position: relative;
        .c-icon {
            position: absolute;
            top: 50%;
            right: 0;
            transform: translate(100%, -50%);
            font-size: 24px;
        }

        &:focus {
            outline: 0;
        }
    }
}

tbody {
    background: white;

    tr + tr {
        border-top: 1px solid $blue30;
    }
}
</style>