const express  = require('express');
const Book = require('./books.model');
const { postABook, getAllBooks, getSingleBook, UpdateBook, deletedBook , } = require('./books.controller');
const verifyAdminToken = require('../middleware/verfiyAdminToken');
const router = express.Router()

//post a book
router.post("/create-book" , verifyAdminToken,  postABook)

//get all books
router.get("/" , getAllBooks)

//single book endpoint
router.get("/:id" , getSingleBook)

//update Book
router.put("/edit/:id" , verifyAdminToken ,UpdateBook)

//Delete Book
router.delete("/:id" , verifyAdminToken ,  deletedBook)

module.exports = router;