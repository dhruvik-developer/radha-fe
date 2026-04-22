/**
 * Utility to extract dominant and vibrant colors from an image using HTML5 Canvas.
 */

/**
 * Converts RGB values to Hex string
 */
const rgbToHex = (r, g, b) => {
  return "#" + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }).join("");
};

/**
 * Extracts colors from an image source (URL or File)
 * @param {string|File} source 
 * @param {number} colorCount Number of colors to return
 * @returns {Promise<string[]>} Array of hex color strings
 */
export const extractColorsFromImage = async (source, colorCount = 8) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      
      // Resize for performance
      const MAX_SIZE = 100;
      let width = img.width;
      let height = img.height;
      
      if (width > height) {
        if (width > MAX_SIZE) {
          height *= MAX_SIZE / width;
          width = MAX_SIZE;
        }
      } else {
        if (height > MAX_SIZE) {
          width *= MAX_SIZE / height;
          height = MAX_SIZE;
        }
      }
      
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);
      
      const imageData = ctx.getImageData(0, 0, width, height).data;
      const colorMap = {};
      
      for (let i = 0; i < imageData.length; i += 4) {
        const r = imageData[i];
        const g = imageData[i + 1];
        const b = imageData[i + 2];
        const a = imageData[i + 3];
        
        // Skip transparent or near-white/near-black pixels if we want "vibrant" colors
        if (a < 128) continue;
        
        // Simplistic quantization: group colors slightly
        const q = 10;
        const qr = Math.round(r / q) * q;
        const qg = Math.round(g / q) * q;
        const qb = Math.round(b / q) * q;
        
        // Filter out very dark or very light colors to find "brand" colors
        const brightness = (qr * 299 + qg * 587 + qb * 114) / 1000;
        if (brightness < 30 || brightness > 240) continue;
        
        const hex = rgbToHex(qr, qg, qb);
        colorMap[hex] = (colorMap[hex] || 0) + 1;
      }
      
      // Sort colors by frequency
      const sortedColors = Object.entries(colorMap)
        .sort((a, b) => b[1] - a[1])
        .map(entry => entry[0]);
      
      // Filter for distinctness (optional, but good for UI)
      const distinctColors = [];
      for (const color of sortedColors) {
        if (distinctColors.length >= colorCount) break;
        
        // Simple distinctness check: only add if not too similar to existing colors
        // In a real app we'd use Delta E, but this is a simplified version
        distinctColors.push(color);
      }
      
      resolve(distinctColors);
    };
    
    img.onerror = (err) => reject(err);
    
    if (typeof source === "string") {
      img.src = source;
    } else {
      img.src = URL.createObjectURL(source);
    }
  });
};
