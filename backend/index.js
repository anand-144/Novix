const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require("cors");
require('dotenv').config();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173' , 'https://novix-one.vercel.app'],
    credentials: true,
    optionsSuccessStatus: 200
}));

// Routes
const bookRoutes = require('./src/books/books.route');
const orderRoutes = require('./src/orders/order.route');
const userRoutes = require('./src/users/user.route');
const adminRoutes = require('./src/stats/admin.stats');

app.use("/api/books", bookRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/admin', adminRoutes);

async function main() {
    await mongoose.connect(process.env.DB_URL);
    app.use('/', (req, res) => {
        res.send('Novix server is running!')
    });
}

main().then(() => console.log("Mongodb connected successfully!")).catch(err => console.log(err));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
