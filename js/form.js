import { cartIndicator } from "./commmon_functions.js"

// Get Cart list data
let ShopList = JSON.parse(localStorage.getItem("cart"))
// Add the number to cart icon (using data returned by JSON)
cartIndicator(ShopList)

// API to fill the spaces with CEP data
function searchCep() {
    let cep = document.getElementById('cep').value;
    if (cep !== "") {
        let url = "https://brasilapi.com.br/api/cep/v1/" + cep;
        let req = new XMLHttpRequest();
        req.open("GET", url);
        req.send();

        req.onload = function () {
            if (req.status === 200) {
                let address = JSON.parse(req.response)
                document.getElementById('street').value = address.street;
                document.getElementById('neighborhood').value = address.neighborhood;
                document.getElementById('city').value = address.city;
                document.getElementById('state').value = address.state;
            }
            else if (req.status === 404) {
                alert("CEP inválido");
            }
            else {
                alert("Erro ao fazer a requisição");
            }
        }
    }
}


// Function to fill when blur the space
window.onload = function () {
    let cep = document.getElementById("cep");
    cep.addEventListener("blur", searchCep);
}


export function loadShop(cartList, requests) {

    let id = requests.length
    if (requests == null || requests == 0) { id = 1 }


    let name = document.querySelector("input#name").value
    let email = document.querySelector("input#email").value
    let cep = document.querySelector("input#cep").value
    let number = document.querySelector("input#number").value



    let request = {
        id: id,
        name: name,
        items: cartList,
        email: email,
        cep: cep,
        number: number
    }

    requests.push(request)
    localStorage.setItem("requests", JSON.stringify(requests))
    localStorage.removeItem('cart')
    localStorage.removeItem('Product ID')
    alert("Your shop was finished!")
    window.location.href = "/index.html";
}

let cartList = JSON.parse(localStorage.getItem("cart"))
let requests = JSON.parse(localStorage.getItem("requests"))
if (requests == null) {
    requests = []
}

let submit_btn = document.querySelectorAll("#submit-btn")
submit_btn.forEach(button => button.addEventListener("click", () => loadShop(cartList, requests)))