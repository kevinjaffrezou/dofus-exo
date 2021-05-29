<template>
    <div>
        <div class="modal">
            <slot></slot>
        </div>
        <div class="modal-backdrop"></div>
    </div>
</template>

<style lang="scss">
.modal {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: fixed;
    width: 310px;
    background-color: white;
    box-shadow: $shadow-large;
    z-index: 1001;
}

.modal-backdrop {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: $blue5;
    z-index: 1000;
}
</style>