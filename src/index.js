const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const BookRepository = require("./repository/book-repository.js");
const CartItemRepository = require("./repository/cart_item-repository.js");
const sendEmail = require("./utils/mailer.js");
const { exec } = require("child_process");
const path = require("path");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/api", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/send_order_confirmation", async (req, res) => {
  try {
    console.log(req.body);
    const response = await sendEmail(req.body);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/books", async (req, res) => {
  try {
    const bookrepo = new BookRepository();
    const books = await bookrepo.getBooks();
    for (let i = books.length - 1; i > 0; i--) {
      // Generate a random index between 0 and i (inclusive)
      const j = Math.floor(Math.random() * (i + 1));
      // Swap elements array[i] and array[j]
      [books[i], books[j]] = [books[j], books[i]];
    }
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/cartitem", async (req, res) => {
  try {
    console.log(req.body);
    const cartitemrepo = new CartItemRepository();
    const cartitem = await cartitemrepo.CreateCartItems(req.body);

    res.status(200).json(cartitem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/cartitems/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const cartitemrepo = new CartItemRepository();
    const cartitem = await cartitemrepo.getCartItems(req.params.id);

    res.status(200).json(cartitem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/api/cartitem/:id", async (req, res) => {
  try {
    const cartitemrepo = new CartItemRepository();
    const cartitem = await cartitemrepo.destoryCartItem(req.params.id);

    res.status(200).json(cartitem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/books/year/:year", async (req, res) => {
  try {
    const bookrepo = new BookRepository();
    const books = await bookrepo.getByYear(req.params.year);
    res.status(200).json(books);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.get("/api/book/:id", async (req, res) => {
  try {
    const bookId = req.params.id;
    console.log(bookId);
    const bookrepo = new BookRepository();
    const book = await bookrepo.getBook(bookId);
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/books/:id", async (req, res) => {
  try {
    const bookId = req.params.id;
    console.log(bookId);
    const bookrepo = new BookRepository();
    const book = await bookrepo.getBook(bookId);
    const response = {
      book_id: book.book_id,
      title: book.title,
      price: book.price,
      posterurl: book.posterurl,
    };
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/search", async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).send({ error: 'Query parameter "q" is required' });
    }
    const bookrepo = new BookRepository();
    const books = await bookrepo.search(q);
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(3000, async () => {
  const command = "npx sequelize db:migrate";
  const options = {
    cwd: path.resolve(__dirname), // Set the current working directory to src
  };
  exec(command, options, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing npx command: ${error.message}`);
      return;
    }

    if (stderr) {
      console.error(`Error output: ${stderr}`);
      return;
    }

    console.log(`Command output: ${stdout}`);
  });
  console.log("Server is listening on port 3000");
});
