# Part 3: Node.js and Express

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
