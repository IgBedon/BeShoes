import { cartIndicator } from "./commmon_functions.js"

// Get Cart list data
let ShopList = JSON.parse(localStorage.getItem("cart"))
// Add the number to cart icon (using data returned by JSON)
cartIndicator(ShopList)


function loadCartProductsLeft (cartList, leftCart){
        cartList.forEach(product => {
            let html = `<div id="cart-card" class="p-4">
                        <div class="row px-3">
                            <!-- cart images div -->
                            <div id="product-img" class="bg-light mx-auto mb-4 d-flex justify-content-center align-items-center">
                                <img src="${product.productImage}" class="img-fluid" alt="cart img">
                            </div>

                            <!-- cart product details -->
                            <div id="details-div" class="col-md-7 col-11 mx-auto px-4 mt-2">
                                <div class="row">
                                    <!-- product name  -->
                                    <div id="card-title" class="">
                                        <h1 id="product-name" class="mb-4 fs-5">${product.productName}</h1>
                                        <p class="fs-6 mb-2">BRAND: ${product.brand}</p>
                                        <p class="fs-6 mb-3">SIZE: ${product.size}</p>
                                    </div>
                                    <!-- quantity inc dec -->
                                    <div class="col-6">
                                        <ul id="set-quantity" class="pagination justify-content-start">
                                            <li class="page-item">
                                                <button class="page-link ">
                                                    <i class="fa fa-minus"></i> </button>
                                            </li>
                                            <li class="page-item"><input type="text" name="" class="page-link"
                                                    value="${product.quantity}" id="textbox">
                                            </li>
                                            <li class="page-item">
                                                <button class="page-link"><i class="fa fa-plus"></i></button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <!-- //remover move and price -->
                                <div class="row">
                                    <div id="${product.productCode}" class="remove-wish col-8 d-flex justify-content-start align-items-center">
                                        <button class="d-flex"><i class="fa fa-trash fs-4 px-2 remove-item"></i>
                                        <p class="remove-item">REMOVE ITEM</p>
                                        </button>
                                    </div>
                                    <div id="price-money" class="col-4 d-flex justify-content-end align-items-center">
                                        <h3>R$<span>${product.price}</span></h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr />
                    </div>`;
            leftCart.innerHTML += html;
        });
}

function loadCartProductsRight (rightCart){
    let html = `<div class="col-md-12 col-lg-4 col-11 mx-auto mt-lg-0 mt-md-5">
                    <div class="right_side p-3 shadow bg-white rounded">
                        <h2 class="mb-5">The Total Amount Of</h2>
                        <div class="price-div d-flex justify-content-between">
                            <p>Product amount</p>
                            <p>$<span>0.00</span></p>
                        </div>
                        <div class="price-div-shipping d-flex justify-content-between">
                            <p>Shipping Charge</p>
                            <p>$<span>0.00</span></p>
                        </div>
                        <hr />
                        <div class="total-div d-flex justify-content-between font-weight-bold">
                            <p>The total amount</p>
                            <p>$<span>0.00</span></p>
                        </div>
                        <button id="checkout-btn" class="btn btn-primary text-uppercase">Checkout</button>
                    </div>

                    <div class="mt-3 shadow p-3 bg-white rounded">
                        <form class="pt-4">
                            <div class="form-box form-control">
                                <p class="text-start fs-5 fw-bold text-muted">Enter your Name:</p>
                                <div class="input-group mb-3 mt-3">
                                    <input id="name" type="text" class="form-control" placeholder="Enter your full name, please...">
                                </div>
                            </div>
                            <div class="form-box form-control">
                                <p class="text-start fs-5 fw-bold text-muted">Enter your address:</p>
                                <div class="input-group mb-3 mt-3">
                                    <input id="address" type="text" class="form-control" placeholder="Enter your address, please...">
                                </div>
                            </div>
                        </form>
                    </div>
                </div>`
    rightCart.innerHTML += html;
}


function calculateTotalValue(cartList)
{
    let sum = 0;

    cartList.forEach(product => {
        sum += product.quantity * product.price;
    });

    // Limitando a duas casas decimais
    let formattedSum = sum.toFixed(2);

    document.querySelector(".price-div span").innerHTML = formattedSum;
    if(formattedSum>0)
    {
        let shippingValue = (0.01*parseFloat(formattedSum)).toFixed(2)
        document.querySelector(".price-div-shipping span").innerHTML = (shippingValue);
        document.querySelector(".total-div span").innerHTML = (parseFloat(formattedSum)+parseFloat(shippingValue)).toFixed(2);
    }
}


function deleteItem(cartList){
    let removeItem = document.querySelectorAll(".remove-item")
        
        removeItem.forEach( button =>
        button.addEventListener("click", (event)=> {
       
        let htmlCartList = document.querySelector('#left-cart')
        let product = event.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement
        htmlCartList.removeChild(product)
        let productID = product.id
        let index = cartList.findIndex( product => product.codigoProduto == productID)
        cartList.splice(index,1)
        localStorage.setItem("cart",JSON.stringify(cartList))
        calculateTotalValue(cartList)
        //cartIndicator(listaCarrinhoDeCompras)
        location.reload()
        }))
}

export function loadShop(cartList, requests){
  
    let id = requests.length
     if (requests == null || requests == 0){id = 1}

    let address = document.querySelector("input#address").value
    let name = document.querySelector("input#name").value

    let request = {
        id: id,
        name: name,
        items: cartList,
        address: address
    }

    requests.push(request)
    localStorage.setItem("requests",JSON.stringify(requests))
    localStorage.removeItem('cart')
    localStorage.removeItem('Product ID')
    alert("Your shop was finished!")
    location.reload()
}


let cartList = JSON.parse(localStorage.getItem("cart"))
let leftCart = document.querySelector('#left-cart')
let rightCart = document.querySelector('#cart')


let requests = JSON.parse(localStorage.getItem("requests"))
if (requests == null ){
    requests = []
}

// cartIndicator(listaCarrinhoDeCompras)
// These methods are loading cart page
loadCartProductsLeft(cartList, leftCart)
loadCartProductsRight(rightCart)
deleteItem(cartList)
calculateTotalValue(cartList)

let checkout_btn = document.querySelectorAll("#checkout-btn")
checkout_btn.forEach(button => button.addEventListener("click", () => loadShop(cartList, requests)))