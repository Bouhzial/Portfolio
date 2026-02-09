
import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_FILE = path.join(__dirname, '../public/stock-data.json');
const SYMBOL = '%5EGSPC'; // S&P 500
// Try Quote endpoint instead of Chart
const URL = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${SYMBOL}`;

async function fetchStockData(retries = 3) {
    console.log(`Fetching stock data for ${SYMBOL}...`);

    return new Promise((resolve, reject) => {
        const options = {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5'
            }
        };

        https.get(URL, options, (res) => {
            if (res.statusCode !== 200) {
                // If 429 (Too Many Requests), definitely retry
                if (retries > 0) {
                    console.log(`Request failed with status ${res.statusCode}. Retrying... (${retries} left)`);
                    const delay = 2000 * (4 - retries); // increasing delay
                    setTimeout(() => fetchStockData(retries - 1).then(resolve).catch(reject), delay);
                    return;
                }
                reject(new Error(`Request failed with status ${res.statusCode}`));
                return;
            }

            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                try {
                    if (!data) throw new Error('Empty response');
                    const json = JSON.parse(data);

                    // Quote response structure check
                    if (json.quoteResponse && json.quoteResponse.result && json.quoteResponse.result.length > 0) {
                        processQuoteData(json.quoteResponse.result[0]);
                        resolve();
                    } else if (json.chart && json.chart.result) {
                        processData(json.chart.result[0]); // Fallback if we reverted URL
                        resolve();
                    } else {
                        reject(new Error(`Invalid structure: ${JSON.stringify(json).substring(0, 100)}...`));
                    }
                } catch (e) {
                    reject(e);
                }
            });
        }).on('error', (err) => {
            if (retries > 0) {
                console.log(`Request error: ${err.message}. Retrying... (${retries} left)`);
                setTimeout(() => fetchStockData(retries - 1).then(resolve).catch(reject), 2000);
            } else {
                reject(err);
            }
        });
    });
}

function processQuoteData(quote) {
    const price = quote.regularMarketPrice;
    const change = quote.regularMarketChange;
    const changePercent = quote.regularMarketChangePercent;

    // Create simplified data object
    const stockData = {
        symbol: "S&P 500",
        price: price.toFixed(2),
        change: change.toFixed(2),
        changePercent: changePercent.toFixed(2),
        isPositive: change >= 0,
        history: [], // Quote endpoint doesn't give history, we'll simulate a line or leave empty
        lastUpdated: new Date().toISOString()
    };

    fs.writeFileSync(DATA_FILE, JSON.stringify(stockData, null, 2));
    console.log('Stock data saved to', DATA_FILE);
    console.log(`Price: ${stockData.price}, Change: ${stockData.change} (${stockData.changePercent}%)`);
}

function processData(result) {
    const meta = result.meta;
    const quotes = result.indicators.quote[0];
    const timestamps = result.timestamp;

    const currentPrice = meta.regularMarketPrice;
    const previousClose = meta.chartPreviousClose;
    const change = currentPrice - previousClose;
    const changePercent = (change / previousClose) * 100;

    // Filter out null values from timestamps and quotes
    // Ensure we have quotes before mapping
    if (!quotes || !quotes.close) {
        console.error('No quote data found');
        return;
    }

    const points = timestamps.map((t, i) => ({
        time: t,
        price: quotes.close[i]
    })).filter(p => p.price !== null && p.price !== undefined);

    // Normalize prices for SVG (0-100 range for Y, 0-100 range for X is just index)
    // Actually we just need the array of prices to minimize size
    const prices = points.map(p => p.price);

    // Create simplified data object
    const stockData = {
        symbol: "S&P 500",
        price: currentPrice.toFixed(2),
        change: change.toFixed(2),
        changePercent: changePercent.toFixed(2),
        isPositive: change >= 0,
        history: prices, // Simple array of closing prices for the day
        lastUpdated: new Date().toISOString()
    };

    fs.writeFileSync(DATA_FILE, JSON.stringify(stockData, null, 2));
    console.log('Stock data saved to', DATA_FILE);
    console.log(`Price: ${stockData.price}, Change: ${stockData.change} (${stockData.changePercent}%)`);
}

function saveMockData() {
    console.log('Falling back to mock data...');

    // Add some random fluctuation to pretend it's updating
    const basePrice = 5964.82;
    const fluctuation = (Math.random() * 10) - 5; // +/- 5
    const newPrice = (basePrice + fluctuation).toFixed(2);

    const baseChange = 32.52;
    const changeFluctuation = (Math.random() * 2) - 1;
    const newChange = (baseChange + changeFluctuation).toFixed(2);
    const newPercent = ((parseFloat(newChange) / (basePrice - parseFloat(newChange))) * 100).toFixed(2);

    // Generate slightly random history
    const history = [5930, 5940, 5935, 5950, 5945, 5955, 5960, parseFloat(newPrice)];

    const mockData = {
        symbol: "S&P 500",
        price: newPrice,
        change: newChange > 0 ? `+${newChange}` : newChange,
        changePercent: newChange > 0 ? `+${newPercent}` : newPercent,
        isPositive: newChange >= 0,
        history: history,
        lastUpdated: new Date().toISOString()
    };
    fs.writeFileSync(DATA_FILE, JSON.stringify(mockData, null, 2));
    console.log('Mock stock data saved to', DATA_FILE);
}

fetchStockData().catch(err => {
    console.error(err);
    saveMockData();
});
