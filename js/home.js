import { productsList } from "./data.js";
import { handleClick, cartIndicator } from "./commmon_functions.js"; 

// Get Cart list data
let ShopList = JSON.parse(localStorage.getItem("cart"))
// Add the number to cart icon (using data returned by JSON)
cartIndicator(ShopList)

// Dynamic loading products
function loadSpecialProducts (specialProducts, gridSpecial)
{
    specialProducts.forEach(product => {
    // Set value to a "html"
    let html = `<div class="product-card col-md-6 col-lg-4 col-xl-3 p-2">
                    <div class="special-img position-relative overflow-hidden">
                        <img src="${product.productImage}" id="${product.productCode}" class="w-100">
                        <span class="position-absolute d-flex align-items-center justify-content-center text-dark fs-4">
                            <i class="special-icon fa fa-heart"></i>
                        </span>
                    </div>
                    <div class="text-center">
                        <p id="${product.productCode}" class="text-capitalize mt-3 mb-1">${product.productName}</p>
                        <span class="fw-bold d-block">R$ ${product.price}</span>
                        <a href="product.html" id="${product.productCode}" class="btn btn-primary mt-3 add-btn">View details</a>
                    </div>
                </div>`;
    // Pass "html" to grid
    gridSpecial.innerHTML += html
    } );
}

// Dynamic loading products
function loadPopularProducts (popularProducts, gridPopular)
{
    popularProducts.forEach(product => {
    // Set value to a "html"
    let html = `<div class="product-card d-flex align-items-start justify-content-start">
                    <img alt="" id="${product.productCode}" class="img-fluid pe-3 w-25" src="${product.productImage}">
                    <div>
                        <p class="mb-0" id="${product.productCode}">${product.productName}</p>
                        <span>R$ ${product.price}</span>
                    </div>
                </div>`;
    // Pass "html" to grid
    gridPopular.innerHTML += html
    } );
}


// Setting products list using filter (category in data.js):
// Special
let specialProducts = productsList.filter(product => product.category === "Special")
// Popular (Top rated, Best selling and On sale)
let topRatedProducts = productsList.filter(product => product.category === "Top Rated")
let bestSellings = productsList.filter(product => product.category === "Best Selling")
let onSales = productsList.filter(product => product.category === "On Sale")


// Setting the local in HTML to dynamic loading (id in index.html):
let gridSpecial = document.querySelector("#special-products")
let gridTopRated = document.querySelector("#top-rated")
let gridBestSelling= document.querySelector("#best-selling")
let gridOnSale = document.querySelector("#on-sale")


// call the function to put HTML in the selected grid. Using the list of products to show and the grid (local on HTML) as parameters
loadSpecialProducts(specialProducts, gridSpecial);
loadPopularProducts(topRatedProducts,gridTopRated)
loadPopularProducts(bestSellings, gridBestSelling)
loadPopularProducts(onSales, gridOnSale)


// Add click to product card
handleClick()