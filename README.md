# redis-node-caching
Caching data on Redis for better performance

## About
We used github API to store users information on cache. We can see on first request, it taking more time to get the data like 1.2s or 700ms. After we refresh the page or try to get the same data second time it takes less than 10ms.
This will reduce load on API when we try to retrieve same data every single time.

## Available script
You need to install Redis first on your computer. <br>
For windows download it from here https://github.com/dmajkic/redis/downloads <br>
redis-server.exe file should be running before you do the rest of the process below <br.
You can also view cached data on redis-cli.exe after you run redis-server.exe

### `npm i`
Installs node modules required for the project

### `npm start`
Starts the project
