export default (context, inject) => {
    const numberWithSpaces = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    // Inject $hello(msg) in Vue, context and store.
    inject('numberWithSpaces', numberWithSpaces)
    // For Nuxt <= 2.12, also add 👇
    context.$numberWithSpaces = numberWithSpaces
}