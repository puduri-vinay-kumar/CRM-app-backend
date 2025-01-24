const db = require('../utils/db');
const { customerValidation } = require('../utils/validator');

// Create a new customer
const createCustomer = async (req, res, next) => {
    try {
        const { error } = customerValidation(req.body);
        if (error) {
            return res.status(400).json({ success: false, error: error.details });
        }

        const { name, email, phone, company } = req.body;
        const query = `
            INSERT INTO customers (name, email, phone, company, created_at, updated_at) 
            VALUES (?, ?, ?, ?, NOW(), NOW())
        `;

        const [result] = await db.query(query, [name, email, phone, company || null]);
        res.status(201).json({ success: true, message: 'Customer created successfully', customerId: result.insertId });
    } catch (err) {
        next(err);
    }
};

// Get all customers (with optional filters)
const getCustomers = async (req, res, next) => {
    try {
        const { name, email, phone, company } = req.query;
        let query = 'SELECT * FROM customers WHERE 1=1';
        const params = [];

        if (name) {
            query += ' AND name LIKE ?';
            params.push(`%${name}%`);
        }
        if (email) {
            query += ' AND email = ?';
            params.push(email);
        }
        if (phone) {
            query += ' AND phone = ?';
            params.push(phone);
        }
        if (company) {
            query += ' AND company LIKE ?';
            params.push(`%${company}%`);
        }

        const [customers] = await db.query(query, params);
        res.status(200).json({ success: true, customers });
    } catch (err) {
        next(err);
    }
};

// Get a single customer by ID
const getCustomerById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const [customers] = await db.query('SELECT * FROM customers WHERE id = ?', [id]);

        if (customers.length === 0) {
            return res.status(404).json({ success: false, message: 'Customer not found' });
        }

        res.status(200).json({ success: true, customer: customers[0] });
    } catch (err) {
        next(err);
    }
};

// Update a customer by ID
const updateCustomer = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, email, phone, company } = req.body;

        const [existingCustomer] = await db.query('SELECT * FROM customers WHERE id = ?', [id]);
        if (existingCustomer.length === 0) {
            return res.status(404).json({ success: false, message: 'Customer not found' });
        }

        const query = `
            UPDATE customers 
            SET name = ?, email = ?, phone = ?, company = ?, updated_at = NOW()
            WHERE id = ?
        `;

        await db.query(query, [name, email, phone, company || null, id]);
        res.status(200).json({ success: true, message: 'Customer updated successfully' });
    } catch (err) {
        next(err);
    }
};

// Delete a customer by ID
const deleteCustomer = async (req, res, next) => {
    try {
        const { id } = req.params;

        const [existingCustomer] = await db.query('SELECT * FROM customers WHERE id = ?', [id]);
        if (existingCustomer.length === 0) {
            return res.status(404).json({ success: false, message: 'Customer not found' });
        }

        await db.query('DELETE FROM customers WHERE id = ?', [id]);
        res.status(200).json({ success: true, message: 'Customer deleted successfully' });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    createCustomer,
    getCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer,
};
