const baseUrl = window.location.origin + "/api";

async function getSugs() {
  try {
    const sugResp = await fetch(`${baseUrl}/suggestions`);
    const sugData = await sugResp.json();
    document.querySelector(".suglist-wrapper").innerHTML = "";
    sugData.forEach(function (sug) {
      document.querySelector(".suglistings-wrapper").innerHTML += `
  <div class="suglisting">
   <h4><a href="../sug-details/${sug.id}">${sug.title}</a></h4>
    <div class="sug-btns">
      <button class="add-sug-btn" title="Edit Suggestion">Add a Suggestion ❗</button>
      <button class="delete-sug-btn" title="Remove Suggestion">Delete Suggestion ❌</button>
      <button class="edit-sug-btn" title="Edit Suggestion">Edit Suggestion ✏️</button>
    </div>
  </div>
`;
    });
  } catch (e) {
    console.warn("There was an error!!!", e);
  }
}

getSugs();