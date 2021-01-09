'use strict';

function Pet(petName, petAge){
  this.name = petName;
  this.age = petAge;
}

Pet.prototype.getName = function() { return this.name };

let cat = new Pet('millie', 6);
let dog = new Pet('clay', 1);


function sayName(petObj){
  if(petObj.age > 5){
    return petObj.getName().toUpperCase();
  } else {
    return petObj.getName().toLowerCase();
  };
}

function sayNameRefact(petObj){
  let name = petObj.getName(); // store name to avoid calling prototype multiple times
  if(petObj.age > 5){
    return name.toUpperCase();
  } else{
    return name.toLowerCase();
  };
};

function sayNameRefactAgain(petObj){
  let name = petObj.getName();
  return petObj.age > 5 ? name.toUpperCase() : name.toLowerCase();
}




console.log('sayName function>>', sayName(cat));
console.log('sayName function>>', sayName(dog));

console.log('sayNameRefact function>>', sayNameRefact(cat));
console.log('sayNameRefact function>>', sayNameRefact(dog));

console.log('sayNameRefactAgain>>', sayNameRefactAgain(cat));
console.log('sayNameRefactAgain>>', sayNameRefactAgain(dog));


// KISS  - Keep it simple, silly
// DRY - Do not repeat yourself