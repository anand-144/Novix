export const getImgUrl = (imagePath) => {
    const cloudinaryBaseUrl = "https://res.cloudinary.com/dxunfwkpp/image/upload/";
    
    // If the imagePath is missing, log a warning and return a default fallback image
    if (!imagePath) {
      console.warn("No image path provided. Using fallback image.");
      return "/default-image.png"; // Ensure this file exists in your public folder
    }
    
    return `${cloudinaryBaseUrl}${imagePath}`;
  };
  