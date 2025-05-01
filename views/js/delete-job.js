const baseUrl = window.location.origin;

const jobId = window.location.pathname.split("/").pop();
console.log("Job ID:", jobId);


const confirmDeleteButton = document.getElementById("confirmDelete");

confirmDeleteButton.addEventListener("click", async () => {
  try {
    const response = await fetch(`${baseUrl}/api/update/delete/${jobId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      alert("Job deleted successfully");
      window.location.href = "../../jobs/";
    } else {
      const result = await response.json();
      alert(`Error: ${result.error || "Failed to delete job"}`);
    }
  } catch (error) {
    console.error("Error deleting job:", error);
    alert("An error occurred while deleting the job.");
  }
});






// document.getElementById("confirmDelete").addEventListener("click", async () => {
//   try {
//     const resp = await fetch(`${baseUrl}/api/remove/${jobId}`, {
//       method: "DELETE",
//     });

//     if (resp.ok) {
//       alert("Job deleted.");
//       window.location.href = "../../jobs/";
//     } else {
//       alert("Failed to delete job.");
//     }
//   } catch (err) {
//     console.error("Error deleting job", err);
//   }
// });