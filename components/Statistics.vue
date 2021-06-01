<template>
    <div class="container-900 mt-12 mb-20">
        <div class="c-card u-shadow-default text-center p-6">
            <div class="c-card__buttons">
                <button @click="close" class="c-card__button"><span class="c-icon icon-close_black_24dp"></span></button>
            </div>
            <h2 class="c-h2">Statistiques</h2>
            <div class="grid grid-cols-3 md:gap-x-24 gap-y-2 mt-4 items-center">
                <div>
                    <p class="text-lg u-grey20">Bénéfice total</p>
                </div>
                <div>
                    <p class="text-lg u-grey20">Exos réussis</p>
                </div>
                <div>
                    <p class="text-lg u-grey20">Moyenne de tentatives par exo PA/PM</p>
                </div>
                <div>
                    <p class="text-xl u-green10 font-semibold">{{$nuxt.$numberWithSpaces(beneficeTotal)}}</p>
                </div>
                <div>
                    <p class="text-4xl font-semibold">{{$nuxt.$numberWithSpaces(exoTotal)}}</p>
                </div>
                <div>
                    <p class="text-4xl font-semibold">{{$nuxt.$numberWithSpaces(averageExo)}}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import _ from "lodash"

export default {
    computed: {
        items: function () {
            let items = this.$store.getters['items/getItems']
            return items.filter(item => item.isSave);
        },
        beneficeTotal: function () {
            let benefice = 0
            this.items.forEach(item => {
                benefice += item.prixDeVente - item.coutAcquisition - item.coutTenta * item.attempts
            })
            return benefice
        },
        exoTotal: function () {
            let exo = 0
            this.items.forEach(item => {
                if(item.exoPasse) exo++
            })
            return exo
        },
        averageExo: function () {
            let exo = 0
            let nbTenta = 0
            this.items.forEach(item => {
                if(item.exoPasse) {
                    exo++
                    nbTenta += item.attempts
                }
            })
            return Math.round(nbTenta / exo)
        }
    },
    methods: {
        close: function() {
            this.$store.commit('CLOSE_STATISTICS')
        }
    }
}
</script>
