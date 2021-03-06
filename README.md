## A Node JS + Express + MongoDB API App

This is a simple app that exposes a books database collection as an API that supports the below:
1. GET /books endpoint to return an array of all books. Pagination is supported by adding a GET param *page* e.g. /books?page=1
2. GET /books/\<id\> endpoint that returns the specific book with an id of \<id\>
3. POST /books to add a single book JSON object.
4. DELETE /books/\<id\> to delete a single book.
5. PUT /books/\<id\> to update a single book.

Requirements to Run on Your Local Machine
-----------------------------------------
1. MongoDB server locallly installed.
2. NodeJS version 14 and higher.
3. Access to a terminal to execute commands.

## Setup Instructions

1. clone the repo and cd to the project root via a terminal window e.g. powershell or bash
2. Import the books.json file to your mongodb server.
3. run *npm install* to install dependencies
4. run *node app.js* to start the server
5. access from your browser via http://localhost:9000/books

### License & Copyright
MIT

© 2022 - David Syengo. All rights reserved. Sho Nuff.