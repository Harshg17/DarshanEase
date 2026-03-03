const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// 1. MIDDLEWARE (Must be before routes)
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// 2. ROUTES
const authRoutes = require('./routes/authRoutes');
const templeRoutes = require('./routes/templeRoutes');
const slotRoutes = require('./routes/slotRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/temples', templeRoutes);
app.use('/api/slots', slotRoutes);
app.use('/api/bookings', require('./routes/bookingRoutes'));

app.get('/', (req, res) => res.send('API is running...'));

// 3. DATABASE & SERVER START
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('✅ MongoDB Connected');
        app.listen(PORT, () => console.log(`🚀 Server on port ${PORT}`));
    })
    .catch(err => console.log('❌ DB Error:', err));