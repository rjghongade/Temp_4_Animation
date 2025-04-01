import QRCode from 'qrcode';

const shortenURL = async (longUrl) => {
  try {
    const response = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`);
    return await response.text(); // Returns the shortened URL
  } catch (error) {
    console.error("Error shortening URL:", error);
    return longUrl; // If shortening fails, return the original URL
  }
};

export const generateQRCode = async (text) => {
  try {
    if (!text) throw new Error("No text provided for QR Code");

    // First, shorten the URL
    const shortUrl = await shortenURL(text);

    console.log("Generating QR Code for:", shortUrl);

    const qrCode = await QRCode.toDataURL(shortUrl, {
      errorCorrectionLevel: 'H',
      type: 'image/png',
      scale: 10,
      margin: 2,
      version: 10
    });

    return qrCode;
  } catch (err) {
    console.error("Error generating QR code:", err);
    return null;
  }
};
