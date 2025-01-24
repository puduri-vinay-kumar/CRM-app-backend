const db = require('../utils/db');

// Log an interaction for a customer
const logInteraction = async (req, res, next) => {
    try {
        const { customerId } = req.params;
        const { note } = req.body;
        const userId = req.user.id; // Extract user ID from the authenticated user

        if (!note) {
            return res.status(400).json({ success: false, message: 'Note is required' });
        }

        const query = `
            INSERT INTO customer_interactions (customer_id, user_id, note, created_at)
            VALUES (?, ?, ?, NOW())
        `;
        await db.query(query, [customerId, userId, note]);

        res.status(201).json({ success: true, message: 'Interaction logged successfully' });
    } catch (err) {
        next(err);
    }
};

// Retrieve interactions for a customer
const getInteractions = async (req, res, next) => {
    try {
        const { customerId } = req.params;

        const query = `
            SELECT ci.id, ci.note, ci.created_at, u.name AS user_name
            FROM customer_interactions ci
            INNER JOIN users u ON ci.user_id = u.id
            WHERE ci.customer_id = ?
            ORDER BY ci.created_at DESC
        `;
        const [interactions] = await db.query(query, [customerId]);

        res.status(200).json({ success: true, interactions });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    logInteraction,
    getInteractions,
};
