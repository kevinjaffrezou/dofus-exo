<template>
  <div>
    <transition name="fade">
      <div v-if="loading" class="loading-page">
        <div class="c-h1 loading">Chargement des données test...</div>
      </div>
    </transition>
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
  data: () => {
    return {
      loading: true
    }
  },
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
    this.$nuxt.$DB.inventory.clear()
    this.$nuxt.$DB.inventory.bulkAdd(this.demoItems.data.data[0].rows)
    const items = await this.$nuxt.$DB.inventory.toArray()
    items.reverse()
    this.$store.commit('items/ADD_ITEMS', items)

    this.loading = false
  },
  fetchOnServer: false,
  async asyncData({ $content }) {
    const equipements = await $content('/').fetch()
    const demoItems = await $content('db/dofus-exo-db').fetch()
    return { equipements, demoItems }
  },
  mounted() {
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

<style lang="scss">
#toasts {
  margin-top: 40px;
}

.loading-page {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  background-color: hsla(235, 11%, 23%, .8);
  z-index: map-get($zindex, loading);
  display: flex;
  justify-content: center;
  align-items: center;

  .loading {
    color: white;
  }
}
</style>