const app = Vue.createApp({
    data() {
        return {
            cart: [],
            premium: true,
        };
    },
    methods: {
        addToCart(id) {
            this.cart.push(id);
        },
        removeFromCart(id) {
            const indexToDelete = this.cart.indexOf(id);
            if (indexToDelete !== -1) {
                this.cart.splice(indexToDelete, 1);
            }
        },
    },
});
