const express = require('express');
const path = require('path');

const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use((req, res, next)=> {
  console.log(req.url);
  next();
});

/*
app.get('/assets/styles.css', (req, res, next)=> {
  res.sendFile(path.join(__dirname, 'assets/styles.css'));
});
*/

const products = [
  { id: 1, name: 'foo' },
  { id: 2, name: 'bar' },
  { id: 3, name: 'bazz' },
];

app.get('/', (req, res, next)=> {
  res.send(`
    <html>
      <head>
        <link rel='stylesheet' href='/assets/styles.css' />
      </head>
      <body>
        <nav>
          <a href='/' class='selected'>Home</a>
          <a href='/products'>Products</a>
          <a href='/contact'>Contact</a>
        </nav>
      </body>
    </html>
  `);
});

app.get('/products', (req, res, next)=> {
  res.send(`
    <html>
      <head>
        <link rel='stylesheet' href='/assets/styles.css' />
      </head>
      <body>
        <nav>
          <a href='/'>Home</a>
          <a href='/products' class='selected'>Products</a>
          <a href='/contact'>Contact</a>
        </nav>
        <ul>
        ${
          products.map( product => {
            return `<li>
              <a href='/products/${product.id}'>
              ${ product.name }
              </a>
            </li>`;
          }).join('')
        }
        </ul>
      </body>
    </html>
  `);
});

app.get('/products/:id', (req, res, next)=> {
  console.log(typeof req.params.id);
  res.send(`
    <html>
      <head>
        <link rel='stylesheet' href='/assets/styles.css' />
      </head>
      <body>
        <nav>
          <a href='/'>Home</a>
          <a href='/products' class='selected'>Products</a>
          <a href='/contact'>Contact</a>
        </nav>
        <ul>
        ${
          products.filter(product => product.id === req.params.id*1).map( product => {
            return `<li>
              <a href='/products'>
              ${ product.name }
              </a>
            </li>`;
          }).join('')
        }
        </ul>
      </body>
    </html>
  `);
});

app.get('/contact', (req, res, next)=> {
  res.send(`
    <html>
      <head>
        <link rel='stylesheet' href='/assets/styles.css' />
      </head>
      <body>
        <nav>
          <a href='/'>Home</a>
          <a href='/products'>Products</a>
          <a href='/contact' class='selected'>Contact</a>
        </nav>
      </body>
    </html>
  `);
});



const port = process.env.PORT || 3000;

app.listen(port, ()=> {
  console.log(`listening on port ${port}`);
});
