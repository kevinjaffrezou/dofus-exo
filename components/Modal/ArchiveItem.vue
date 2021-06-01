<template>
    <div>
        <div class="c-modal p-6">
            <div class="c-card__buttons">
                <button @click="hideModal()" class="c-card__button"><span class="c-icon icon-close_black_24dp"></span></button>
            </div>

            <p class="c-h2 text-center">
                Archiver
            </p>
            <p class="text-center mt-2">
                L'item s'affichera en <span class="u-red20">rouge</span> dans le tableau et la tentative d'exo pourra être reprise en cliquant sur l'icone "rafraîchir"
            </p>
            <div class="flex justify-between mt-8">
                <TheButton @click.native="hideModal()" class="--stroked">Annuler</TheButton>
                <TheButton @click.native="archiveItem()" class="--primary">Archiver</TheButton>
            </div>
        </div>
        <div class="c-modal-backdrop" @click="hideModal()"></div>
    </div>
</template>

<script>
export default {
    computed: {
        getModalArchiveItem: function () {
            return this.$store.getters['getModalArchiveItem']
        }
    },
    methods: {
        archiveItem: function() {
            let vm = this;
            this.$store.dispatch('items/updateItem', {
                id: vm.getModalArchiveItem.itemId,
                data: {'isSave': true, 'active': false, 'exoPasse': false}
            })
            this.hideModal()
        },
        hideModal: function() {
            this.$store.commit('CLOSE_MODALARCHIVEITEM')
        }
    }
}
</script>