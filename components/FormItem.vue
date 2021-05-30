<template>
    <div class="c-card p-6" v-if="getActiveItem">
        <div class="c-card__buttons">
            <button @click="$store.commit('OPEN_MODALARCHIVEITEM', getActiveItem.id)" class="c-card__button"><span class="c-icon icon-inventory_2_black_24dp"></span></button>
            <button @click="$store.commit('OPEN_MODALDELETEITEM', getActiveItem.id)" class="c-card__button"><span class="c-icon icon-delete_black_24dp"></span></button>
        </div>
        <div class="flex">
            <div class="c-badge">
                <img :src="getActiveItem.img" />
            </div>
            <div class="ml-9 flex flex-col justify-between flex-grow">
                <div>
                    <h1 class="c-h1">{{getActiveItem.name}}</h1>
                </div>
                <div class="flex justify-between p-benefice-container">
                    <div class="w-5/12" v-if="getActiveItem.typeExo !== 'none'">
                        <p class="c-p">
                            Bénéfice estimé 
                            <span v-tooltip="'Bénéfice si la tentative d’exo se fait à la 100ième tentatives Permet de calculer la rentabilité spéculative de l’exo'"><sup  class="c-icon icon-help_outline_black_24dp"></sup></span>
                        </p>
                        <p :class="{'u-green10': Math.sign(beneficeEstime) === 1, 'u-red10': Math.sign(beneficeEstime) === -1}" class="c-p text-sm text-right">{{$nuxt.$numberWithSpaces(beneficeEstime)}}</p>
                    </div>
                    <div class="w-5/12">
                        <p class="c-p">Bénéfice</p>
                        <p :class="{'u-green10': Math.sign(benefice) === 1, 'u-red10': Math.sign(benefice) === -1}" class="c-p text-sm text-right">{{$nuxt.$numberWithSpaces(benefice)}}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="grid grid-cols-3 gap-x-10 gap-y-5 mt-6 items-center">
            <div class="text-right">
                <label class="c-p">Type d’exo</label>
            </div>
            <div class="flex justify-between">
                <button @click="updateItem('typeExo', 'pa')" class="c-button-radio" :class="{ 'is-active': getActiveItem.typeExo === 'pa' }">
                    <img src="/img/pa.png" alt="">
                </button>
                <button @click="updateItem('typeExo', 'pm')" class="c-button-radio" :class="{ 'is-active': getActiveItem.typeExo === 'pm' }">
                    <img src="/img/pm.png" alt="">
                </button>
                <button @click="updateItem('typeExo', 'po')" class="c-button-radio" :class="{ 'is-active': getActiveItem.typeExo === 'po' }">
                    <img src="/img/po.png" alt="">
                </button>
                <button @click="updateItem('typeExo', 'none')" class="c-button-radio" :class="{ 'is-active': getActiveItem.typeExo === 'none' }">
                    <span class="c-icon icon-highlight_off_black_24dp"></span>
                </button>
            </div>
            <div class="row-span-4">
                <label class="c-p">Nb de tentatives :</label>
                <input type="number" :class="{'u-blue40': getActiveItem.exoPasse}" class="c-input --no-border-radius-bottom --lg mt-1" :value="getActiveItem.attempts" @input="updateItem('attempts', $event, true)">
                <div class="flex" :class="{'invisible': getActiveItem.exoPasse}">
                    <button class="p-button" @click="incrementAttemps(1)">+1</button>
                    <button class="p-button" @click="incrementAttemps(10)">+10</button>
                </div>
                <TheButton v-if="!getActiveItem.exoPasse" @click.native="updateItem('exoPasse', true)" class="--primary mt-5 w-full">Passé !</TheButton>
                <TheButton v-if="getActiveItem.exoPasse" @click.native="updateItem('exoPasse', false)" class="--stroked mt-5 w-full">Annuler</TheButton>
            </div>
            <div class="text-right">
                <label class="c-p">Coût d'acquisition <span v-tooltip="'Prix d’achat de l’item ou coût total des ressources'"><sup  class="c-icon icon-help_outline_black_24dp"></sup></span></label>
            </div>
            <div>
                <div class="c-addon-container --right">
                    <input type="number" class="c-input text-right" :value="getActiveItem.coutAcquisition" @input="updateItem('coutAcquisition', $event, true)">
                    <img src="/img/kamas.png" srcset="/img/kamas.png 1x, /img/kamas@2x.png 2x" alt="" class="c-img">
                </div>
            </div>
            <div class="text-right">
                <label class="c-p">Coût des runes pour 1 tenta</label>
            </div>
            <div class="relative">
                <div class="c-addon-container --right">
                    <input type="number" class="c-input text-right" :value="getActiveItem.coutTenta" @input="updateItem('coutTenta', $event, true)">
                    <img src="/img/kamas.png" srcset="/img/kamas.png 1x, /img/kamas@2x.png 2x" alt="" class="c-img">
                </div>
                <p class="p-cout-tenta-cent c-p text-xs" v-if="coutRunePassage !== 0"><span class="font-bold">{{$nuxt.$numberWithSpaces(coutRunePassage)}}</span>k pour {{nbTentaMoyen}} tenta</p>
            </div>
            <div class="text-right">
                <label class="c-p">Prix de vente</label>
            </div>
            <div>
                <div class="c-addon-container --right">
                    <input type="number" class="c-input text-right" :value="getActiveItem.prixDeVente" @input="updateItem('prixDeVente', $event, true)">
                    <img src="/img/kamas.png" srcset="/img/kamas.png 1x, /img/kamas@2x.png 2x" alt="" class="c-img">
                </div>
            </div>
        </div>
        <div v-if="getActiveItem.exoPasse">
            <hr class="mt-10 mb-8">
            <div class="grid grid-cols-3 gap-x-10">
                <div class="text-right">
                    <label class="c-p">Screenshot URL du jet</label>
                </div>
                <div class="col-span-2">
                    <div class="c-addon-container">
                        <span class="c-icon icon-public_black_24dp" style="margin-top: -2px;"></span>
                        <input type="text" class="c-input" @input="updateItem('url', $event.target.value)">
                    </div>
                </div>
            </div>
            <div class="flex justify-center">
                <TheButton @click.native="saveItem()" class="--primary mt-8">Sauvegarder</TheButton>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        getSettings: function () {
            return this.$store.getters['getSettings']
        },
        getActiveItem: function () {
            return this.$store.getters['items/getActiveItem']
        },
        nbTentaMoyen: function () {
            return (this.getActiveItem.typeExo === "po") ? 51 : 100
        },
        beneficeEstime: function() {
            let coutTotalRunes = this.getActiveItem.coutTenta * this.nbTentaMoyen
            return this.getActiveItem.prixDeVente - this.getActiveItem.coutAcquisition - coutTotalRunes
        },
        benefice: function() {
            let coutTotalRunes = this.getActiveItem.coutTenta * this.getActiveItem.attempts
            return this.getActiveItem.prixDeVente - this.getActiveItem.coutAcquisition - coutTotalRunes
        },
        coutRunePassage: function() {
            return this.getActiveItem.coutTenta * this.nbTentaMoyen
        }
    },
    methods: {
        incrementAttemps: function(i) {
            let vm = this;
            this.$store.dispatch('items/updateItem', {
                id: vm.getActiveItem.id,
                data: {"attempts": vm.getActiveItem.attempts + i}
            })
        },
        updateItem: function(fieldName, value, isInt = false) {
            if (isInt) {
                if(value.target.value == '') {
                    value = 0
                } else {
                    value = parseInt(value.target.value)
                }
            }
            let vm = this;
            this.$store.dispatch('items/updateItem', {
                id: vm.getActiveItem.id,
                data: {[fieldName]: value}
            })
        },
        saveItem: function() {
            let vm = this;
            this.$store.dispatch('items/updateItem', {
                id: vm.getActiveItem.id,
                data: {'isSave': true, 'active': false}
            })
        }
    }
}
</script>

<style scoped lang="scss">
.p-cout-tenta-cent {
    position: absolute;
    left: 0;
    bottom: 0;
    transform: translateY(100%);
}
.p-benefice-container {
    max-width: 304px;
}
.p-button {
    width: 50%;
    height: 35px;
    line-height: 33px;
    border: 1px solid $grey20;
    color: $grey40;
    font-size: 18px;
    border-top: transparent;
    transition: color $transition, background-color $transition, border-color $transition;

    &:hover {
        background-color: $grey40;
        border-color: $grey40;
        color: #fff;
    }
    &:focus {
        outline: 0;
    }

    &:first-child {
        border-radius: 0 0 0 2px;
    }
    &:last-child {
        border-radius: 0 0 2px 0;
        border-left: transparent;
    }
}
</style>