import { cartIndicator } from "./commmon_functions.js"

// Get Cart list data
let ShopList = JSON.parse(localStorage.getItem("cart"))
// Add the number to cart icon (using data returned by JSON)
cartIndicator(ShopList)