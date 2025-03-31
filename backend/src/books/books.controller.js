const Book = require("./books.model");

const postABook = async (req , res) => {
    try {
        const newBook = await Book({...req.body});
        await newBook.save();
        res.status(200).send({message : "Book posted successfully" , book: newBook})
    } catch (error) {
        console.error("Error creating book" , error);
        res.status(500).send({message : "Failed to create book"})
    }   
}

//get all books
const getAllBooks = async (req, res) => {
    try {

        const books = await Book.find().sort({createdAt : -1});
        res.status(200).send(books)

    }catch (error) {
        console.error("Error Fetching Book", error);
        res.status(500).send({message : "Failed to get book"})
    }
}

// get single book
const getSingleBook = async (req , res) => {
    try {
        const {id} = req.params 
        const book = await Book.findById(id)
        if(!book) {
            res.status(404).send({message : "Book not found!"})
        }
        res.status(200).send(book)

    }catch (error) {
        console.error("Error Fetching Book", error);
        res.status(500).send({message : "Failed to get book"})
    }
}


//update Book

const UpdateBook = async (req , res) => {
    try {
        const {id} = req.params;
        const updateBook = await Book.findByIdAndUpdate(id, req.body, {new: true});
        if(!updateBook){
            res.status(404).send({message : "Book not found!"})
        }
        res.status(200).send({
            message: "Book updated Successfully",
            book: updateBook
        })
    } catch (error) {
        console.error("Error Updating Book", error);
        res.status(500).send({message : "Failed to update book"})
    }
}

//deletedBook

const deletedBook = async (req , res) => {
    try { 
        const {id} = req.params;
        const deletedBook  = await Book.findByIdAndDelete(id);
        if(!deletedBook) {
            res.status(404).send({message : "Book is not found!"})
        }
        res.status(200).send({
            message: "Book deleted Successfully",
            book: deletedBook
        })
    } catch (error) {
        console.error("Error deleting Book", error);
        res.status(500).send({message : "Failed to delete book"})
    }
};

module.exports = {
    postABook,
    getAllBooks,
    getSingleBook,
    UpdateBook,
    deletedBook,
}