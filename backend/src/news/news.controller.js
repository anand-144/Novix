const News = require("./news.model");

// Post a news article
const postANews = async (req, res) => {
    try {
        // Create new news article using the News model
        const newNews = new News({ ...req.body });
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
        // Retrieve all news articles and sort them in descending order by creation date
        const newsList = await News.find().sort({ createdAt: -1 });
        res.status(200).send(newsList);
    } catch (error) {
        console.error("Error fetching news", error);
        res.status(500).send({ message: "Failed to get News" });
    }
};

// Get single news article by ID
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

// Delete a news article by ID
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

module.exports = { postANews, getAllNews, getSingleNews, deletedNews };
