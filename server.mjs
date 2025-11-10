// server.js
import express from "express";
import puppeteer from "puppeteer";

const app = express();

const PORT = 3000; // Use environment variable or default to 3000
const REFURBISHED_STEAM_DECK_URL =
  "https://store.steampowered.com/sale/steamdeckrefurbished/";

// Define a simple route for the root URL
app.get("/", async (req, res) => {
  // Launch the browser and open a new blank page.
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate the page to a URL.
  await page.goto(REFURBISHED_STEAM_DECK_URL);
  await page.waitForSelector(".CartBtn", {timeout: 5000});

  // Set screen size.
  await page.setViewport({width: 1080, height: 1024});

  const textContents = await page.$$eval(".CartBtn", (cartBtns) =>
    cartBtns.map((cartBtn) => cartBtn.textContent.trim())
  );

  const isProductAvailable = textContents.some(
    (textContent) => textContent !== "Out of stock"
  );

  // Print the full title.
  console.log("isProductAvailable", isProductAvailable);
  res.json({isProductAvailable});
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
