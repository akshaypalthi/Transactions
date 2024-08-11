CREATE DATABASE hackathon;

USE hackathon;

IF table exsis => DROP TABLE transactions;

CREATE TABLE transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    transaction_id VARCHAR(50) NOT NULL,
    customer_id INT,
    transaction_date DATE ,
    amount DECIMAL(20, 2) NOT NULL,
    status VARCHAR(20) ,
    payment_method VARCHAR(30) NOT NULL,
    currency VARCHAR(20) NOT NULL
);

INSERT INTO transactions (transaction_id, customer_id, transaction_date, amount, status, payment_method, currency)
values ('T12345', 1, '2022-01-04' , 100.00, 'Completed', 'Credit Card', 'Rupees');


-- For postman
--  we can use the below data snippet for the post and put request
{
        "transaction_id": "AK12345",
        "customer_id": 10,
        "transaction_date": "2024-08-10",
        "amount": "2000",
        "status": "processing",
        "payment_method": "Paytm",
        "currency": "Dollers"
    }