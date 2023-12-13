let data = JSON.parse(localStorage.getItem("requests"));
const result_div = document.getElementById('result-requests');

data.forEach(request => {
    let html = `<tr class="mb-5">
                    <th rowspan="${request.length}">${request.id}</th>
                    <th rowspan="${request.length}">${request.name}</th>
                    <th rowspan="${request.length}">${request.email}</th>
                    <th rowspan="${request.length}">${request.cep}</th>
                    <th rowspan="${request.length}">${request.number}</th>
                </tr>
                `
    result_div.innerHTML += html;

    result_div.innerHTML += `<tr>
                            <th>Items</th>`;

    request.items.forEach(item   => {
        result_div.innerHTML += `<td>Title: ${item.productName}</td>`;
        result_div.innerHTML += `<td>Quantity: ${item.quantity}</td>`;
        result_div.innerHTML += `<td>Price: $${item.price}</td>`;
        result_div.innerHTML += '</tr>';
    });
    
});