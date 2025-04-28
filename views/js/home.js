const form = document.getElementById('newSuggestion');
const suggestionList = document.getElementById('suggestionList');

function loadSuggestions() {
  fetch('http://localhost:13883/api/suggestions')
    .then(response => response.json())
    .then(suggestions => {
      suggestionList.innerHTML = '';
      suggestions.forEach(suggestion => {
        createSuggestionCard(suggestion.title, suggestion.description, suggestion.id);
      });
    })
    .catch(error => console.error('Error fetching suggestions:', error));
}

function createSuggestionCard(title, description, id) {
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

  editButton.addEventListener('click', () => editSuggestion(card, cardTitle, cardDescription, id));
  deleteButton.addEventListener('click', () => deleteSuggestion(card, id));
  
  actions.appendChild(editButton);
  actions.appendChild(deleteButton);
  
  card.appendChild(cardTitle);
  card.appendChild(cardDescription);
  card.appendChild(actions);
  
  suggestionList.appendChild(card);
}

function editSuggestion(card, cardTitle, cardDescription, id) {
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
  editButton.removeEventListener('click', () => editSuggestion(card, cardTitle, cardDescription, id));
  
  editButton.addEventListener('click', () => saveEdit(card, cardTitle, cardDescription, titleInput, descriptionInput, id));
}

function saveEdit(card, cardTitle, cardDescription, titleInput, descriptionInput, id) {
  const newTitle = titleInput.value;
  const newDescription = descriptionInput.value;

  cardTitle.textContent = newTitle;
  cardDescription.textContent = newDescription;

  fetch(`http://localhost:13883/api/suggestions/update/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title: newTitle, description: newDescription }),
  })
  .then(() => loadSuggestions())
  .catch(error => console.error('Error updating suggestion:', error));
  
  const editButton = card.querySelector('.edit-btn');
  editButton.textContent = 'Edit';
  editButton.removeEventListener('click', () => saveEdit(card, cardTitle, cardDescription, titleInput, descriptionInput, id));
  editButton.addEventListener('click', () => editSuggestion(card, cardTitle, cardDescription, id));
}

function deleteSuggestion(card, id) {
  if (!id) {
    console.error('No ID found for the suggestion to delete.');
    return;
  }

  fetch(`http://localhost:13883/api/suggestions/remove/${id}`, {
    method: 'DELETE',
  })
  .then(response => {
    if (response.ok) {
      suggestionList.removeChild(card);
    } else {
      console.error('Failed to delete suggestion:', response.statusText);
    }
  })
  .catch(error => console.error('Error deleting suggestion:', error));
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = event.target.title.value;
  const description = event.target.description.value;

  fetch('http://localhost:13883/api/suggestions/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, description }),
  })
  .then(() => loadSuggestions()) 
  .catch(error => console.error('Error adding suggestion:', error));

  form.reset();
});

window.onload = loadSuggestions;