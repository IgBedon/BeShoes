// Adding click event to product cards. Capture ID and save in Local Storage
export function handleClick()
{
    let product_card = document.querySelectorAll(".product-card")
    console.log(product_card)
    product_card.forEach(card => card.addEventListener('click', (e) =>{
        console.log("Teste 2")
        let productID = e.target.id
        localStorage.setItem("Product ID", productID)
        window.location.href = "product.html";
    }))
}

// -------------------------------------------------------------------------------------------------

export function cartIndicator (ShopList){
    let indicator = document.querySelector(".cart-quantity")
    if (ShopList == null || ShopList.length == 0)
    {
        indicator.innerHTML = 0 
    } else
    {
        indicator.innerHTML = ShopList.length
}}