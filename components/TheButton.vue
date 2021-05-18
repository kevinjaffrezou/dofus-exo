<template>
    <button class="button" :class="(icon) ? '--icon-left' : ''">
        <span v-if="icon" class="c-icon" :class="icon"></span>
        <slot />
    </button>
</template>

<script>
export default {
    props: ['icon']
}
</script>

<style lang="scss" scoped>
.button {
    text-align: center;
    font-weight: 600;
    font-size: 20px;
    border-radius: 2px;
    height: 45px;
    padding: 0 24px;
    transition: color $transition, background-color $transition;

    &:hover,
    &:focus {
        outline: 0;
    }

    &.--icon-left {
        position: relative;
        padding-left: 42px;
        .c-icon {
            position: absolute;
            left: 8px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 24px;
        }
    }

    &.--primary {
        background: #4188F3;
        color: #fff;

        &.--stroked {
            border: solid 2px #4188F3;
            background: transparent;
            color: #4188F3;

            &:hover,
            &:focus {
                background: #4188F3;
                color: #fff;
            }
        }
    }
}
</style>