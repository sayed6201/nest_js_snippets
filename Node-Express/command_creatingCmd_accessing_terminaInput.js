=============================================================
//You can access cmd input using "process" var
=============================================================
	//Example:
	const command = process.argv[2]
	if (command === 'add') {
	 console.log('Adding note!')
	} else if (command === 'remove') {
	 console.log('Removing note!')
	}

	---------------------
	//Run in terminal
	---------------------
	node app.js add
		- Adding note!


=============================================================
Creating command with yargs
=============================================================
install: npm install yargs@12.0.2


const yargs = require('yargs')
yargs.version('1.1.0')
yargs.command({
 command: 'add',
 describe: 'Add a new note',
 handler: function () {
 console.log('Adding a new note!')
 }
})
console.log(yargs.argv)

---------------
 RUN:
-------------- 
 node app.js add
  - //add will execute the yarg handler


=============================================================
Note app command examples:
=============================================================
const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes.js')

console.log('starting..')


// Customize yargs version
yargs.version('1.1.0')

// Create add command ->  node app.js add --title="Buy" --body="Note body here"
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true, //this indicates the title value is must
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true, //this indicates the body value is must
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body)
    }
})

// Create remove command -> node app.js add --title="Buy" 
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeNote(argv.title)
    }
})

// Create list command -> node app.js list
yargs.command({
    command: 'list',
    describe: 'List your notes',
    handler() {
        notes.listNotes()
    }
})

// Create read command -> node app.js add --title="Buy" 
yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.readNote(argv.title)
    }
})

yargs.parse()