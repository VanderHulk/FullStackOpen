# Part 3: Node.js and Express

**Disclaimer:** This project is not my original work. I am recreating it for learning purposes only.

## Steps:
1. Create simple web server with Node.js

    ```javascript
    // CommonJS module import
    const http = require('http') 
    const { json } = require('stream/consumers')

    // create a new web server
    const app = http.createServer((request, response) => {
        response.writeHead(200, { 'Content-Type': 'application/json' })
        response.end(JSON.stringify(notes))
    })
    ```

2. Create web server with Express

## Notes:
1. Only the parts of the URL you define with ':' appear in request.params

    Example: '/api/notes/:id'
2. JSON-parser app.use(express.json()) - takes JSON data of a request and transforms it into a JS object and then attaches it to the body property of the request object before the route handler is called.

3. Function declarations (hoisted) which means you can call it before it appears in the code
    function generateID() { ... }
    - good for utility functions you want available in the file
   Function expressions / Arrow functions (not hoisted)
    const generateID = () => { ... }
    - often use for callbacks, inline logic, or functions tied to variables
    - explicit, you know exactly where it starts existing in the code

4. Custom middleware
    **Middleware** is a code that runs in the middle of a request and a response. They are like "HELPERS." When a client sends a request to the server, it does not go straight to the route handler. It passes through one or more middleware functions first, which can:

    - Look at the request
    - Change it if needed
    - Do extra stuff(logging, authentication, parsing)
    - Decide whether to continue to the next middleware or stop the request          

    ```javascript
    // custom middleware
    const requestLogger = (request, response, next) => {
        console.log('Method:', request.method)
        console.log('Path:  ', request.path)
        console.log('Body:  ', request.body)
        console.log('---')
        next()
    }

    app.use(requestLogger)
    ```

    Calling next() tells Express to continue to the next middleware or route handler. If it is not called, the client waits forever.

    **Route Handler**, the function that finishes the request and sends a response to the client.

    ```javascript
    app.post('/api/persons', (req, res) => {
        // this is a route handler for POST requests
        const newPerson = req.body
        persons.push(newPerson)
        res.status(201).json(newPerson)
    })
    ```

    Roles of a route handler:
    - Receives the request object (request)
    - Sends back a response (response)
    - Can access query parameters, route parameters, headers, body, etc.
    - Can call other middleware if needed, via next() (less common in route handlers)

    Key points to remember about Middleware
    1. It runs in the order you register it.
    2. It can modify the request or response before it reaches the route.
    3. It must call next() to let the request continue.
    4. Route handler is the last stop - it sends the actual response.


## Notes: mongoDB Atlas
1. Mongo are **schemaless**, meaning that the database itself does not care about the structure of the data that is stored in the database.
    *A schema defines the shape of the documents stored in any given collection*
    ```javascript
    const noteSchema = new mongoose.Schema({
        content: String,
        important: Boolean,
    })
    ```
2. ```javascript
    const Note = mongoose.model('Note', noteSchema)
    ```
    - 'Note' parameter is the singular name of the model
    - Mongoose automatically looks for a collection named notes in MongoDB (lowercase + plural)
    - if it does not exist, MongoDb will create it the first time you insert a document
    - Mongoose handles the pluralization internally so now there is a 'notes' collection
    - However if you would like to have a custom name, you could do this ('Note', noteSchema, 'customNameCollection')
---
# Part 4: Testing the Backend

## dotenv Library for defining environment variables
1. `npm install dotenv`
2. create .env directory at the root of the project directory
3. define the environment variables inside .env file
    - add the database password in the URI
4. add .env to .gitignore
5. import before the database module
    `require('dotenv').config()`

## Refactor project structure
The application was refactored into separate modules based on responsibility:
```
    ├── controllers   # request handling and route logic  
    │   └── notes.js  
    ├── models        # database schemas and data access  
    │   └── note.js  
    ├── utils         # shared utilities (config, logging, middleware)  
    │   ├── config.js  
    │   ├── logger.js  
    │   └── middleware.js  
    ├── app.js        # Express app configuration and route binding  
    ├── index.js      # application entry point (starts the server)  
    ├── dist          # frontend build
    ├── package.json
```
This structure improves maintainability and enables easier testing by separating the application setup from the server startup.

## Testing:
1. Define the execution mode of the application with NODE_ENV environment variable in package.json
```javascript
    "start": "cross-env NODE_ENV=production node index.js",
    "dev": "cross-env NODE_ENV=development node --watch index.js",
    "test": "cross-env NODE_ENV=test node --test",
```
NODE_ENV gets the value test and goes staright into process.env. Why cross-env? It is for environment awareness because operating systems behave differently. With WINDOWS install cross-env `npm install cross-env` and use cross-env library in npm scripts defined in package.json.

2. Use separate database for every test execution or use a database that is installed or running on the developer's local machine. There are many ways.

3. Refactor utils/config.js to
```javascript
  const MONGODB_URI = process.env.NODE_ENV === 'test' 
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI
```

4. Set separate variables in .env file for testing and for development

##  supertest
1. Install super test `npm install --save-dev supertest`

## testMongo.js: manual DB connection/interaction testing
- connects to MongoDB
- creates or reads documents

## tests/note_api.test.js: Automated testing
Ways to run tests:
1. `only` method

   `test.only('all notes are returned', async () => {...`
   `npm test -- --test-only`
   Only the `only` marked tests are executed
   
   CON: one forgets to remove `only` from the code
2. Runs the tests found in the tests/note_api.test.js file
   `npm test -- tests/note_api.test.js`
3. --test-name-pattern can be used for running tests with a specific name
   `npm test -- --test-name-pattern="a specific note is within the returned notes"`
   The provided argument can refer to the name of the test or the describe block. It can also contain just a part of the name. 
   
   Example: `npm run test -- --test-name-pattern="notes"`
   
   That command willrun all of the tests that contain notes in their name.

## Points to remember:
- Tests do use the *real route handlers* but without the real network.

  When there is this 
    ```javascript
      const app = require('../app')
      const api = supertest(app)
    ```
  The Express app is plug into a "fake HTTP client." NO real network request!
  ```
  supertest
     ↓
  Express app (app.js)
     ↓
  Router (/api/notes)
     ↓
  controllers/notes.js
     ↓
  Mongoose / MongoDB
     ↓
  Response returned to test
  ```

  supertest calls the app directly in memory. supertest becomes the HTTP client.

- strictEqual uses Object.is (compares objects by `reference`, not by shape or content)
  *Reference means memory location*
- deepStrictEqual checks if two values have the same structure, values, and types but NOT the same reference

## async/await
- it just makes errors look like normal throws `throw new Error(...)` but you still need to catch or pass them using try/catch
  - *normal throws* behaves like a regular JavaScript error
  - if you don't catch it, execution stops immediately, express doesn't automatically handle it, app may return 500 or behave unpredictably
- something is wrong?
  ```javascript
  helper.initialNotes.forEach(async (note) => {
    let noteObject = new Note(note)
    await noteObject.save()
  })
  ```
  - forEach starts looping immediately
  - forEach note it calls the async function, that function returns a Promise but...
    - does NOT collect those promises
    - does NOT await them
  ..so beforeEach finishes instantly and tests continue before there is data in the database
  
  **Solution:**
  ```javascript
  const noteObjects = helper.initialNotes
    .map(note => new Note(note))
  const promiseArray = noteObjects.map(note => note.save())
  await Promise.all(promiseArray)
  ```
  
  **Simpler way:**
  ```javascript
  await Note.insertMany(helper.initialNotes)
  ```

  **Remember:**
  `Async work inside loops WITHOUT proper waiting (forEach does not await promises)`

**Why is there no try/catch in this app?**
- because error handling is centralized using Express error-handling middleware
- route handlers are kept clean by delegating errors to next(error)

  **Example of route handlers:**
  - app.get('/notes', handler)
  - app.post('/notes', handler)
  - app.delete('/notes/:id', handler)
- errorHandler middleware handles known errors (e.g. CastError, ValidationError) and sends proper HTTP responses
- unknown errors are passed forward using next(error) or handled by Express default error handling
- async errors must still be properly forwarded to this middleware

**node:test**

`assert`
- .strictEqual(), are EXACTLY the same value using ===

  example:
  - assert.strictEqual(5, '5') fails 5 !== '5'

- .notStrictEqual(), NOT EXACTLY equal

  example:
  - assert.notStrictEqual(blog.id, undefined) passes if blog.id exists

- .deepStrictEqual(), have the same CONTENT and STRUCTURE (keys, values, nested structure, types) good for arrays & objects

  example:
  - { name: 'Shaula' } === { name: 'Shaula' } fails because objects compare by REFERENCE not content

  **Token Authentication**
  JWT JsonWebToken
  ```javascript
  const token = jwt.sign(
    userForToken, // 1
    process.env.SECRET, // 2
    { expiresIn: 60*60 } // 3
  )
  ```
  Gives user:
  1. payload/data stored inside the token, it also includes the validity period
     ```javascript
     const userForToken = {
       username: user.username,
       id: user._id,
     }
     ```
  2. the secret signing key, used to digitally sign the token so nobody can forge it
  3. token validity

  What does it actually return?
  A long JWT encoded string. Three parts separated by dots HEADER.PAYLOAD.SIGNATURE

  **New App Flow:**
  ```
  Client logs in
      ↓
  Server gives JWT token
      ↓
  Client stores token
      ↓
  Client sends:
  Authorization: Bearer <token>
      ↓
  Server verifies token
      ↓
  Server extracts user identity from token
      ↓
  Authenticated action allowed
  ```
---
# Part 5: Login in frontend

1. Added `tokenExtractor` and `userExtractor` middleware  
   - Extracts JWT from `Authorization` header  
   - Verifies token and attaches logged-in user to `request.user`  
   - Enables protected routes (e.g. creating and deleting notes)

2. Refactored login route  
   - Returns `token`, `username`, `name`, and `user._id`  
   - Frontend uses `user._id` for ownership-based UI logic