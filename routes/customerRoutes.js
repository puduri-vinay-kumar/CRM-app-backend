const express = require('express');
const {
    createCustomer,
    getCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer,
} = require('../controllers/customerController'); 
const roleMiddleware = require('../middlewares/roleMiddleware');
const authenticateToken = require('../middlewares/authMiddleware');

const router = express.Router();

//router.post('/', createCustomer); // Create a new customer
router.get('/',authenticateToken, getCustomers); // Get all customers or filter them
router.get('/:id',authenticateToken, getCustomerById); // Get a single customer by ID
//router.put('/:id', updateCustomer); // Update a customer by ID
//router.delete('/:id', deleteCustomer); // Delete a customer by ID
router.post('/', authenticateToken, roleMiddleware('Admin'), createCustomer);// Create a new customer
router.put('/:id', authenticateToken, roleMiddleware('Admin'), updateCustomer);// Update a customer ID
router.delete('/:id', authenticateToken, roleMiddleware('Admin'), deleteCustomer);// Delete a customer ID

module.exports = router;

/**
 * @swagger
 * /customers:
 *   post:
 *     summary: Create a new customer
 *     description: Creates a new customer with name, email, phone, and optional company.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the customer.
 *               email:
 *                 type: string
 *                 description: The email address of the customer.
 *               phone:
 *                 type: string
 *                 description: The phone number of the customer.
 *               company:
 *                 type: string
 *                 description: The company the customer is associated with (optional).
 *     responses:
 *       201:
 *         description: Customer created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Customer created successfully
 *                 customerId:
 *                   type: integer
 *                   description: The ID of the newly created customer.
 *       400:
 *         description: Invalid input data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       message:
 *                         type: string
 *                         example: "Invalid email format"
 */

/**
 * @swagger
 * /customers:
 *   get:
 *     summary: Get all customers with optional filters
 *     description: Retrieves all customers with optional query parameters to filter by name, email, phone, or company.
 *     parameters:
 *       - in: query
 *         name: name
 *         required: false
 *         schema:
 *           type: string
 *         description: Filter customers by name.
 *       - in: query
 *         name: email
 *         required: false
 *         schema:
 *           type: string
 *         description: Filter customers by email.
 *       - in: query
 *         name: phone
 *         required: false
 *         schema:
 *           type: string
 *         description: Filter customers by phone.
 *       - in: query
 *         name: company
 *         required: false
 *         schema:
 *           type: string
 *         description: Filter customers by company.
 *     responses:
 *       200:
 *         description: List of customers.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 customers:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: Customer ID
 *                       name:
 *                         type: string
 *                         description: Customer name
 *                       email:
 *                         type: string
 *                         description: Customer email
 *                       phone:
 *                         type: string
 *                         description: Customer phone number
 *                       company:
 *                         type: string
 *                         description: Customer company
 */

/**
 * @swagger
 * /customers/{id}:
 *   get:
 *     summary: Get a single customer by ID
 *     description: Retrieves the customer details by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The customer ID.
 *     responses:
 *       200:
 *         description: Customer found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 customer:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: Customer ID
 *                     name:
 *                       type: string
 *                       description: Customer name
 *                     email:
 *                       type: string
 *                       description: Customer email
 *                     phone:
 *                       type: string
 *                       description: Customer phone number
 *                     company:
 *                       type: string
 *                       description: Customer company
 *       404:
 *         description: Customer not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Customer not found
 */

/**
 * @swagger
 * /customers/{id}:
 *   put:
 *     summary: Update a customer by ID
 *     description: Updates the details of an existing customer using their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The customer ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The updated name of the customer.
 *               email:
 *                 type: string
 *                 description: The updated email address of the customer.
 *               phone:
 *                 type: string
 *                 description: The updated phone number of the customer.
 *               company:
 *                 type: string
 *                 description: The updated company of the customer (optional).
 *     responses:
 *       200:
 *         description: Customer updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Customer updated successfully
 *       404:
 *         description: Customer not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Customer not found
 */

/**
 * @swagger
 * /customers/{id}:
 *   delete:
 *     summary: Delete a customer by ID
 *     description: Deletes a customer by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The customer ID.
 *     responses:
 *       200:
 *         description: Customer deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Customer deleted successfully
 *       404:
 *         description: Customer not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Customer not found
 */
