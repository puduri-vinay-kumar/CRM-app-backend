const db = require('../utils/db');

const createCustomer = async (name, email, phone, company, userId) => {
    const query = `
        INSERT INTO customers (name, email, phone, company, user_id) 
        VALUES (?, ?, ?, ?, ?)
    `;
    const [result] = await db.execute(query, [name, email, phone, company, userId]);
    return result.insertId;
};

const getCustomers = async (search, company, userId) => {
    let query = 'SELECT * FROM customers WHERE user_id = ?';
    const params = [userId];

    if (search) {
        query += ' AND (name LIKE ? OR email LIKE ? OR phone LIKE ?)';
        params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    if (company) {
        query += ' AND company = ?';
        params.push(company);
    }

    const [rows] = await db.execute(query, params);
    return rows;
};

module.exports = { createCustomer, getCustomers };
