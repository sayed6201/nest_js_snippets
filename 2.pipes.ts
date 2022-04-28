
https://docs.nestjs.com/pipes

/*==============================================
Pipes have two typical use cases:

1) transformation: transform input data to the desired form (e.g., from string to integer)
2) validation: evaluate input data and if valid, simply pass it through unchanged; otherwise, throw an exception when the data is incorrect

-----------------
Built-in pipes#
-----------------
Nest comes with eight pipes available out-of-the-box:

ValidationPipe
ParseIntPipe
ParseFloatPipe
ParseBoolPipe
ParseArrayPipe
ParseUUIDPipe
ParseEnumPipe
DefaultValuePipe
They're exported from the @nestjs/common package.

==============================================*/



/*==============================================
built in pipe
nest will through an error if there is an error
==============================================*/

@Get(':id')
async findOne(@Param('id', ParseIntPipe) id: number) {
  return this.catsService.findOne(id);
}

//This ensures that one of the following two conditions is true: either the parameter we receive in the findOne() method is a number (as expected in our call to this.catsService.findOne()),
// or an exception is thrown before the route handler is called.
//Nest will throw an exception like this:

{
  "statusCode": 400,
  "message": "Validation failed (numeric string is expected)",
  "error": "Bad Request"
}


/*-------------------------------------
In the example above, we pass a class (ParseIntPipe), not an instance, 
leaving responsibility for instantiation to the framework and enabling dependency injection. As with pipes and guards, we can instead pass an in-place instance. 
Passing an in-place instance is useful if we want to customize the built-in pipe's behavior by passing options:
--------------------------------------*/
@Get(':id')
async findOne(
  @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
  id: number,
) {
  return this.catsService.findOne(id);
}