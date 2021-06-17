<template>
  <div>
    <transition name="fadeup">
      <Statistics v-if="getSettings.openStatistics"></Statistics>
    </transition>
    <div class="container-fluid">
      <div class="md:grid md:grid-cols-12 gap-x-5">
        <div>
          <Inventory></Inventory>
        </div>
        <div class="col-span-10">
          <div class="container-730">
            <transition name="fadeup">
              <NewItem :dofusEquiments="equipements" v-if="getSettings.openNewItem"></NewItem>
            </transition>
            <FormItem></FormItem>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid mt-24">
      <Table/>
    </div>
    <transition name="modal">
      <ModalDeleteItem v-if="getModalDeleteItem.show"></ModalDeleteItem>
    </transition>
    <transition name="modal">
      <ModalArchiveItem v-if="getModalArchiveItem.show"></ModalArchiveItem>
    </transition>
  </div>
</template>

<script>
export default {
    computed: {
        getSettings: function () {
            return this.$store.getters['getSettings']
        },
        getModalDeleteItem: function () {
            return this.$store.getters['getModalDeleteItem']
        },
        getModalArchiveItem: function () {
            return this.$store.getters['getModalArchiveItem']
        }
    },
    destroyed() {
      this.$store.commit('CLOSE_NEWITEM')
      this.$store.commit('CLOSE_STATISTICS')
    },
    async fetch() {
      const items = await this.$nuxt.$DB.inventory.toArray();
      items.reverse()
      this.$store.commit('items/ADD_ITEMS', items)
    },
    fetchOnServer: false,
    async asyncData({ $content }) {
      const equipements = await $content('/').fetch()
      return { equipements }
    },
    mounted() {
      const vm = this;
      (async function() {
        const demoItems = await vm.$content('/dofus-exo-db').fetch()
            try {
                vm.$nuxt.$DB.inventory.clear()
                vm.$nuxt.$DB.inventory.bulkAdd(demoItems.data.data[0].rows)

                let items = await vm.$nuxt.$DB.inventory.toArray();
                items.reverse()
                vm.$store.commit('items/ADD_ITEMS', items)
            }
            catch {
                console.log("err");
                vm.$toast.show({
                    type: 'danger',
                    title: 'Erreur',
                    timeout: 20,
                    message: "La base de données n'a pas pu être importé",
                })

            }
        })();

        this.$toast.show({
          type: 'info',
          title: 'Version de démonstration',
          message: 'Vous êtes sur la démo de Dofus exo, rechargez la page pour reset les données',
          primary: { label: "Se rendre sur l'application", action: () => window.location.href = "https://dofus-exo.fr"},
          timeout: false,
        })
    }
}
</script>

<style>
#toasts {
  margin-top: 40px;
}
</style>