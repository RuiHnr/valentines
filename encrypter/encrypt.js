import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import CryptoJS from 'crypto-js';

// Fix for __dirname in ES Modules (it doesn't exist by default)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Config
const PASSWORD = process.argv[2];
const DIST_DIR = path.join(__dirname, '../dist');
const TEMPLATE_FILE = path.join(__dirname, 'lock.html');
const JS_SRC_FILE = path.join(__dirname, 'lock.js');
const CSS_SRC_FILE = path.join(__dirname, 'lock.css');

if (!PASSWORD) {
    console.error("Error: no password provided.");
    console.error("Usage: node encrypter/encrypt.js <PASSWORD>");
    process.exit(1);
}

// 1. Encrypt logic
try {
    const appHtml = fs.readFileSync(path.join(DIST_DIR, 'index.html'), 'utf8');
    const encryptedParams = CryptoJS.AES.encrypt(appHtml, PASSWORD).toString();

    // 2. Inject into lock template
    // FIXED BUG: changed readFile (async) to readFileSync (sync)
    let templateHtml = fs.readFileSync(TEMPLATE_FILE, 'utf8');
    templateHtml = templateHtml.replace('__ENCRYPTED_PAYLOAD__', encryptedParams);

    // 3. Write to index.html
    fs.writeFileSync(path.join(DIST_DIR, 'index.html'), templateHtml);

    // 4. Copy assets
    fs.copyFileSync(JS_SRC_FILE, path.join(DIST_DIR, 'lock.js'));
    console.log("Copied lock.js to dist/");

    fs.copyFileSync(CSS_SRC_FILE, path.join(DIST_DIR, 'lock.css'));
    console.log("Copied lock.css to dist/");

    fs.copyFileSync(path.join(__dirname, 'crypto-js.min.js'), path.join(DIST_DIR, 'crypto-js.min.js'));
    console.log("Site is secured and ready!");

} catch (error) {
    console.error("Build failed:", error.message);
    process.exit(1);
}