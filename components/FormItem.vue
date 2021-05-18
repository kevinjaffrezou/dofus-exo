<template>
    <div class="c-card p-6" v-if="getActiveItem">
        <div class="flex">
            <div class="c-badge">
                <img :src="getActiveItem.img" />
            </div>
            <div class="ml-9">
                <h1 class="c-h1">{{getActiveItem.name}}</h1>
            </div>
        </div>
        <div class="grid grid-cols-3 gap-x-10 gap-y-5 mt-6 items-center">
            <div class="text-right">
                <label class="c-p">Type d’exo</label>
            </div>
            <div class="flex justify-between">
                <input class="sr-only" type="radio" id="radio-pa" value="pa" v-model="getActiveItem.typeExo" @change="updateItem('typeExo', 'pa')">
                <label for="radio-pa" class="c-input-label" :class="{ 'is-active': getActiveItem.typeExo === 'pa' }"><img src="/img/pa.png" alt=""></label>
                <input class="sr-only" type="radio" id="radio-pm" value="pm" v-model="getActiveItem.typeExo" @change="updateItem('typeExo', 'pm')">
                <label for="radio-pm" class="c-input-label"  :class="{ 'is-active': getActiveItem.typeExo === 'pm' }"><img src="/img/pm.png" alt=""></label>
                <input class="sr-only" type="radio" id="radio-po" value="po" v-model="getActiveItem.typeExo" @change="updateItem('typeExo', 'po')">
                <label for="radio-po" class="c-input-label" :class="{ 'is-active': getActiveItem.typeExo === 'po' }"><img src="/img/po.png" alt=""></label>
                <input class="sr-only" type="radio" id="radio-none" value="none" v-model="getActiveItem.typeExo" @change="updateItem('typeExo', 'none')">
                <label for="radio-none" class="c-input-label" :class="{ 'is-active': getActiveItem.typeExo === 'none' }"><span class="c-icon icon-highlight_off_black_24dp"></span></label>
            </div>
            <div class="row-span-4">
                <input type="number" class="c-input --no-border-radius-bottom --lg" :value="getActiveItem.attempts" @input="updateItem('attempts', $event, true)">
                <div class="flex">
                    <button class="button" @click="incrementAttemps(1)">+1</button>
                    <button class="button" @click="incrementAttemps(10)">+10</button>
                </div>
            </div>
            <div class="text-right">
                <label class="c-p">Coût d'acquisition</label>
            </div>
            <div>
                <input type="number" class="c-input text-right" :value="getActiveItem.coutAcquisition" @input="updateItem('coutAcquisition', $event, true)">
            </div>
            <div class="text-right">
                <label class="c-p">Coût des runes pour 1 tenta</label>
            </div>
            <div>
                <input type="number" class="c-input text-right" :value="getActiveItem.coutTenta" @input="updateItem('coutTenta', $event, true)">
            </div>
            <div class="text-right">
                <label class="c-p">Prix de vente</label>
            </div>
            <div>
                <input type="number" class="c-input text-right" :value="getActiveItem.prixDeVente" @input="updateItem('prixDeVente', $event, true)">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        getActiveItem: function () {
            return this.$store.getters['items/getActiveItem']
        }
    },
    methods: {
        incrementAttemps: function(i) {
            let vm = this;
            this.$store.commit('items/UPDATE_ITEM', {
                itemId: vm.getActiveItem.id,
                data: {"attempts": vm.getActiveItem.attempts + i}
            })
        },
        updateItem: function(fieldName, value, isInt = false) {
            if (isInt) value = parseInt(value.target.value)
            let vm = this;
            this.$store.commit('items/UPDATE_ITEM', {
                itemId: vm.getActiveItem.id,
                data: {[fieldName]: value}
            })
        }
    }
}
</script>

<style scoped lang="scss">
.button {
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