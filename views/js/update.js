const baseUrl = window.location.origin;

const jobId = window.location.pathname.split("/").pop();

async function loadJob(){
    try {
        const resp = await fetch(`${baseUrl}/update/${jobId}`);
        const job = await resp.json();
        document.querySelector('input[name="title"]').value = job.title;
        document.querySelector('textarea[name="description"]').value = job.description;
        document.querySelector('input[name="salary"]').value = job.salary;
        document.querySelector('input[name="skills"]').value = job.skills;
        document.querySelector('input[name="category"]').value = job.category;
        
    } catch (err) {
        console.error("Nah bro, here's why: ", err);
    }
}

document.getElementById("editJobForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = e.target.title.value;
    const description = e.target.description.value;
    const salary = e.target.salary.value;
    const skills = e.target.skills.value;
    const category = e.target.category.value;
    

    try{
        const resp = await fetch (`${baseUrl}/update/${jobId}`, {
            method: "PUT", //PUT IT DOWN
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({title, description, salary, skills, category}),
        });
        if (resp.ok){ //emotionally
            alert("Job updated!");
            window.location.href = "../../jobs/";

        }else {
            alert("No.")
        }
    } catch (err){
        console.error("Here's why you failed", err);
    }
});

loadJob();