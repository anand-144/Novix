const multer = require('multer');
const storage = multer.memoryStorage(); // Store images in memory
const upload = multer({ storage });     // Allow multiple images if needed

module.exports = upload;
