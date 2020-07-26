const express = require('express');
const fetch = require('node-fetch');
const redis = require('redis');

const PORT = process.env.PORT || 5000;
const REDIS_PORT = process.env.REDIS_PORT || 6379;

const client = redis.createClient(REDIS_PORT);

const app = express();

const setResponse = (username, repos) => {
  return `<h2>${username} has ${repos} pubic repos on github</h2>`;
};

// Cache middleware
const cache = (req, res, next) => {
  const { username } = req.params;
  client.get(username, (err, data) => {
    if (err) throw err;
    if (data !== null) {
      res.send(setResponse(username, data));
    } else {
      next();
    }
  });
};

app.get('/repos/:username', cache, async (req, res, next) => {
  // Make request to git hub for data
  try {
    console.log('fetching data...');
    const { username } = req.params;
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();

    // Getting total number of public repos
    const repos = data.public_repos;

    // Set data to Redis
    client.setex(username, 3600, repos);

    // Print Username and data
    res.send(setResponse(username, repos));
  } catch (err) {
    console.error(err);
    res.status(500);
  }
});

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
