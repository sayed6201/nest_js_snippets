===================================================================
/*
    1) middleware takes three parameters req, res, and next
        * next() will call next middleware.
        * 
*/
===================================================================
const express = require('express')
const app = express()

app.use(loggingMiddleware)

app.get('/', (req, res) => {
  res.send('Home Page')
})

app.get('/users', authorizeUsersAccess, (req, res) => {
  console.log(req.admin)
  res.send('Users Page')
})


//this is a middleware . 
//but will not get executed if you don't add it in app.use() or app.get('/route', middleWare, (req, res)=>{})
function loggingMiddleware(req, res, next) {
  console.log(`${new Date().toISOString()}: ${req.originalUrl}`)
  next()
}


//this is a middleware . 
//but will not get executed if you don't add it in app.use() or app.get('/route', middleWare, (req, res)=>{})
function authorizeUsersAccess(req, res, next) {
  if (req.query.admin === 'true') {
    req.admin = true
    next()
  } else {
    res.send('ERROR: You must be an admin')
  }
}

app.listen(3000, () => console.log('Server Started'))
This code sets an admin variable



===================================================================
//Calling next Is Not The Same As Calling return
===================================================================
function middleware(req, res, next) {
    if (req.valid) {
        //if you dont call return , this will try to execute res.send()
        //it will through an error
      return next()
    }
    res.send('Invalid Request')
  }

// -------------------------------------------------------
    //next() does not end the function
// -------------------------------------------------------
const express = require('express')
const app = express()

app.get('/', middleware, (req, res) => {
  console.log('Inside Home Page')
  res.send('Home Page')
})

function middleware(req, res, next) {
  console.log('Before Next')
  next()
  console.log('After Next')
}

app.listen(3000, () => console.log('Server Started'))

        //result:::
            // Before Next
            // Inside Home Page
            // After Next


===================================================================
// Middleware Will Execute In Order            
===================================================================
const express = require('express')
const app = express()

app.use(middlewareThree)
app.use(middlewareOne)

app.get('/', middlewareTwo, middlewareFour, (req, res) => {
  console.log('Inside Home Page')
  res.send('Home Page')
})

function middlewareOne(req, res, next) {
  console.log('Middleware One')
  next()
}

function middlewareTwo(req, res, next) {
  console.log('Middleware Two')
  next()
}

function middlewareThree(req, res, next) {
  console.log('Middleware Three')
  next()
}

function middlewareFour(req, res, next) {
  console.log('Middleware Four')
  next()
}

app.listen(3000, () => console.log('Server Started'))

    // Result: 
    //     Middleware Three
    //     Middleware One
    //     Middleware Two
    //     Middleware Four