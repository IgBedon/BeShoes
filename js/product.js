import { productsList } from "./data.js";
import { cartIndicator } from "./commmon_functions.js";

// Get Cart list data
let ShopList = JSON.parse(localStorage.getItem("cart"))
// Add the number to cart icon (using data returned by JSON)
cartIndicator(ShopList)


// Search for an item. Parameters: list of items and an item ID
export function findProduct(items, Id) {
    let item = items.find(product => product.productCode == Id)
    return item
}

// Esta funcao carrega o produto encontrado pela funcao findItem na pagina do produto. Recebe como parametro o produto que será renderizado na pagina do produto
function loadProduct(product) {
    let insertProduto = document.querySelector("#card-wrapper")
    let html = `<div id="card-product" class="card">
                    <!-- card left -->
                    <div id="product-imgs" class="justify-content-start">
                        <div class="overflow-hidden">
                            <div id="img-showcase" class="d-flex w-100">
                                <img src="${product.productImage}" alt="Shoe image">
                            </div>
                        </div>
                        <div id="img-select">
                            <div class="img-item">
                                <a href="#" data-id="1">
                                    <img src="./image/Products/NikeAirForcePreto-2.jpg" alt="Shoe image">
                                </a>
                            </div>
                            <div class="img-item">
                                <a href="#" data-id="2">
                                    <img src="./image/Products/NikeAirForcePreto-2.jpg" alt="Shoe image">
                                </a>
                            </div>
                            <div class="img-item">
                                <a href="#" data-id="3">
                                    <img src="./image/Products/NikeAirForcePreto-2.jpg" alt="Shoe image">
                                </a>
                            </div>
                            <div class="img-item">
                                <a href="#" data-id="4">
                                    <img src="./image/Products/NikeAirForcePreto-2.jpg" alt="Shoe image">
                                </a>
                            </div>
                        </div>
                    </div>
                    <!-- card right -->
                    <div id="product-content">
                        <h2 class="fs-2 text-capitalize fw-bold position-relative mt-4">${product.productName}</h2>
                        <a href="index.html" id="product-link" class="bg-primary">Visit our site</a>
                        <div id="product-rating">
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star-half"></i>
                            <span class="fw-bold">4.7 (21)</span>
                        </div>

                        <div class="product-price my-1 fs-6 fw-bold">
                            <p id="price">Price: <span class="fw-bold">R$${product.price}</span></p>
                        </div>

                        <div id="product-detail">
                            <h4>About this item: </h4>
                            <p id="description" class="p-1 opacity-75 fs-7">${product.productDescription}</p>
                            <ul class="my-1 fs-6">
                                <li>Size: <span>${product.size}</span></li>
                                <li>Available: <span>in stock</span></li>
                                <li>Shipping Area: <span>All over the world</span></li>
                                <li>Shipping Fee: <span>Free</span></li>
                            </ul>
                        </div>

                        <div id="purchase-info" class="my-4">
                            <input id="quantity" type="number" min="0" value="1">
                            <button id="buy-btn" type="button" class="btn bg-primary">
                                Add to Cart <i class="fa fa-shopping-cart"></i>
                            </button>
                            <button type="button" class="btn bg-primary">Move to Wish List <i id="fa-heart-none" class="fa fa-heart"></i></button>
                        </div>
                    </div>
                </div>`
    insertProduto.innerHTML = html
}

// Esta função adiciona um item ao carrinho: recebe 2 parametros : o carrinho de compras e o produto que sera adicionado
function addCart(cartList, product, id){
    let buyButton = document.querySelector("#buy-btn")
    buyButton.addEventListener("click", ()=> {

        if(cartList.find(product => product.productCode == id)){
            alert("This item is already on Cart!")
            let i = cartList.findIndex(item => item.productCode == id)
            cartList[i].quantity += 1
            localStorage.setItem("cart",JSON.stringify(cartList))
            window.location.href = "index.html";
        } else
        {
        let quantity = parseInt(document.querySelector("#quantity").value)
        // We catch the value of input and turn it in int
        // Option 1 - adicionar a propriedade quantidade ao nosso objeto, e depois fazer o push do item na lista de compras
        // item.quantidade = quantidade
        // listaCompras.push(item)
        // opcao 2 - criar um novo objeto com o spread operador, incluindo a propriedade quantidade
        cartList.push({...product, quantity})
        localStorage.setItem("cart", JSON.stringify(cartList))
        alert("Item added to cart successfully!")
        window.location.href = "index.html";
        }
    })
}

let cartList = JSON.parse(localStorage.getItem("cart"))

if (cartList == null) {
    cartList = []
}

let id = localStorage.getItem("Product ID")
let product = findProduct(productsList, id)
loadProduct(product)
addCart(cartList, product, id)
// cartIndicator(listaCompras)
