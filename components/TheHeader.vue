<template>
    <header class="header">
        <div class="container-fluid">
            <div class="grid grid-cols-3 gap-2.5 content-center">
                <div></div>
                <div class="flex justify-center items-center">
                    <NuxtLink to="/" class="c-link">Mes exo</NuxtLink>
                    <NuxtLink to="/about" class="c-link">À propos</NuxtLink>
                </div>
                <div class="flex justify-end items-center">
                    <a href="javascript:void(0);" class="c-link">Statistiques</a>
                    <TheButton icon="icon-add_black_24dp" class="--primary --stroked">Ajouter un exo</TheButton>
                </div>
            </div>
        </div>
    </header>
</template>

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