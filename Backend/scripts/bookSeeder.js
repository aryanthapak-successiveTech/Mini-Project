const dotenv=require("dotenv")
const Book = require("../Models/BookModel");
const { default: mongoose } = require("mongoose");
const { faker } = require("@faker-js/faker");

dotenv.config();

const seedBooks = async (count = 20) => {

  await mongoose
    .connect(
     "mongodb://localhost:27017/QuickLib"
    )
    .then(() => console.log("db connected...."))
    .catch((err) => console.log(err));

  const books = [];

  for (let i = 0; i < count; i++) {
    books.push({
      name: faker.lorem.words(3),
      author: faker.person.fullName(),
      ISBN: faker.number.int({ min: 1000000000, max: 9999999999 }),
      description: faker.lorem.sentences(2),
      qty: faker.number.int({ min: 10, max: 30 }),
    });
  }

  await Book.insertMany(books);
  console.log(`✅ Inserted ${count} fake books`);

};

seedBooks(30)