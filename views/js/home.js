const baseUrl = location.href + "api";

async function getCats() {
  try {
    const catResp = await fetch(`${baseUrl}/cats`);
    const catData = await catResp.json();

    document.querySelector("#catList").innerHTML = "";

    catData.forEach(function (cat) {
      console.log(cat);
      document.querySelector("#catList").innerHTML += `
        <div style="margin-bottom: 20px">
          <h4>${cat.name}</h4>
          <p>${""}</p>
          <button style='background-color: red; color: white;' onclick="removeCat('${
            cat.id
          }')">Remove</button>
        </div>
      `;
    });
  } catch (e) {
    console.warn("There was an error!!!", e);
  }
}

async function removeCat(catName) {
  try {
    await fetch(`${baseUrl}/cats/remove/${catName}`, {
      method: "DELETE",
    });

    getCats();
  } catch (e) {
    alert("Error adding cat:" + e);
  }
}

async function addCat(e) {
  e.preventDefault();
  const formData = new FormData(e.target);

  const catColors = formData.getAll("color");
  const catName = formData.get("name");

  if (!catName || !catColors.length) {
    alert("Invalid data: cat name and color required");
    return;
  }

  try {
    await fetch(`${baseUrl}/cats/new`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: catName, color: catColors }),
    });

    getCats();
  } catch (e) {
    alert("Error adding cat");
    console.warn(e);
  }
}

document.querySelector("#newCat").onsubmit = addCat;

getCats();
