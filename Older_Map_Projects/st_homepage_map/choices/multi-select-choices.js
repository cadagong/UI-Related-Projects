console.log('im here too');

const element = document.querySelector('[data-choice]');
const choices = new Choices(element, {
  position: 'bottom',
  noResultsText: 'No results found',
  removeItems: true,
  removeItemButton: true
});   


