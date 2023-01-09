const Buffer = require('buffer').Buffer;
const https = require('https');
const fs = require('fs');

// Set the API key and project ID
const apiKey = 'qrqDffs9_AGLk41AVlA9_ztLo-dc913x';

// Set the base URL for the API
const baseUrl = 'https://localise.biz/api/export';

// Set the list of locales that you want to download
const locales = ['fr', 'en'];

// Iterate over the list of locales
locales.forEach(locale => {
  // Set the URL for the API call
  const url = `${baseUrl}/locale/${locale}.json`;

  // Set the headers for the API call
  const headers = {
    Authorization: `Loco ${apiKey}`,
  };

  // Call the API
  console.error(`Call: ${url}`);
  console.error(`Call: ${JSON.stringify(headers)}`);
  https
    .get(url, {headers}, response => {
      // If the response is successful (status code 200)
      if (response.statusCode === 200) {
        // Create a buffer to hold the data
        const buffer = [];

        // When data is received, add it to the buffer
        response.on('data', chunk => {
          buffer.push(chunk);
        });

        // When the response is complete, parse the data and save it to a file
        response.on('end', () => {
          const data = JSON.parse(Buffer.concat(buffer));
          fs.writeFile(
            `./src/assets/locales/${locale}.json`,
            JSON.stringify(data),
            err => {
              if (err) {
                console.error(err);
              }
            },
          );
        });
      } else {
        // If the response is not successful, print an error message
        console.error(`Error: ${response.statusCode}`);
      }
    })
    .on('error', err => {
      console.error(err);
    });
});
