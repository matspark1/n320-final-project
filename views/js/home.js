const form = document.getElementById('newSuggestion');
const suggestionList = document.getElementById('suggestionList');

function loadSuggestions() {
  const savedSuggestions = JSON.parse(localStorage.getItem('suggestions')) || [];
  savedSuggestions.forEach(suggestion => {
    createSuggestionCard(suggestion.title, suggestion.description);
  });
}



function createSuggestionCard(title, description) {
  const card = document.createElement('div');
  card.classList.add('suggestion-card');
  
  const cardTitle = document.createElement('h3');
  cardTitle.textContent = title;
  
  const cardDescription = document.createElement('p');
  cardDescription.textContent = description;

  const actions = document.createElement('div');
  actions.classList.add('actions-container');
  
  const editButton = document.createElement('button');
  editButton.classList.add('edit-btn');
  editButton.textContent = 'Edit';
  
  const deleteButton = document.createElement('button');
  deleteButton.classList.add('delete-btn');
  deleteButton.textContent = 'Delete';
  
  actions.appendChild(editButton);
  actions.appendChild(deleteButton);
  
  card.appendChild(cardTitle);
  card.appendChild(cardDescription);
  card.appendChild(actions);
  
  suggestionList.appendChild(card);
  
  editButton.addEventListener('click', () => editSuggestion(card, cardTitle, cardDescription));
  deleteButton.addEventListener('click', () => deleteSuggestion(card, title, description));
}




function editSuggestion(card, cardTitle, cardDescription) {
  const titleInput = document.createElement('input');
  titleInput.value = cardTitle.textContent;
  cardTitle.textContent = '';
  cardTitle.appendChild(titleInput);

  const descriptionInput = document.createElement('textarea');
  descriptionInput.value = cardDescription.textContent;
  cardDescription.textContent = '';
  cardDescription.appendChild(descriptionInput);

  const editButton = card.querySelector('.edit-btn');
  editButton.textContent = 'Save';
  editButton.removeEventListener('click', () => editSuggestion(card, cardTitle, cardDescription));
  
  editButton.addEventListener('click', () => saveEdit(card, cardTitle, cardDescription, titleInput, descriptionInput));
}




function saveEdit(card, cardTitle, cardDescription, titleInput, descriptionInput) {
  const newTitle = titleInput.value;
  const newDescription = descriptionInput.value;

  cardTitle.textContent = newTitle;
  cardDescription.textContent = newDescription;

  let savedSuggestions = JSON.parse(localStorage.getItem('suggestions')) || [];
  savedSuggestions = savedSuggestions.map(suggestion => 
    suggestion.title === cardTitle.textContent && suggestion.description === cardDescription.textContent
      ? { title: newTitle, description: newDescription }
      : suggestion
  );
  localStorage.setItem('suggestions', JSON.stringify(savedSuggestions));

  const editButton = card.querySelector('.edit-btn');
  editButton.textContent = 'Edit';
  editButton.removeEventListener('click', () => saveEdit(card, cardTitle, cardDescription, titleInput, descriptionInput));
  editButton.addEventListener('click', () => editSuggestion(card, cardTitle, cardDescription));
}



function deleteSuggestion(card, title, description) {
  suggestionList.removeChild(card);

  let savedSuggestions = JSON.parse(localStorage.getItem('suggestions')) || [];
  savedSuggestions = savedSuggestions.filter(suggestion => suggestion.title !== title || suggestion.description !== description);
  localStorage.setItem('suggestions', JSON.stringify(savedSuggestions));
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = event.target.title.value;
  const description = event.target.description.value;

  createSuggestionCard(title, description);

  let savedSuggestions = JSON.parse(localStorage.getItem('suggestions')) || [];
  savedSuggestions.push({ title, description });
  localStorage.setItem('suggestions', JSON.stringify(savedSuggestions));

  form.reset();
});

window.onload = loadSuggestions;