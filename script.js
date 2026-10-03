const products = [

    {
        id: 1,
        name: "Cloud Comfort Pet Bed",
        category: "dog",
        type: "Beds",
        price: 39.99,
        tag: "BEST SELLER",
        image: "https://images.unsplash.com/photo-1581888227599-779811939961?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 2,
        name: "Cozy Knit Pet Sweater",
        category: "dog",
        type: "Accessories",
        price: 24.99,
        tag: "NEW",
        image: "https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 3,
        name: "Interactive Feather Wand",
        category: "cat",
        type: "Toys",
        price: 14.99,
        tag: "CAT FAVORITE",
        image: "https://images.unsplash.com/photo-1545249390-6bdfa286032f?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 4,
        name: "Natural Rope Chew Toy",
        category: "toy",
        type: "Toys",
        price: 18.99,
        tag: "SALE",
        image: "https://images.unsplash.com/photo-1601758064224-7d7f4c4a5e68?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 5,
        name: "Everyday Walk Collar",
        category: "accessories",
        type: "Accessories",
        price: 16.99,
        tag: "",
        image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 6,
        name: "Ceramic Pet Bowl",
        category: "accessories",
        type: "Feeding",
        price: 21.99,
        tag: "NEW",
        image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 7,
        name: "Soft Plush Mouse Toy",
        category: "cat",
        type: "Toys",
        price: 11.99,
        tag: "",
        image: "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 8,
        name: "Travel Pet Carrier",
        category: "accessories",
        type: "Travel",
        price: 54.99,
        tag: "BEST SELLER",
        image: "https://images.unsplash.com/photo-1601758003122-53c40e686a19?auto=format&fit=crop&w=700&q=80"
    }

];


let cart =
    JSON.parse(localStorage.getItem("pawhavenCart")) || [];

let wishlist =
    JSON.parse(localStorage.getItem("pawhavenWishlist")) || [];


const productsContainer =
    document.getElementById("products");

const cartDrawer =
    document.getElementById("cartDrawer");

const overlay =
    document.getElementById("overlay");

const cartItems =
    document.getElementById("cartItems");

const subtotal =
    document.getElementById("subtotal");

const cartCount =
    document.getElementById("cartCount");

const drawerCount =
    document.getElementById("drawerCount");

const wishlistCount =
    document.getElementById("wishlistCount");

const toast =
    document.getElementById("toast");


/* SAVE */

function saveData() {

    localStorage.setItem(
        "pawhavenCart",
        JSON.stringify(cart)
    );

    localStorage.setItem(
        "pawhavenWishlist",
        JSON.stringify(wishlist)
    );

}


/* MONEY */

function money(value) {

    return "$" + value.toFixed(2);

}


/* PRODUCTS */

function displayProducts(filter = "all") {

    let list = products;

    if (filter !== "all") {

        list = products.filter(
            product => product.category === filter
        );

    }


    productsContainer.innerHTML = list.map(product => {

        const liked =
            wishlist.includes(product.id);

        return `

        <article class="product">

            <div class="product-image">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    loading="lazy"
                >

                ${
                    product.tag
                    ?
                    `<span class="product-tag">
                        ${product.tag}
                    </span>`
                    :
                    ""
                }


                <button
                    class="wishlist ${liked ? "active" : ""}"
                    onclick="toggleWishlist(${product.id})"
                >
                    ${liked ? "♥" : "♡"}
                </button>

            </div>


            <div class="product-info">

                <h3>
                    ${product.name}
                </h3>

                <p>
                    ${product.type}
                </p>

                <div class="price">
                    ${money(product.price)}
                </div>

                <button
                    class="add-cart"
                    onclick="addToCart(${product.id})"
                >
                    +
                </button>

            </div>

        </article>

        `;

    }).join("");

}


/* ADD CART */

function addToCart(id) {

    const existing =
        cart.find(item => item.id === id);


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({
            id: id,
            quantity: 1
        });

    }


    saveData();

    updateCart();

    showToast(
        "Added to your bag ♡"
    );

    openCart();

}


/* UPDATE CART */

function updateCart() {

    const totalItems =
        cart.reduce(
            (total,item) =>
            total + item.quantity,
            0
        );


    cartCount.textContent =
        totalItems;

    drawerCount.textContent =
        totalItems;


    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div style="
                text-align:center;
                padding:60px 20px;
                color:#777;
            ">

                Your bag is waiting
                for a little something. 🐾

                <br><br>

                <a
                    href="#shop"
                    onclick="closeCart()"
                    style="text-decoration:underline"
                >
                    Start shopping
                </a>

            </div>

        `;

        subtotal.textContent =
            "$0.00";

        return;

    }


    let total = 0;


    cartItems.innerHTML =
        cart.map(item => {

            const product =
                products.find(
                    p => p.id === item.id
                );


            const itemTotal =
                product.price *
                item.quantity;


            total += itemTotal;


            return `

            <div class="cart-row">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >

                <div>

                    <h4>
                        ${product.name}
                    </h4>

                    <p>
                        ${money(product.price)}
                    </p>


                    <div class="qty">

                        <button
                            onclick="changeQuantity(
                                ${product.id},
                                -1
                            )"
                        >
                            −
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button
                            onclick="changeQuantity(
                                ${product.id},
                                1
                            )"
                        >
                            +
                        </button>

                    </div>


                    <button
                        class="remove"
                        onclick="removeCart(
                            ${product.id}
                        )"
                    >
                        Remove
                    </button>

                </div>


                <strong>
                    ${money(itemTotal)}
                </strong>

            </div>

            `;

        }).join("");


    subtotal.textContent =
        money(total);

}


/* CHANGE QUANTITY */

function changeQuantity(id, amount) {

    const item =
        cart.find(
            product => product.id === id
        );


    if (!item) return;


    item.quantity += amount;


    if (item.quantity <= 0) {

        cart =
            cart.filter(
                product =>
                product.id !== id
            );

    }


    saveData();

    updateCart();

}


/* REMOVE */

function removeCart(id) {

    cart =
        cart.filter(
            item => item.id !== id
        );


    saveData();

    updateCart();

}


/* WISHLIST */

function toggleWishlist(id) {

    if (wishlist.includes(id)) {

        wishlist =
            wishlist.filter(
                item => item !== id
            );

        showToast(
            "Removed from wishlist"
        );

    } else {

        wishlist.push(id);

        showToast(
            "Saved to wishlist ♡"
        );

    }


    saveData();

    updateWishlist();

    displayProducts();

}


function updateWishlist() {

    wishlistCount.textContent =
        wishlist.length;

}


/* CART OPEN */

function openCart() {

    cartDrawer.classList.add(
        "open"
    );

    overlay.classList.add(
        "show"
    );

}


/* CART CLOSE */

function closeCart() {

    cartDrawer.classList.remove(
        "open"
    );

    overlay.classList.remove(
        "show"
    );

}


document
    .getElementById("cartButton")
    .addEventListener(
        "click",
        openCart
    );


document
    .getElementById("closeCart")
    .addEventListener(
        "click",
        closeCart
    );


overlay.addEventListener(
    "click",
    closeCart
);


/* FILTER */

document
    .querySelectorAll(".filter")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(".filter")
                    .forEach(
                        b =>
                        b.classList.remove(
                            "active"
                        )
                    );


                button.classList.add(
                    "active"
                );


                displayProducts(
                    button.dataset.filter
                );

            }
        );

    });


/* SEARCH */

const searchModal =
    document.getElementById(
        "searchModal"
    );

const searchInput =
    document.getElementById(
        "searchInput"
    );

const searchResults =
    document.getElementById(
        "searchResults"
    );


document
    .getElementById("searchButton")
    .onclick = () => {

        searchModal.classList.add(
            "open"
        );

        searchInput.focus();

        searchProducts("");

    };


document
    .getElementById("closeSearch")
    .onclick = () => {

        searchModal.classList.remove(
            "open"
        );

    };


function searchProducts(query) {

    query =
        query.toLowerCase().trim();


    const results =
        products.filter(product => {

            return (

                product.name
                    .toLowerCase()
                    .includes(query)

                ||

                product.type
                    .toLowerCase()
                    .includes(query)

                ||

                product.category
                    .toLowerCase()
                    .includes(query)

            );

        });


    searchResults.innerHTML =
        results.map(product => `

        <div class="search-result">

            <img
                src="${product.image}"
                alt=""
            >

            <div>

                <h4>
                    ${product.name}
                </h4>

                <p>
                    ${money(product.price)}
                </p>

            </div>

            <button
                class="add-cart"
                style="
                    position:static;
                    margin-left:auto;
                "
                onclick="addToCart(
                    ${product.id}
                )"
            >
                +
            </button>

        </div>

        `).join("");

}


searchInput.addEventListener(
    "input",
    event => {

        searchProducts(
            event.target.value
        );

    }
);


/* MOBILE MENU */

document
    .getElementById("mobileMenu")
    .addEventListener(
        "click",
        () => {

            document
                .getElementById("navigation")
                .classList.toggle(
                    "show"
                );

        }
    );


/* NEWSLETTER */

document
    .getElementById("newsletterForm")
    .addEventListener(
        "submit",
        event => {

            event.preventDefault();

            showToast(
                "Welcome to the pack! 🐾"
            );

            event.target.reset();

        }
    );


/* TOAST */

function showToast(message) {

    toast.textContent =
        message;

    toast.classList.add(
        "show"
    );


    clearTimeout(
        window.toastTimer
    );


    window.toastTimer =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            2200
        );

}


/* CHECKOUT */

document
    .querySelector(".checkout")
    .addEventListener(
        "click",
        () => {

            if (cart.length === 0) {

                showToast(
                    "Your bag is empty."
                );

                return;

            }


            showToast(
                "Checkout is ready to connect."
            );

        }
    );


/* INITIALIZE */

displayProducts();

updateCart();

updateWishlist();
