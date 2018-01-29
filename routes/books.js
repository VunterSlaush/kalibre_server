const controller = require("../controllers/book");
const express = require("express");
const handler = require("../utils/ControllerHandler");
const router = express.Router();

/**
 * @swagger
 * /books:
 *   get:
 *     description: get the list of books
 *     tags:
 *      - Book
 *     parameters:
 *       - name: query
 *         description: the thing id to know who like it
 *         in:  query
 *         schema:
 *           type: string
 *       - $ref: "#/parameters/skip"
 *       - $ref: "#/parameters/limit"
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: list of Books
 *         type: array
 *         items:
 *            type: object
 *            properties:
 *              title:
 *                type: string
 *              donwloadLink:
 *                type: string
 *              cover:
 *                type: string
 *              author:
 *                type: array
 *                items:
 *                  type: string
 */
router.get(
  "/",
  handler(controller.find, (req, res, next) => [
    !req.query.query ? "" : req.query.query,
    !req.query.skip ? 0 : Number(req.query.skip),
    !req.query.limit ? 30 : Number(req.query.limit)
  ])
);

/**
 * @swagger
 * /books/{bookId}:
 *   get:
 *     description: get book by id
 *     tags:
 *      - Book
 *     parameters:
 *       - name: bookId
 *         description: the book id to find
 *         in:  path
 *         schema:
 *           		type: string
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: Book found
 *         schema:
 *             $ref: '#/definitions/Book'
 *       404:
 *         description: Book not found
 */
router.get(
  "/:book",
  handler(controller.findById, (req, res, next) => [req.params.book])
);

module.exports = router;
