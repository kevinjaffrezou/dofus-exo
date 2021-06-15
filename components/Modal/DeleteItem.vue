<template>
    <div>
        <div class="c-modal p-6">
            <div class="c-card__buttons">
                <button @click="hideModal()" class="c-card__button"><span class="c-icon icon-close_black_24dp"></span></button>
            </div>

            <p class="c-h2 text-center">
                Supprimer
            </p>
            <p class="mt-2 text-center">
                Êtes vous sûr de vouloir supprimer définitivement cet item ?
            </p>
            <div class="flex justify-between mt-8">
                <TheButton @click.native="hideModal()" class="--stroked">Annuler</TheButton>
                <TheButton @click.native="deleteItem()" class="--red">Supprimer</TheButton>
            </div>
        </div>
        <div class="c-modal-backdrop" @click="hideModal()"></div>
    </div>
</template>

<script>
export default {
    computed: {
        getModalDeleteItem: function () {
            return this.$store.getters['getModalDeleteItem']
        }
    },
    methods: {
        deleteItem: function() {
            this.$store.dispatch('items/deleteItem', this.getModalDeleteItem.itemId)
            this.hideModal()
        },
        hideModal: function() {
            this.$store.commit('CLOSE_MODALDELETEITEM')
        }
    }
}
</script>