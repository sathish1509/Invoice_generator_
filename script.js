let items = [];

function addItem() {
    const itemName = document.getElementById('itemName').value;
    const itemPrice = parseFloat(document.getElementById('itemPrice').value);
    const itemQuantity = parseInt(document.getElementById('itemQuantity').value);

    if (itemName && itemPrice > 0 && itemQuantity > 0) {
        items.push({ name: itemName, price: itemPrice, quantity: itemQuantity });
        updateInvoiceTable();
        document.getElementById('invoiceForm').reset();
    }
}

function updateInvoiceTable() {
    const tbody = document.querySelector('#invoiceTable tbody');
    tbody.innerHTML = '';

    let subtotal = 0;
    items.forEach(item => {
        const total = item.price * item.quantity;
        subtotal += total;
        const row = `<tr>
            <td>${item.name}</td>
            <td>${item.price.toFixed(2)}</td>
            <td>${item.quantity}</td>
            <td>${total.toFixed(2)}</td>
         </tr>`;
        tbody.innerHTML += row;
    });

    const tax = subtotal * 0.10;
    const total = subtotal + tax;

    document.getElementById('subtotal').textContent = subtotal.toFixed(2);
    document.getElementById('tax').textContent = tax.toFixed(2);
    document.getElementById('total').textContent = total.toFixed(2);
}

function generateInvoice() {
    const printWindow = window.open('', '_blank');
    const content = document.querySelector('.container').innerHTML;
    printWindow.document.write(`
        <html>
        <head>
            <title>Invoice</title>
            <style>${document.querySelector('style').textContent}</style>
        </head>
        <body>${content}</body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
}
