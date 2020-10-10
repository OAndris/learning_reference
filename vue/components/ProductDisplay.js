app.component('product-display', {
    props: {
        premium: {
            type: Boolean,
            required: true,
        },
    },
    template:
        /*html*/
        `
        <div class="product-display">
            <div class="product-container">
                <div class="product-image">
                    <img :src="image" alt="" :class="{ 'out-of-stock-img': quantity === 0 }">
                </div>
                <div class="product-info">
                    <h1>{{ title }}</h1>

                    <p v-if="quantity > 10">In Stock</p>
                    <p v-else-if="quantity <= 10 && quantity > 0">Almost sold out</p>
                    <p v-else>Out of Stock</p>
                    
                    <p>Shipping: {{ shipping }}</p>
                    <ul>
                        <li v-for="detail in details">{{ detail }}</li>
                    </ul>
                    <div
                        v-for="(variant, index) in variants"
                        :key="variant.id"
                        @mouseover="updateVariant(index)"
                        class="color-circle"
                        :style="{ backgroundColor: variant.color }"
                    >
                    </div>
                    <button
                        class="button"
                        :class="{ disabledButton: quantity === 0 }"
                        :disabled="quantity === 0"
                        @click="addToCart"
                    >
                        Add to Cart
                    </button>
                    <button
                        class="button"
                        :class="{ disabledButton: quantity === 0 }"
                        :disabled="quantity === 0"
                        @click="removeFromCart"
                    >
                        Remove from Cart
                    </button>
                    <p v-if="onSale">{{ onSale }}</p>
                </div>
            </div>
        </div>
        `,
    data() {
        return {
            product: 'Socks',
            brand: 'Vue Mastery',
            selectedVariant: 0,
            details: ['50% cotton', '30% wool', '20% polyester'],
            variants: [
                {
                    id: 2234,
                    color: 'green',
                    image: './assets/images/socks_green.jpg',
                    quantity: 50,
                    onSale: true,
                },
                {
                    id: 2235,
                    color: 'blue',
                    image: './assets/images/socks_blue.jpg',
                    quantity: 1,
                    onSale: false,
                },
            ],
        };
    },
    computed: {
        title() {
            return `${this.brand} ${this.product}`;
        },
        image() {
            return this.variants[this.selectedVariant].image;
        },
        quantity() {
            return this.variants[this.selectedVariant].quantity;
        },
        onSale() {
            return this.variants[this.selectedVariant].onSale ? `${this.title} is on sale!` : '';
        },
        shipping() {
            if (this.premium) {
                return 'Free';
            }
            return '$2.99';
        },
    },
    methods: {
        updateVariant(index) {
            this.selectedVariant = index;
        },
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].id);
        },
        removeFromCart() {
            this.$emit('remove-from-cart', this.variants[this.selectedVariant].id);
        },
    },
});
