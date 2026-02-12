const fs = require("fs");
const path = require("path");

const src = path.join(__dirname, "..", "Images");
const dest = path.join(__dirname, "..", "public", "Images");

if (!fs.existsSync(src)) {
  console.warn("Images folder not found at", src);
  process.exit(0);
}

if (!fs.existsSync(dest)) {
  fs.mkdirSync(dest, { recursive: true });
}

const files = fs.readdirSync(src).filter((f) => /\.(jpe?g|png|webp|gif)$/i.test(f));
files.forEach((file) => {
  fs.copyFileSync(path.join(src, file), path.join(dest, file));
});
console.log("Copied", files.length, "images to public/Images");
