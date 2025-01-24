const express = require('express');
const { logInteraction, getInteractions } = require('../controllers/interactionController');
const authenticateToken = require('../middlewares/authMiddleware');

const router = express.Router();

/**
 * @route POST /api/customers/:customerId/interactions
 * @desc Log an interaction for a customer
 * @access Authenticated Users
 */
router.post('/:customerId/interactions', authenticateToken, logInteraction);

/**
 * @route GET /api/customers/:customerId/interactions
 * @desc Get interactions for a customer
 * @access Authenticated Users
 */
router.get('/:customerId/interactions', authenticateToken, getInteractions);

module.exports = router;

/**
 * @swagger
 * /api/customers/{customerId}/interactions:
 *   post:
 *     summary: Log an interaction for a customer
 *     parameters:
 *       - in: path
 *         name: customerId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the customer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               note:
 *                 type: string
 *                 description: The interaction note
 *                 example: Followed up regarding their pending invoice.
 *     responses:
 *       201:
 *         description: Interaction logged successfully
 *
 *   get:
 *     summary: Retrieve interactions for a customer
 *     parameters:
 *       - in: path
 *         name: customerId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the customer
 *     responses:
 *       200:
 *         description: List of interactions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   note:
 *                     type: string
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                   user_name:
 *                     type: string
 */

