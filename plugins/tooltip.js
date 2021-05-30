import Vue from 'vue'

Vue.directive('tooltip', {
    bind: function (el, binding, vnode) {
        el.setAttribute('data-before', binding.value)
        el.classList.add('c-tooltip')
    }
})