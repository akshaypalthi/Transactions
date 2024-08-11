const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const db = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database
});

console.log(process.env.password);
db.connect((err) => {
  if (err) return;
  console.log('Connected to the database');
});

exports.addpayment = (payment, callback) => {
  const { transaction_id, customer_id, transaction_date, amount, status, payment_method, currency } = payment;
  db.query(
    'INSERT INTO transactions (transaction_id,customer_id,transaction_date,amount,status,payment_method,currency ) VALUES (?, ?, ?, ?, ?, ?, ?)', [transaction_id, customer_id, transaction_date, amount, status, payment_method, currency],
    callback
  );
};

exports.getAllPayment = (callback) => {
  db.query('SELECT * FROM transactions', callback);
};

exports.getPaymentById = (id, callback) => {
  db.query('SELECT * FROM transactions WHERE id = ?', [id], (err, result) => {
    if (err) {
      callback(err, null);
      return;
    }
    callback(null, result[0]);
  });
};

exports.updatePayment = (id, payment, callback) => {
  const { transaction_id, customer_id, transaction_date, amount, status, payment_method, currency } = payment;
  db.query('UPDATE transactions SET transaction_id=? ,customer_id=? ,transaction_date=?,amount=?,status=?,payment_method=?,currency=? WHERE id = ?', [transaction_id, customer_id, transaction_date, amount, status, payment_method, currency, id], callback);
};

exports.deletePayment = (id, callback) => {
  db.query('DELETE FROM transactions WHERE id = ?', [id], callback);
};