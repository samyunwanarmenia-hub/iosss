import fs from "fs";
import path from "path";
import sharp from "sharp";
import { IMAGE_OPTIMIZED_WIDTHS } from '../src/config/imageConfig.js'; // Import centralized widths

const inputDir = "public/images"; // Source of original images
const outputDir = "public/optimized"; // Destination for optimized images

async function optimizeImages() {
  console.log("Starting image optimization...");
  try {
    if (!fs.existsSync(inputDir)) {
      console.log(`Input directory not found: ${inputDir}. Skipping optimization.`);
      return; // Exit if no images to process
    }

    if (!fs.existsSync(outputDir)) {
      console.log(`Creating output directory: ${outputDir}`);
      fs.mkdirSync(outputDir, { recursive: true });
    } else {
      console.log(`Output directory already exists: ${outputDir}`);
    }

    const files = fs.readdirSync(inputDir);
    if (files.length === 0) {
      console.log(`No images found in ${inputDir}. Skipping optimization.`);
      return;
    }
    console.log(`Found ${files.length} files in ${inputDir}`);

    const sizes = IMAGE_OPTIMIZED_WIDTHS; // Use centralized widths

    for (const file of files) {
      const filePath = path.join(inputDir, file);
      const ext = path.extname(file).toLowerCase();
      const baseName = path.basename(file, ext);
      
      if (![".jpg", ".jpeg", ".png"].includes(ext)) {
        console.log(`Skipping non-image file: ${file}`);
        continue;
      }

      console.log(`🔄 Optimizing: ${file}`);
      try {
        const image = sharp(filePath);
        
        for (const size of sizes) {
          // The `withoutEnlargement: true` option prevents upscaling, so the explicit width check is not needed and was causing issues.
          const resizedImage = image.clone().resize({ width: size, withoutEnlargement: true });

          // Define paths for optimized versions for each size
          const optimizedJpgPath = path.join(outputDir, `${baseName}-${size}w.jpg`);
          const webpPath = path.join(outputDir, `${baseName}-${size}w.webp`);
          const avifPath = path.join(outputDir, `${baseName}-${size}w.avif`);

          // Save as JPG
          await resizedImage
            .jpeg({ quality: 85 })
            .toFile(optimizedJpgPath);

          // Convert to WebP
          await resizedImage
            .webp({ quality: 80 })
            .toFile(webpPath);

          // Convert to AVIF
          await resizedImage
            .avif({ quality: 70 })
            .toFile(avifPath);
        }
        console.log(`✅ Optimized ${file} into multiple sizes.`);

      } catch (fileError) {
        console.error(`❌ Error optimizing ${file}:`, fileError);
      }
    }
    console.log("✅ All images optimized!");
  } catch (mainError) {
    console.error("💥 An error occurred during image optimization:", mainError);
    process.exit(1);
  }
}

optimizeImages().catch(error => {
  console.error("Unhandled error in optimizeImages:", error);
  process.exit(1);
});