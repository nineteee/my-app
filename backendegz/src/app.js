const express = require('express');
const sequelize = require('./sequelize');
const AuthorRouter = require('./routes/authors');
const BookRouter = require('./routes/books');
const User = require('./models/user.js'); // authorize
const app = express();

app.use(express.json());

app.use('/authors', AuthorRouter);
app.use('/books', BookRouter);

app.listen(3000, () => {
  console.log("port 3000");


  sequelize.sync();
});
