<template>
  <div class="container-fluid mt-20">
    <div class="grid grid-cols-12 gap-x-5">
      <div>
        <Inventory></Inventory>
      </div>
      <div class="col-span-10">
        <div class="container-730">
          <NewItem :dofusEquiments="equipements"></NewItem>
          <FormItem></FormItem>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    async asyncData({ $content, params }) {
      const equipements = await $content('/').fetch()
      return { equipements }
    }
}
</script>
