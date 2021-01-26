'use strict';

var global = 'I am a global varible';

function scopeMaker(){
  var local = 'I am a local variable';
  console.log(global, 'logged from inside scopeMaker().');
  console.log(local, 'logged from inside scopeMaker().');
}
scopeMaker();

