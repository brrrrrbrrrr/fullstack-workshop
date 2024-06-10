import app from './app.js';

const port = 5006;

app.listen(port, (err) => {
  if (err) {
    console.error('Something bad happened');
  } else {
    console.log(`Server is listening on port ${port} `);
  }
});
