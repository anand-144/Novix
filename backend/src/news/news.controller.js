const News = require("./news.model");

// Post a news article
const postANews = async (req, res) => {
    try {
        const { title, description, image1, image2, image3, image4 } = req.body;
        
        // Ensure all required fields are provided
        if (!title || !description || !image1 || !image2 || !image3 || !image4) {
            return res.status(400).send({ message: 'All fields are required.' });
        }

        const newNews = new News({
            title,
            description,
            image1,
            image2,
            image3,
            image4
        });

        await newNews.save();
        res.status(200).send({ message: "Article posted successfully", news: newNews });
    } catch (error) {
        console.error("Error creating news", error);
        res.status(500).send({ message: "Failed to create article" });
    }
};

// Get all news articles
const getAllNews = async (req, res) => {
    try {
        const newsList = await News.find().sort({ createdAt: -1 });
        res.status(200).send(newsList);
    } catch (error) {
        console.error("Error fetching news", error);
        res.status(500).send({ message: "Failed to get News" });
    }
};

// Get single news article by id
const getSingleNews = async (req, res) => {
    try {
        const { id } = req.params;
        const news = await News.findById(id);
        if (!news) {
            return res.status(404).send({ message: "News not found!" });
        }
        res.status(200).send(news);
    } catch (error) {
        console.error("Error fetching news", error);
        res.status(500).send({ message: "Failed to get News" });
    }
};

// Update a news article by id
const updateNews = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedNews = await News.findByIdAndUpdate(id, { ...req.body }, { new: true });
        if (!updatedNews) {
            return res.status(404).send({ message: "News not found!" });
        }
        res.status(200).send({ message: "News updated successfully", news: updatedNews });
    } catch (error) {
        console.error("Error updating news", error);
        res.status(500).send({ message: "Failed to update news" });
    }
};

// Delete a news article by id
const deletedNews = async (req, res) => {
    try {
        const { id } = req.params;
        const news = await News.findByIdAndDelete(id);
        if (!news) {
            return res.status(404).send({ message: "News not found!" });
        }
        res.status(200).send({ message: "News deleted successfully", news });
    } catch (error) {
        console.error("Error deleting news", error);
        res.status(500).send({ message: "Failed to delete News" });
    }
};

module.exports = { postANews, getAllNews, getSingleNews, updateNews, deletedNews };
