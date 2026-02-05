import https from 'https';

/**
 * Pings the server's own health endpoint to prevent Render from sleeping.
 * @param url The health endpoint URL to ping.
 */
export const startKeepAlive = (url: string) => {
  if (!url) {
    console.warn('Keep-alive: No URL provided, skipping pings.');
    return;
  }

  console.log(`Keep-alive: Started pings to ${url} every 10 minutes.`);

  setInterval(() => {
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        console.log(`Keep-alive: Ping successful (${new Date().toISOString()})`);
      } else {
        console.warn(`Keep-alive: Ping returned status ${res.statusCode} (${new Date().toISOString()})`);
      }
    }).on('error', (err) => {
      console.error(`Keep-alive: Ping failed - ${err.message} (${new Date().toISOString()})`);
    });
  }, 10 * 60 * 1000); // 10 minutes
};
