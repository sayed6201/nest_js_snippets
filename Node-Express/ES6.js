// const square function (x) {
// return x * x
// }
const square = (x) => {
 return x * x
}
console.log(square(2)) // Will print: 4


const squareAlt = (x) => x * x



------------------
this 
--------------------

const event = {
 name: 'Birthday Party',
 guestList: ['Andrew', 'Jen', 'Mike'],
 printGuestList() {
 console.log('Guest list for ' + this.name)
 
 this.guestList.forEach((guest) => {
 console.log(guest + ' is attending ' + this.name)
 })
 }
}
event.printGuestList()


forEach(function(guest){
this.name -> undefined
//normal function create new this..
//arrow function use their parents this, they don't create new one
})