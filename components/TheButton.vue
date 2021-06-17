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

<style lang="scss">
.button {
    text-align: center;
    font-weight: 600;
    font-size: 20px;
    border-radius: 2px;
    height: 45px;
    padding: 0 24px;
    background: $grey20;
    color: #fff;
    transition: color $transition, background-color $transition, opacity $transition;
    -webkit-appearance: none;

    &:hover,
    &:focus {
        outline: 0;
    }

    &.--small {
        height: 35px;
        font-weight: normal;
    }

    &.--grey30 {
        background: $grey30;

        &:hover,
        &:focus {
            background: $grey35;
        }

        &:disabled {
            opacity: .5;
            cursor: default;

            &:hover,
            &:focus {
                background: $grey30;
            }
        }
    }

    &.--stroked {
        border: solid 2px $grey20;
        background: transparent;
        color: $grey30;

        &:hover,
        &:focus {
            background: $grey20;
            color: #fff;
        }
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
        background: $blue40;
        color: #fff;

        &:hover,
        &:focus {
            background: $blue45;
        }

        &.--stroked {
            border: solid 2px $blue40;
            background: transparent;
            color: $blue40;

            &:hover,
            &:focus {
                background: $blue40;
                color: #fff;
            }
        }
    }

    &.--red {
        background: $red20;
        color: #fff;

        &:hover,
        &:focus {
            background: $red25;
        }
    }
}
</style>