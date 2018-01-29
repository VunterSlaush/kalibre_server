const ApiError = require("../utils/ApiError");
const { Author, Book, BookAuthor, sequelize } = require("../models");
const Sequelize = require("sequelize");
const Finder = require("fs-finder");
const EPub = require("epub");

const Op = Sequelize.Op;
async function find(query, skip, limit) {
  let books = await Book.findAll({
    raw: true,
    where: {
      title: {
        [Op.like]: "%" + query + "%"
      }
    }
  });
  await putAuthors(books);
  await putLinks(books);
  return books;
}

async function findById(id) {
  try {
    const book = await Book.findOne({ raw: true, where: { id: id } });
    const books = [book];
    await putAuthors(books);
    await putLinks(books);
    await putExtraInfo(books[0]);
    return books[0];
  } catch (e) {
    throw new ApiError("Book Not Found", 404);
  }
}

async function putAuthors(books) {
  for (var i in books) {
    const booksAuthor = await BookAuthor.findAll({
      where: { book: books[i].id }
    });
    books[i].authors = [];
    for (var j in booksAuthor) {
      const autor = await Author.findOne({
        where: { id: booksAuthor[j].author }
      });
      if (autor) books[i].authors.push(autor.name.trim());
    }
  }
}

function putLinks(books) {
  for (var i in books) {
    books[i].cover = `library/${books[i].path}/cover.jpg`;
    var files = Finder.from(`library/${books[i].path}`).findFiles("*.epub");
    const index = files[0].indexOf("library");
    const len = files[0].length;
    books[i].donwloadLink = files[0].substring(index, len);
    books[i].fullPath = files[0];
  }
}

function authorsString(authors) {
  let str = "";
  for (var i in authors) {
    str += authors;
  }
  return str.trim();
}

async function putExtraInfo(book) {
  return new Promise(function(resolve, reject) {
    var epub = new EPub(book.fullPath, "", "");
    epub.on("end", function() {
      book.subject = epub.metadata.subject;
      book.data = epub.metadata.date;
      book.description = epub.metadata.description;
      book.publisher = epub.metadata.publisher;
      delete book["fullPath"];
      resolve();
    });
    epub.parse();
  });
}

module.exports = { find, findById };
