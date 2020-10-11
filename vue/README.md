# Vue

Vue is a lightweight, progressive (incrementally adoptable) JavaScript framework for building user interfaces.

The core library is focused on the view layer only, but Vue is also capable of powering sophisticated Single-Page Applications when used in combination with modern tooling and supporting libraries.

## Setup:

1. Two options:

    1. Within index.html, import Vue (either via CDN or the downloaded file). Example:

    ```html
    <!-- index.html -->
    <script src="https://unpkg.com/vue@3.0.0-beta.12/dist/vue.global.js"></script>
    ```

    2. Alternatively, install the Vue CLI tool with `npm install -g @vue/cli`. Then use either the CLI tool (`vue create my-app` and then `npm run serve`) or the UI that comes with it (`vue ui`) and includes analytics.

2. Create a JavaScript file that instantiates a Vue application and import it inside index.html. Example:

    ```js
    // index.js
    const app = Vue.createApp({
        data() {
            return {};
        },
        computed: {},
        methods: {},
    });
    ```

3. Mount the app to the desired HTML element. Example:

    ```html
    <!-- index.html -->
    <script>
        app.mount('#app');
    </script>
    ```

4. The Vue app is now mounted to the selected HTML element, and ready to be used.

5. Optionally, components can also be created. Example:

    ```js
    // ./components/MyComponent.js
    app.component('my-component', {
        props: {},
        template:  // NOTE: the 'es6-string-html' VS Code extension is recommended
            /*html*/
            `<div>New Component</div>`,
        data() {
            return {};
        },
        computed: {},
        methods: {},
    }
    ```

    ```html
    <!-- index.html -->
    <my-component></my-component>
    <script src="./components/MyComponent.js"></script>
    ```

## Directives:

Directives are special HTML attributes provided by Vue. They are prefixed with "`v-`", and they can be used to describe simple logic within HTML and apply reactive behaviour to the rendered DOM (e.g. keep an element's attribute up-to-date with a specific property of our app's instance).

-   "`v-bind:`", or just "`:`" creates a **one-way binding** from the data to the template. It enables using data defined within JavaScript to be used inside HTML (also for conditionally adding classes and/or styles).
-   "`v-model`" creates a **two-way binding** between the data and the template. It causes the data defined within JavaScript to be used inside HTML, and also update when the HTML is updated (e.g. to be used with form inputs).
-   "`v-on`", or just "`@`" adds an event listener to an element
-   Conditionals and loops are possible within HTML:
    -   "`v-if`"
    -   "`v-else-if`"
    -   "`v-else`"
    -   "`v-for`"
-   JavaScript expressions can also be used within HTML, using the "`{{ }}`" mustache syntax.
-   Modifiers can also be used. Example:

    -   "`v-model.number`" typecasts the value as a number:
        ```html
        <select id="rating" v-model.number="rating"></select>
        ```
    -   "`@submit.prevent`" prevents the browsers' default behavior of refreshing the page upon submit:

        ```html
        <form class="review-form" @submit.prevent="onSubmit">
            <input class="button" type="submit" value="Submit" />
        </form>
        ```

-   Components can receive parameters from their parents as "props". They can also emit events (optionally with a payload) to which the parent can listen. Example:

    ```html
    <!-- index.html
        - passing down "premium" defined in index.js to child component as props, using one-way binding
        - listening to the "add-to-cart" and "remove-from-cart" events defined in (and emitted from) child component
    -->
    <product-display
        :premium="premium"
        @add-to-cart="addToCart"
        @remove-from-cart="removeFromCart"
    ></product-display>
    ```

    ```js
    // ./components/ProductDisplay.js
    app.component('product-display', {
        props: {
            premium: {
                type: Boolean,
                required: true,
            },
        },
        template: `<div>...</div>`,
        methods: {
            addToCart() {
                this.$emit('add-to-cart', this.variants[this.selectedVariant].id);
            },
            removeFromCart() {
                this.$emit('remove-from-cart', this.variants[this.selectedVariant].id);
            },
        },
    });

    // index.js
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
    ```

-   Some examples:

    ```html
    <p v-if="quantity > 10">In Stock</p>
    <p v-else-if="quantity <= 10 && quantity > 0">Almost sold out</p>
    <p v-else>Out of Stock</p>
    <p>Shipping: {{ shipping }}</p>
    <ul>
        <li v-for="detail in details">{{ detail }}</li>
    </ul>
    <p v-if="onSale">{{ onSale }}</p>
    <div
        v-for="(variant, index) in variants"
        :key="variant.id"
        @mouseover="updateVariant(index)"
        class="color-circle"
        :style="{ backgroundColor: variant.color }"
    ></div>
    <button
        class="button"
        :class="{ disabledButton: quantity === 0 }"
        :disabled="quantity === 0"
        @click="addToCart"
    >
        Add to Cart
    </button>
    ```

## Sources and further info:

-   https://v3.vuejs.org/guide/introduction
-   https://www.vuemastery.com/courses/intro-to-vue-3
-   [Angular vs React vs Vue [2020 Update]](https://www.youtube.com/watch?v=lYWYWyX04JI) by Academind on Youtube
-   [Vue JS Crash Course](https://www.youtube.com/watch?v=Wy9q22isx3U) by Traversy Media on Youtube
