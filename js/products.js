import { productsList } from "./data.js";
import { handleClick, cartIndicator } from "./commmon_functions.js";

// Get Cart list data
let ShopList = JSON.parse(localStorage.getItem("cart"))
// Add the number to cart icon (using data returned by JSON)
cartIndicator(ShopList)

function filterProducts(brand)
{
    let buttons = document.querySelectorAll(".button-filter");
    buttons.forEach((button) => {
    //check if value equals innerText
        if (brand.toUpperCase() == button.innerText.toUpperCase()) {
            button.classList.add("active-filter-btn");
        } else {
            button.classList.remove("active-filter-btn");
        }
    });

    let gridBrandProducts = document.querySelector("#brand-products")
    // Clear existing content
    gridBrandProducts.innerHTML = "";

    if(brand == 'all')
    {
        loadBrandProducts(productsList, gridBrandProducts);
    } else
    {
        let brandProducts = productsList.filter(product => product.brand === brand)
        loadBrandProducts(brandProducts, gridBrandProducts)
    }
}


function loadBrandProducts (brandProducts, gridBrandProducts)
{
    brandProducts.forEach(product => {
        // Set value to a "html"
        let html = `<div class="product-card col-md-6 col-lg-4 col-xl-3 p-2">
                        <div class="collection-img position-relative">
                            <img src="${product.productImage}" id="${product.productCode}" alt="${product.productName}" class="w-100">
                        </div>
                        <div class="text-center">
                            <div class="rating mt-3">
                                <span class="text-primary"><i class="fa fa-star"></i></span>
                                <span class="text-primary"><i class="fa fa-star"></i></span>
                                <span class="text-primary"><i class="fa fa-star"></i></span>
                                <span class="text-primary"><i class="fa fa-star"></i></span>
                                <span class="text-primary"><i class="fa fa-star"></i></span>
                            </div>
                            <p id="${product.productCode}" class="text-capitalize my-1"> ${product.productName}</p>
                            <span class="fw-bold">R$ ${product.price}</span>
                        </div>
                    </div>`;
        // Pass "html" to grid
        gridBrandProducts.innerHTML += html
        } );
        
        // Add click to product card
        handleClick() 
}

window.onload = () => {
    // Setting the local in HTML to dynamic loading (id in index.html):
    let gridBrandProducts = document.querySelector("#brand-products")
    // Call the function to put HTML in the selected grid. Using the list of products to show and the grid (local on HTML) as parameters
    loadBrandProducts(productsList, gridBrandProducts);
};


document.getElementById('all-btn').addEventListener('click', function() {
    filterProducts('all');
});
document.getElementById('nike-btn').addEventListener('click', function() {
    filterProducts('Nike');
});
document.getElementById('adidas-btn').addEventListener('click', function() {
    filterProducts('Adidas');
});
document.getElementById('puma-btn').addEventListener('click', function() {
    filterProducts('Puma');
});
document.getElementById('vans-btn').addEventListener('click', function() {
    filterProducts('Vans');
});
