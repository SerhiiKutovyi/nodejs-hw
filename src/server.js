import http from 'node:http';
import path from 'node:path';
import fs from 'node:fs/promises';

const carsPath = path.join(import.meta.dirname, '..', 'cars.json');
const carsJson = await fs.readFile(carsPath, 'utf-8');
const cars = JSON.parse(carsJson);

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/cars') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify(cars));
  }

  if (req.method === 'GET' && req.url.startsWith('/cars/')) {
    const carId = req.url.split('/')[2];
    const car = cars.find((car) => car.id === carId);

    if (!car) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify({ message: 'Car not found' }));
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify(car));
  }

  if (req.method === 'GET' && req.url === '/brands') {
    res.statusCode = 200;
    return res.end('all brands');
  }

  res.statusCode = 404;
  res.end('not found');
});

server.listen(3000, () => {
  console.log('Server is running on localhost: 3000');
});
