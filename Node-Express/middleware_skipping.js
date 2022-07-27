//you can skip middle ware by following techniques ....

const funcOne = (req, res, next) => {
    // do something
    if (/* you were successful */) {
      res.locals.shouldSkipFuncTwo = true
    }
    next()
  }
  
  const funcTwo = (req, res, next) => {
    if (res.locals.shouldSkipFuncTwo) return next()
    // do whatever stuff
    next()
  }
  
  router.get('/', funcOne, funcTwo, (req, res) => {
    res.status(200).send('hello world')
  )}