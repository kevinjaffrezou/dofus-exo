<template>
    <header class="header">
        <div class="container-fluid">
            <div class="grid grid-cols-3 gap-2.5 content-center">
                <div></div>
                <div class="flex justify-center items-center">
                    <NuxtLink to="/" class="c-link">Comment ça marche ?</NuxtLink>
                    <NuxtLink to="/exos" class="c-link">Mes exos</NuxtLink>
                </div>
                <div class="flex justify-end items-center">
                    <button @click="openStatistics" class="c-link">Statistiques</button>
                    <TheButton @click.native="openNewItem" icon="icon-add_black_24dp" class="--primary --stroked">Ajouter un exo</TheButton>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    methods: {
        openNewItem: function() {
            if(this.$route.path !== '/exos') this.$router.push('/exos')
            this.$store.commit('OPEN_NEWITEM')
        },
        openStatistics: function() {
            if(this.$route.path !== '/exos') this.$router.push('/exos')
            this.$store.commit('OPEN_STATISTICS')
        }
    }
}
</script>

<style lang="scss" scoped>
$header-height: 70px;

.header {
    height: $header-height;
    background-color: #fff;
    border-bottom: $border;
}

.grid {
    // -1px equals to border size
    height: calc(#{$header-height} - 1px);
}

* + .c-link,
* + .button {
    margin-left: 30px;
}
</style>