'use strict';


$('button').on('click', function() {
  // GETTING the text from the button
  console.log($(this).text());
  // SETTING the text in the button to something new
  // console.log($(this).text('lever'));
  // $('ul').toggle('hide');
});


// DOM manipulation
// 1. Select the element from the DOM
let $pets = $('.pets');

// 2. Create the markup/Give it content


// 3. Render it to the DOM


$.ajax('./data/pets.json')
  .then( data => {
    data.forEach(value => {
      let $petTemplate = $('.pet-template');
      let $newPet = $petTemplate.clone();
      $pets.append($newPet);
      $newPet.removeAttr('class');

      $newPet.text(value.name);

      console.log(value);

    });
  });



console.log('hello');
