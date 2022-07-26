
=============================
// Arrays 
==============================
const users = [{
 name: 'Andrew Mead',
 age: 27
},{
 name: 'George Hudson',
 age: 72
},{
 name: 'Clay Klay',
 age: 45
}]

----------------
//finding data
-----------------
const user = users.find((user) => user.name === 'George Hudson')
console.log(user) 

----------------
//pushing data
----------------
 notes.push({
            title: title,
            body: body
        })

----------------
 //Filtering data
----------------

 const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)

    if (notes.length > notesToKeep.length) {
        console.log(chalk.green.inverse('Note removed!'))
        saveNotes(notesToKeep)
    } else {
        console.log(chalk.red.inverse('No note found!'))
    }
}

----------------
 //traversing data
----------------
arrayName.forEach((element)=>{
    console.log(element);
})

=============================
JSON
==============================
const book = {
 title: 'Ego is the Enemy',
 author: 'Ryan Holiday'
}
// Covert JavaScript object into JSON string
const bookJSON = JSON.stringify(book)
// Covert JSON string into object
const bookObject = JSON.parse(bookJSON)
console.log(bookObject.title) /