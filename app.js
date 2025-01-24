require('dotenv').config();
const express = require('express');
const { errorHandler } = require('./middlewares/errorMiddleware');
const { swaggerDocs, swaggerUi } = require('./utils/swagger');
const authRoutes = require('./routes/authRoutes');
const customerRoutes = require('./routes/customerRoutes');
const interactionRoutes = require('./routes/interactionRoutes');

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/customers', customerRoutes);


app.use('/api/customers', interactionRoutes);


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));



// Error handling middleware
app.use(errorHandler);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 



