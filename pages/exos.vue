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
              <NewItem v-if="getSettings.openNewItem"></NewItem>
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
    fetchOnServer: false
}
</script>
