<template>
    <div v-if="items.length !== 0">
        <h2 class="c-h2">Inventaire</h2>
        <div class="relative">
            <div class="inventory-container">
                <div class="c-card inventory u-shadow-default p-2 mt-2">
                    <button v-for="(item, index) in items" :key="index" class="inventory__item p-2" :class="item.active ? 'is-active' : ''" @click="updateActiveItem(item.id)">
                        <div class="flex justify-around items-center">
                            <img class="item__img" :src="item.img" alt="">
                            <div class="type-exo">
                                <span v-if="item.typeExo === 'none'" class="c-icon icon-highlight_off_black_24dp"></span>
                                <img v-else :src="'/img/'+item.typeExo+'.png'" alt="">
                            </div>
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
    </div>
</template>

<script>
export default {
    computed: {
        items: function () {
            let items = this.$store.getters['items/getItems']
            let itemsFiltered = []
            items.forEach(item => {
                if(!item.isSave) itemsFiltered.push(item)
            });
            return itemsFiltered
        }
    },
    methods: {
        updateActiveItem: function (id) {
            this.$store.dispatch('items/updateActiveItem', id)
        }
    }
}
</script>

<style lang="scss">
.inventory-container {
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

    &:hover {
        &::after {
            opacity: 0;
        }
    }
}

.inventory {
    height: 342px;
    overflow-y: scroll;

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
}

.item {
    &__img {
        height: 40px;
    }
}

.type-exo {
    position: relative;
    height: 35px;
    width: 35px;

    img,
    .c-icon {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    img {
        width: 32px;
    }

    .c-icon {
        font-size: 24px;
    }
}
</style>