// Format currency in INR
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount || 0);
};

// Calculate discount percentage
export const calculateDiscount = (price, originalPrice) => {
  if (!originalPrice || originalPrice <= price) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
};

// Safely open external Flipkart links
export const handleFlipkartRedirect = (url) => {
  if (!url || url.trim() === "") {
    alert("This product currently does not have an active Flipkart link assigned by the admin.");
    return;
  }
  
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    alert("Invalid URL format detected.");
    return;
  }

  window.open(url, "_blank", "noopener,noreferrer");
};