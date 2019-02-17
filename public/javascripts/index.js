function initMap() {
  const domElement = document.getElementById("map");

  if (!domElement) { return; }

  window.map = new MyMap(domElement);
  window.map.init();
  window.map.addSearch("pac-input");
}

  $(".card.categories").click(function() {
    const category = this.dataset.category;
  
    $(this).toggleClass('selected');
  
    if ($(this).hasClass('selected')) {    
      const newInput = document.createElement('input');
      newInput.classList.add("category-input");
  
      newInput.name = 'interests';
      newInput.value = category;
      newInput.id = `category-${category}`;
      newInput.display = 'none';
      $("#categories-form").append(newInput);
    } else {
      $(`#categories-form #category-${category}`).remove();
    }

  })


