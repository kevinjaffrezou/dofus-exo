<template>
    <div class="c-card p-6 mt-20" v-if="getActiveItem">
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
            <div>
                radio
            </div>
            <div class="row-span-4">
                exo
            </div>
            <div class="text-right">
                <label class="c-p">Coût d'acquisition</label>
            </div>
            <div>
                <input type="number" class="c-input" v-model="getActiveItem.coutAcquisition">
            </div>
            <div class="text-right">
                <label class="c-p">Coût des runes pour 1 tenta</label>
            </div>
            <div>
                <input type="number" class="c-input" v-model="getActiveItem.coutTenta">
            </div>
            <div class="text-right">
                <label class="c-p">Prix de vente</label>
            </div>
            <div>
                <input type="number" class="c-input" v-model="getActiveItem.prixDeVente">
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
    }
}
</script>