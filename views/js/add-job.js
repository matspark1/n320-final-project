const baseUrl = window.location.origin + "/api";

document.getElementById("submitJob").addEventListener("submit", async (event) => {
  event.preventDefault(); 

  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const salary = document.getElementById("salary").value;
  const skills = document.getElementById("skills").value;
  const category = document.getElementById("category").value;

  console.log("Job data being sent:", {
    title,
    description,
    salary,
    skills,
    category
  });

  try {
 
    const resp = await fetch(`${baseUrl}/jobs/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        salary,
        skills,
        category,
      }),
    });

    if (resp.ok) {
      alert("Job added successfully.");
      window.location.href = "/jobs";
    } else {
      alert("Failed to add job.");
      const response = await resp.json();
      console.error("Error response:", response);
    }
  } catch (err) {
    console.error("Error adding job", err);
  }
});
