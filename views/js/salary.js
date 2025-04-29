async function fetchJobs() {
    try {
      const res = await fetch("/api/jobs");
      return await res.json();
    } catch (err) {
      console.error("Error fetching jobs:", err);
      return [];
    }
  }
  
  async function populateSalaryTable() {
    const jobs = await fetchJobs();
  
    if (!jobs.length) {
      const tableBody = document.getElementById('jb-salary-body');
      tableBody.innerHTML = `
        <tr>
          <td colspan="2">No jobs available at the moment.</td>
        </tr>
      `;
      return;
    }
  
    jobs.sort((a, b) => b.salary - a.salary);
  
    const tableBody = document.getElementById('jb-salary-body');
    tableBody.innerHTML = "";
  
    jobs.forEach(job => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${job.title}</td>
        <td>$${job.salary.toLocaleString()}</td>
      `;
      tableBody.appendChild(row);
    });
  }
  
  populateSalaryTable();
  