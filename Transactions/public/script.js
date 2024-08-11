document.getElementById('getPayments').addEventListener('click', getPayments);
document.getElementById('getPaymentById').addEventListener('click', getPaymentById);
document.getElementById('addPayment').addEventListener('click', showAddPaymentForm);

function getPayments() {
    fetch('/transactions/payments')
        .then(response => response.json())
        .then(data => {
            const content = document.getElementById('content');
            content.innerHTML = '';
            const ul = document.createElement('ul');
            data.forEach(payment => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <strong>ID:</strong> ${payment.id} <br>
                    <strong>Transaction ID:</strong> ${payment.transaction_id} <br>
                    <strong>Customer ID:</strong> ${payment.customer_id} <br>
                    <strong>Date:</strong> ${payment.transaction_date} <br>
                    <strong>Amount:</strong> ${payment.amount} <br>
                    <strong>Status:</strong> ${payment.status} <br>
                    <strong>Method:</strong> ${payment.payment_method} <br>
                    <strong>Currency:</strong> ${payment.currency} <br>
                    <button onclick="editPayment(${payment.id})">Edit</button>
                    <button onclick="deletePayment(${payment.id})">Delete</button>
                `;
                ul.appendChild(li);
            });
            content.appendChild(ul);
        })
        .catch(error => console.log('Error at frontend while displaying'));
}

function getPaymentById() {
    const content = document.getElementById('content');
    content.innerHTML = `
    <form  id = 'id-form'>
        <label for="getid">Payment Id</label>
        <input type="number" id="gettingid" name="getid" required>
        <button type="submit">Get</button>
    </form>`
    document.getElementById('id-form').addEventListener('submit', (event) => {
        event.preventDefault();
        const id = document.getElementById('gettingid').value;

        fetch(`/transactions/payments/${id}`)
            .then(response => response.json())
            .then(payment => {
                const content = document.getElementById('content');
                content.innerHTML = `
                <strong>Transaction ID:</strong> ${payment.transaction_id} <br>
                <strong>Customer ID:</strong> ${payment.customer_id} <br>
                <strong>Date:</strong> ${payment.transaction_date} <br>
                <strong>Amount:</strong> ${payment.amount} <br>
                <strong>Status:</strong> ${payment.status} <br>
                <strong>Method:</strong> ${payment.payment_method} <br>
                <strong>Currency:</strong> ${payment.currency} <br>
                <button onclick="editPayment(${payment.id})">Edit</button>
                <button onclick="deletePayment(${payment.id})">Delete</button>
            `;
            })
            .catch(error => console.error('Error:', error));

    })
}

function showAddPaymentForm() {
    const content = document.getElementById('content');
    content.innerHTML = `
        <form id="form">
            <label for="transcation_id">Transaction ID:</label>
            <input type="text" id="transid" name="transaction_id" required>

            <label for="customer_id">Customer ID:</label>
            <input type="text" id="cusid" name="customer_id" required>

            <label for="transaction_date">Transaction Date:</label>
            <input type="date" id="transdate" name="transaction_date" required>

            <label for="amount">Amount:</label>
            <input type="number" id="amount" name="amount" required>

            <label for="status">Status:</label>
            <input type="text" id="status" name="status" required>

            <label for="method">Method of Payment:</label>
            <input type="text" id="method" name="method" required>

            <label for="currency">Currency:</label>
            <input type="text" id="currency" name="currency" required>

            <button type="submit">Submit</button>
        </form>
    `;

    document.getElementById('form').addEventListener('submit', function (e) {
        e.preventDefault();
        const payment = {
            transaction_id: document.getElementById('transid').value,
            customer_id: document.getElementById('cusid').value,
            transaction_date: document.getElementById('transdate').value,
            amount: document.getElementById('amount').value,
            status: document.getElementById('status').value,
            payment_method: document.getElementById('method').value,
            currency: document.getElementById('currency').value
        };
        content.innerHTML = '';
        content.innerHTML = '<h2 id="center">successfully posted👍</h2>';

        fetch('/transactions/payments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payment)
        })
            .then(response => response.json()).catch(error => console.log('Error=', error.message));
    });
}


function deletePayment(id) {
    fetch(`/transactions/payments/${id}`, {
        method: 'DELETE'
    })
        .then(() => {
            getPayments();
        })
        .catch(error => console.error('Error:', error));
}


function editPayment(id) {
    const content = document.getElementById('content');
    content.innerHTML = `
        <form id="update-form">
            <label for="transcation_id">Transaction ID:</label>
            <input type="text" id="transid" name="transaction_id" required>

            <label for="customer_id">Customer ID:</label>
            <input type="text" id="cusid" name="customer_id" required>

            <label for="transaction_date">Transaction Date:</label>
            <input type="date" id="transdate" name="transaction_date" required>

            <label for="amount">Amount:</label>
            <input type="number" id="amount" name="amount" required>

            <label for="status">Status:</label>
            <input type="text" id="status" name="status" required>

            <label for="method">Method of Payment:</label>
            <input type="text" id="method" name="method" required>

            <label for="currency">Currency:</label>
            <input type="text" id="currency" name="currency" required>

            <button type="submit">Save</button>
        </form>
    `;

    fetch(`/transactions/payments/${id}`)
        .then(response => response.json())
        .then(payment => {

            document.getElementById('transid').value = payment.transaction_id,
                document.getElementById('cusid').value = payment.customer_id,
                document.getElementById('transdate').value = payment.transaction_date,
                document.getElementById('amount').value = payment.amount,
                document.getElementById('status').value = payment.status,
                document.getElementById('method').value = payment.payment_method,
                document.getElementById('currency').value = payment.currency
        });
    document.getElementById('update-form').addEventListener('submit', async (event) => {
        event.preventDefault();
        const payment = {
            transaction_id: document.getElementById('transid').value,
            customer_id: document.getElementById('cusid').value,
            transaction_date: document.getElementById('transdate').value,
            amount: document.getElementById('amount').value,
            status: document.getElementById('status').value,
            payment_method: document.getElementById('method').value,
            currency: document.getElementById('currency').value
        };
        fetch(`/transactions/payments/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payment)
        })
        content.innerHTML = '';
        getPayments();
    })

}
