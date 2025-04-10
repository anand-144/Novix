const express = require('express')
const app = express()
const mongoose = require('mongoose');
const cors = require("cors");
require('dotenv').config()
const port = process.env.PORT || 5000


// Middleware
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173'], // removed trailing slash
    credentials: true,
    optionsSuccessStatus: 200  // some legacy browsers choke on 204
}));

// Routes
const bookRoutes = require('./src/books/books.route')
const orderRoutes = require('./src/orders/order.route');
const userRoutes = require('./src/users/user.route');


app.use("/api/books", bookRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/auth', userRoutes);

async function main() {
    await mongoose.connect(process.env.DB_URL);
    app.use('/', (req, res) => {
        res.send('Novix server is running!')
    })
}

main().then(() => console.log("Mongodb connected successfully!")).catch(err => console.log(err));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
