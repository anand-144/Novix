const express = require('express')
const app = express()
const mongoose = require('mongoose');

const cors = require("cors");

require('dotenv').config()
const port = process.env.PORT || 5000


//middleware

app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173/'],
    credentials: true
}))


//routes
const bookRoutes = require('./src/books/books.route')
app.use("/api/books", bookRoutes)

async function main() {
    await mongoose.connect(process.env.DB_URL);
    app.use('/', (req, res) => {
        res.send('Novix server is running!')
    })
}

main().then(() => console.log("Mongodb connected succesfully!")).catch(err => console.log(err));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})