<template>
    <div>
        <h2 class="c-h2">Inventaire</h2>
        <div class="relative">
            <div class="c-card inventory u-shadow-default p-2 mt-2">
                <button v-for="(item, index) in getInventory" :key="index" class="inventory__item p-2" :class="item.active ? 'is-active' : ''" @click="updateActiveItem(item)">
                    <div class="flex justify-around items-center">
                        <img class="item__img" :src="item.img" alt="">
                        <img class="type-exo" src="/img/pa.png" alt="">
                    </div>
                    
                    <p class="c-p text-xs mt-1 truncate">
                        {{item.name}}
                    </p>
                    
                    <p class="c-p text-lg font-bold text-center mt-1 leading-tight">
                        {{item.attempts}}
                    </p>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        getInventory: function () {
            return this.$store.getters['items/getInventory']
        }
    },
    methods: {
        updateActiveItem: function (item) {
            this.$store.commit('items/updateActiveItem', item)
        }
    }
}
</script>

<style lang="scss">
.inventory {
    height: 342px;
    overflow-y: scroll;

    &:hover {
        &::after {
            opacity: 0;
        }
    }

    &__item {
        background-color: $blue10;
        // Reset button tag
        width: 100%;
        text-align: left;

        &:hover,
        &:focus {
            outline: 0;
        }

        &.is-active {
            background-color: $blue20;
        }
    }

    &__item + &__item {
        margin-top: 14px;
    }

    &::-webkit-scrollbar {
        display: none;
    }

    &::after {
        display: block;
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 50px;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 100%);
        pointer-events: none;
        transition: opacity $transition;
    }
}

.item {
    &__img {
        height: 40px;
    }
}

.type-exo {
    height: 32px;
}
</style>