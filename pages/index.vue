<template>
  <div>
    <div class="container-fluid mt-20">
      <div class="grid grid-cols-12 gap-x-5">
        <div>
          <Inventory></Inventory>
        </div>
        <div class="col-span-10">
          <div class="container-730">
            <NewItem :dofusEquiments="equipements" v-if="getSettings.openNewItem"></NewItem>
            <FormItem></FormItem>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid mt-24">
      <Table/>
    </div>
  </div>
</template>

<script>
export default {
    computed: {
        getSettings: function () {
            return this.$store.getters['getSettings']
        }
    },
    destroyed() {
      this.$store.commit('CLOSE_NEWITEM')
    },
    async fetch() {
      const items = await this.$nuxt.$DB.inventory.toArray()
      this.$store.commit('items/ADD_ITEMS', items)
    },
    fetchOnServer: false,
    async asyncData({ $content }) {
      const equipements = await $content('/').fetch()
      return { equipements }
    }
}
</script>
