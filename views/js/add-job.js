const baseUrl = window.location.origin + "/api";

document
  .querySelector("#submitJob")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const title = this.title.value.trim();
    const description = this.description.value.trim();
    const salary = this.salary.value.trim();
    const skills = this.skills.value.trim();
    const category = this.category.value.trim();

    if (title && description && salary && skills && category) {
      try {
        const res = await fetch(`${baseUrl}/new/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, description, salary, skills, category }),
        });
        if (res.ok) {
          this.reset();
          alert("Job added successfully!");
          window.location.href = "../../jobs";
        } else {
          console.warn("Failed to add job");
        }
      } catch (err) {
        console.error("Error adding job", err);
      }
    }
  });

