'use strict';




$.ajax('./data/pets.json')
  .then( data => {
    data.forEach(value => {
      // let $petTemplate = $('.pet-template');
      // let $newPet = $petTemplate.clone();
      // $('.pets').append($newPet);
      // $newPet.removeAttr('class');
      // $newPet.text(value.name);

      // DOM manipulation
      // 1.  Find the DOM element (destination/template)
      let template = $('#template').html();
      // 2. Create/Fill the markup with content
      let html = Mustache.render(template, {
        pet: value.name,
        petOwner: value.owner});
      console.log(html);
      // 3. Append markup to the DOM
      $('.pets').append(html);
    });
  });



console.log('hello');
