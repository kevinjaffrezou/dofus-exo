<template>
<transition name="fade">
    <div class="c-card p-6 mt-20" v-if="getActiveItem">
        <div class="c-card__buttons">
            <button @click="$store.commit('OPEN_MODALARCHIVEITEM', getActiveItem.id)" class="c-card__button"><span class="c-icon icon-archive_black_24dp"></span></button>
            <button @click="$store.commit('OPEN_MODALDELETEITEM', getActiveItem.id)" class="c-card__button --red"><span class="c-icon icon-delete_black_24dp"></span></button>
        </div>
        <div class="flex flex-col md:flex-row">
            <div class="c-badge">
                <img :src="getActiveItem.img" />
            </div>
            <div class="md:ml-9 flex flex-col justify-between flex-grow">
                <div>
                    <h1 class="c-h1">{{getActiveItem.name}}</h1>
                </div>
                <div class="flex justify-between p-benefice-container">
                    <div class="w-5/12" v-if="getActiveItem.typeExo !== 'none'">
                        <p class="c-p relative inline-block">
                            Bénéfice estimé 
                            <span class="c-tooltip  --absolute" data-before="Bénéfice si la tentative d’exo se fait à la 100ième tentatives Permet de calculer la rentabilité spéculative de l’exo"><sup  class="c-icon icon-help_outline_black_24dp"></sup></span>
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
        <div class="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-5 mt-6 items-center">
            <div class="md:text-right">
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
                <div>
                    <label class="c-p">Nb de tentatives :</label>
                    <input type="number" class="c-input --no-border-radius-bottom --lg mt-1" :value="getActiveItem.attempts" @input="updateItem('attempts', $event, true)">
                    <div class="flex">
                        <button class="p-button" @click="incrementAttemps(1)">+1</button>
                        <button class="p-button" @click="incrementAttemps(10)">+10</button>
                    </div>
                </div>
                <TheButton @click.native="saveItem()" class="--primary mt-[23px] w-full">Passé !</TheButton>
            </div>
            <div class="md:text-right">
                <label class="c-p relative">Coût d'acquisition <span class="c-tooltip --absolute" data-before="Prix d’achat de l’item ou coût total des ressources"><sup  class="c-icon icon-help_outline_black_24dp"></sup></span></label>
            </div>
            <div>
                <div class="c-addon-container --right">
                    <input type="number" class="c-input text-right" :value="getActiveItem.coutAcquisition" @input="updateItem('coutAcquisition', $event, true)">
                    <img src="/img/kamas.png" srcset="/img/kamas.png 1x, /img/kamas@2x.png 2x" alt="" class="c-img">
                </div>
            </div>
            <div class="md:text-right">
                <label class="c-p relative">Coût des runes pour 1 tenta <span class="c-tooltip --absolute" data-before="Conseil : Préparez une dizaine de tentatives, notez la valeur estimée des runes, effectuez vos tenta, puis soustrayez l’ancienne valeur avec la nouvelle. Divisez avec le nombre de tenta que vous avez fait pour avoir une bonne moyenne"><sup  class="c-icon icon-help_outline_black_24dp"></sup></span></label>
            </div>
            <div class="relative">
                <div class="c-addon-container --right">
                    <input type="number" class="c-input text-right" :value="getActiveItem.coutTenta" @input="updateItem('coutTenta', $event, true)">
                    <img src="/img/kamas.png" srcset="/img/kamas.png 1x, /img/kamas@2x.png 2x" alt="" class="c-img">
                </div>
                <p class="p-cout-tenta-cent c-p text-xs" v-if="coutRunePassage !== 0"><span class="font-bold">{{$nuxt.$numberWithSpaces(coutRunePassage)}}</span>k pour {{nbTentaMoyen}} tenta</p>
            </div>
            <div class="md:text-right">
                <label class="c-p">Prix de vente</label>
            </div>
            <div>
                <div class="c-addon-container --right">
                    <input type="number" class="c-input text-right" :value="getActiveItem.prixDeVente" @input="updateItem('prixDeVente', $event, true)">
                    <img src="/img/kamas.png" srcset="/img/kamas.png 1x, /img/kamas@2x.png 2x" alt="" class="c-img">
                </div>
            </div>
        </div>
        <hr class="mt-10 mb-8">
        <div class="grid grid-cols-3 gap-x-10 items-center">
            <div class="text-right">
                <label class="c-p relative">URL : Screenshot du jet <span class="c-tooltip --absolute" data-before="Hébergez cette image sur imgur ou gyazo par exemple"><sup  class="c-icon icon-help_outline_black_24dp"></sup></span></label>
            </div>
            <div class="col-span-2">
                <div class="c-addon-container">
                    <span class="c-icon icon-public_black_24dp" style="margin-top: -2px;"></span>
                    <input type="text" class="c-input" @input="updateItem('url', $event.target.value)">
                </div>
            </div>
        </div>
    </div>
</transition>
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
        savedItemsLength: function() {
            return this.$store.getters['items/getSavedItemsLength']
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
                data: {'isSave': true, 'active': false, 'exoPasse': true}
            })

            // Notifie l'utilisateur de sauvegarder ses données si le nombre d'item
            // sauvegardé est égale à 1 ou un multiple de 5
            if (this.savedItemsLength === 1 || this.savedItemsLength %  5 === 0) {
                this.$toast.show({
                    type: 'info',
                    title: 'Sauvegardez votre base de données',
                    timeout: 60,
                    message: "Les données sont stockées sur votre appareil. Si vous vider votre cache navigateur, la base de données le sera également. Pour éviter de tout perdre, pensez à télécharger la base de données en format JSON (lien dans le footer)",
                })
            }
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
    height: 36px;
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