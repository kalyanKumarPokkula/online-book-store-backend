const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const BookRepository = require("./repository/book-repository.js");
const CartItemRepository = require("./repository/cart_item-repository.js");
const sendEmail = require("./utils/mailer.js");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/send_order_confirmation", async (req, res) => {
  try {
    console.log(req.body);
    const response = await sendEmail(req.body);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/books", async (req, res) => {
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

app.post("/cartitem", async (req, res) => {
  try {
    console.log(req.body);
    const cartitemrepo = new CartItemRepository();
    const cartitem = await cartitemrepo.CreateCartItems(req.body);

    res.status(200).json(cartitem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/cartitems/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const cartitemrepo = new CartItemRepository();
    const cartitem = await cartitemrepo.getCartItems(req.params.id);

    res.status(200).json(cartitem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/cartitem/:id", async (req, res) => {
  try {
    const cartitemrepo = new CartItemRepository();
    const cartitem = await cartitemrepo.destoryCartItem(req.params.id);

    res.status(200).json(cartitem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/books/year/:year", async (req, res) => {
  try {
    const bookrepo = new BookRepository();
    const books = await bookrepo.getByYear(req.params.year);
    res.status(200).json(books);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.get("/book/:id", async (req, res) => {
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

app.listen(3000, async () => {
  console.log("Server is listening on port 3000");
});
