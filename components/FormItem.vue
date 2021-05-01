<template>
    <div class="c-card p-6 mt-20" v-if="getActiveItem">
        <div class="flex">
            <div class="c-badge" @click="test()">
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
            <div>
                radio
            </div>
            <div class="row-span-4">
                <input type="number" class="c-input --no-border-radius-bottom --lg" v-model="getActiveItem.attempts" @input="refreshItemData()">
                <div class="flex">
                    <button class="button" @click="incrementAttemps(1)">+1</button>
                    <button class="button" @click="incrementAttemps(10)">+10</button>
                </div>
            </div>
            <div class="text-right">
                <label class="c-p">Coût d'acquisition</label>
            </div>
            <div>
                <input type="number" class="c-input text-right" v-model="getActiveItem.coutAcquisition">
            </div>
            <div class="text-right">
                <label class="c-p">Coût des runes pour 1 tenta</label>
            </div>
            <div>
                <input type="number" class="c-input text-right" v-model="getActiveItem.coutTenta">
            </div>
            <div class="text-right">
                <label class="c-p">Prix de vente</label>
            </div>
            <div>
                <input type="number" class="c-input text-right" v-model="getActiveItem.prixDeVente">
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
        refreshItemData: function() {
            this.$store.commit('items/refreshItemData', this.getActiveItem)
        },
        incrementAttemps: function(i) {
            this.getActiveItem.attempts = parseInt(this.getActiveItem.attempts) + i
            this.refreshItemData()
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

    &:first-child {
        border-radius: 0 0 0 2px;
    }
    &:last-child {
        border-radius: 0 0 2px 0;
        border-left: transparent;
    }
}
</style>