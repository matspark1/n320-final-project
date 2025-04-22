## Final Project: The Odd Job Board

### Project Summary

**The Odd Job Board** is a fun web application that explores the world’s most unusual jobs — from iceberg movers to pet food tasters. Users can browse job profiles, compare salaries, post their own odd jobs, and generate printable job profile PDFs.

### Live Link

[Coming Soon](https://url.com)

---

### Key Goals

- Build a full-stack web application.
- Learn to manage data with databases and APIs.
- Practice working as a team using GitHub and version control.
- Design an intuitive and user-friendly interface.

---

### Core Pages

1. **Home Page**  
   - Overview of the site, featured jobs, and navigation links.

2. **Job Listings**  
   - Browse all odd jobs. Includes filters by category or salary range.

3. **Job Details Page**  
   - Full details for each job, including description, salary, skills, and category.

4. **Add a Job**  
   - Form to submit a new odd job. Includes title, description, salary, skills, and category.

5. **Edit/Delete Job**  
   - Edit or remove existing jobs.

6. **Job Postings**  
   - Users can post their own job listings based on available job types and add location info.

7. **Salary Comparison Tool**  
   - Compare average salaries for odd jobs by region using an interactive chart or calculator.

8. **PDF Generator**  
   - Export a printable PDF with selected job details, salary info, and skills.

---

### Design Choices

| Variant    | Element/Block | Description         | Why                                                 |
| ---------- | ------------- | ------------------- | --------------------------------------------------- |
| Primary    | #4F46E5       | Indigo color        | Gives a subtle pop while still feeling professional |
| Accent     | #A5B4FC       | Lavender blue color | Light highlights or hover states                    |
| Background | #FFFFFF       | Solid white         | For a clean and crisp background                    |
| Text       | #111827       | Dark Grey           | Dark text for eligibility and contrast              |

### Database Tables

#### `jobs`
| Field        | Description                          |
|--------------|--------------------------------------|
| id           | Unique job ID                        |
| title        | Name of the job                      |
| description  | Full job description                 |
| salary       | Average salary                       |
| skills       | List of required skills              |
| category     | Job category (e.g., Outdoor, Animal) |

#### `job_postings`
| Field        | Description                          |
|--------------|--------------------------------------|
| id           | Unique posting ID                    |
| job_id       | Links to job                         |
| location     | Location of job (real or fictional)  |
| description  | Custom posting content               |
| date_posted  | When it was posted                   |


---

### Team Members & Responsibilities

**Matt – President**
- Create and manage GitHub repository  
- Delegate roles  
- Submit assignments  
- Create and maintain live link  
- **Pages:** Job Listing, Job Details Page  

**Ari – Scrum Master**
- Write "Members & Responsibilities" section  
- Track and record team roles and completed tasks  
- **Pages:** Add a Job Page, Edit/Delete Job Page  

**Jonathan – Designer**
- Select and apply color palette  
- **Pages:** Job Postings, Salary Comparison Tool  

**Megan – Analyst**
- Write "Key Takeaways" section  
- Design project logo  
- **Pages:** PDF Generator Page, Home Page  
