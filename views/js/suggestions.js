const baseUrl = window.location.origin + "/api";

async function getSugs() {
  try {
    const sugResp = await fetch(`${baseUrl}/suggestions`);
    const sugData = await sugResp.json();
    const suggestionList = document.querySelector("#suggestionList");
    suggestionList.innerHTML = "";

    sugData.forEach(function (sug) {
      suggestionList.innerHTML += `
        <div class="suglist">
          <h4>${sug.title}</h4>
          <h6>${sug.description}</h6>
          <div class="sug-btns">
            <button class="add-sug-btn" title="Add Suggestion">Add a Suggestion ❗</button>
            <button class="delete-sug-btn" title="Remove Suggestion" data-id="${sug.id}">Delete Suggestion ❌</button>
            <button class="edit-sug-btn" title="Edit Suggestion" data-id="${sug.id}">Edit Suggestion ✏️</button>
          </div>
        </div>
      `;
    });

    document.querySelectorAll(".delete-sug-btn").forEach(button => {
      button.addEventListener("click", async function () {
        const id = this.getAttribute("data-id");
        if (confirm("Are you sure you want to delete this suggestion?")) {
          await deleteSug(id);
        }
      });
    });

    document.querySelectorAll(".edit-sug-btn").forEach(button => {
      button.addEventListener("click", function () {
        const id = this.getAttribute("data-id");
        const title = this.closest(".suglist").querySelector("h4").textContent;
        const description = this.closest(".suglist").querySelector("h6").textContent;

        
        editSug(id, title, description);
      });
    });

  } catch (e) {
    console.warn("There was an error!!!", e);
  }
}

getSugs();

document.querySelector("#newSuggestion").addEventListener("submit", async function (e) {
  e.preventDefault();

  const title = this.title.value.trim();
  const description = this.description.value.trim();

  if (title && description) {
    try {
      const res = await fetch(`${baseUrl}/suggestions/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });

      if (res.ok) {
        this.reset();
        getSugs(); 
      } else {
        console.warn("Failed to add suggestion");
      }
    } catch (err) {
      console.error("Error adding suggestion", err);
    }
  }
});

async function deleteSug(id) {
  try {
    const res = await fetch(`${baseUrl}/suggestions/remove/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      getSugs();
    } else {
      console.warn("Failed to delete suggestion");
    }
  } catch (err) {
    console.error("Error deleting suggestion", err);
  }
}

async function editSug(id, currentTitle, currentDescription) {
  const newTitle = prompt("Enter a new title:", currentTitle);
  const newDescription = prompt("Enter a new description:", currentDescription);

  if (newTitle && newDescription) {
    try {
      const res = await fetch(`${baseUrl}/suggestions/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: newTitle.trim(), description: newDescription.trim() }),
      });

      if (res.ok) {
        console.log("Suggestion updated!");
        getSugs();
      } else {
        console.warn("Failed to update suggestion");
      }
    } catch (err) {
      console.error("Error updating suggestion", err);
    }
  }
}
