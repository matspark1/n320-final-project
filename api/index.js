const router = require("express").Router();

const db = require("../database");
router.use("/suggestions", require("./suggestions"));
router.use("/new", require("./new"));
router.use("/update", require("./update"));

// create the tables

db.run(
  `
  create table if not exists jobs (
    id integer primary key autoincrement,
    title text,
    description text,
    salary integer,
    skills text,
    category text
  );
`,
  (err) => {
    if (err) console.log(err);
  }
);

db.run(
  `
  create table if not exists jobPostings (
    id integer primary key autoincrement,
    job_id integer,
    location text,
    description text,
    date_posted text
  );
`,
  (err) => {
    if (err) console.log(err);
  }
);

db.run(
  `
  create table if not exists suggestions (
    id integer primary key autoincrement,
    sug_title text,
    sug_description text
  )
`,
  (err) => {
    if (err) console.log(err);
  }
);
// suggestions table stuff
function getSugs() {
  return new Promise((resolve, reject) => {
    db.all(`select * from suggestions`, [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

function addSugs(sug_title, sug_description) {
  return new Promise((resolve, reject) => {
    db.run(
      `insert into jobs (sug_title, sug_description)
       values ("${sug_title}", "${sug_description}")`,
      function (err) {
        if (err) reject(err);
        else resolve({ id: this.lastID });
      }
    );
  });
}

function updateSugs(id, sug_title, sug_description) {
  return new Promise((resolve, reject) => {
    db.run(
      `update jobs
         set sug_title       = "${sug_title}",
          sug_description = "${sug_description}"
       where id = ${id}`,
      function (err) {
        if (err) reject(err);
        else resolve(true);
      }
    );
  });
}

function deleteSugs(id) {
  return new Promise((resolve, reject) => {
    db.get(`select * from suggestions where id = ?`, [id], (err, row) => {
      if (err) reject(err);
      if (!row) {
        reject(new Error("Suggestion not found"));
      } else {
        db.run(`delete from suggestions where id = ?`, [id], function (err) {
          if (err) reject(err);
          else resolve(true);
        });
      }
    });
  });
}

// jobs table stuff

function getDbJobs() {
  return new Promise((resolve, reject) => {
    db.all(`select * from jobs`, [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

function addDbJob(title, description, salary, skills, category) {
  return new Promise((resolve, reject) => {
    db.run(
      `insert into jobs (title, description, salary, skills, category)
       values ("${title}", "${description}", ${salary}, "${skills}", "${category}")`,
      function (err) {
        if (err) reject(err);
        else resolve({ id: this.lastID });
      }
    );
  });
}

function updateDbJob(id, title, description, salary, skills, category) {
  return new Promise((resolve, reject) => {
    db.run(
      `update jobs
         set title       = "${title}",
             description = "${description}",
             salary      = ${salary},
             skills      = "${skills}",
             category    = "${category}"
       where id = ${id};`,
      function (err) {
        if (err) reject(err);
        else resolve(true);
      }
    );
  });
}

function deleteDbJob(id) {
  return new Promise((resolve, reject) => {
    db.run(`delete from jobs where id = ${id}`, function (err) {
      if (err) reject(err);
      else resolve(true);
    });
  });
}

// jobListings table stuff

function getDbJobPostings() {
  return new Promise((resolve, reject) => {
    db.all(`select * from jobPostings`, [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

function addDbJobPosting(jobId, location, description, datePosted) {
  return new Promise((resolve, reject) => {
    db.run(
      `insert into jobPostings (job_id, location, description, date_posted)
       values (${jobId}, "${location}", "${description}", "${datePosted}")`,
      function (err) {
        if (err) reject(err);
        else resolve({ id: this.lastID });
      }
    );
  });
}

function updateDbJobPosting(id, jobId, location, description, datePosted) {
  return new Promise((resolve, reject) => {
    db.run(
      `update jobPostings
         set job_id      = ${jobId},
             location    = "${location}",
             description = "${description}",
             date_posted = "${datePosted}"
       where id = ${id}`,
      function (err) {
        if (err) reject(err);
        else resolve(true);
      }
    );
  });
}

function deleteDbJobPosting(id) {
  return new Promise((resolve, reject) => {
    db.run(`delete from jobPostings where id = ${id}`, function (err) {
      if (err) reject(err);
      else resolve(true);
    });
  });
}

// routing for suggestions
router.get("/suggestions", async (req, res) => {
  try {
    const sugs = await getSugs();
    res.status(200).json(sugs);
  } catch (e) {
    res.status(400).json({ error: e });
  }
});
router.post("/suggestions/new", async (req, res) => {
  try {
    const { sug_title, sug_description } = req.body;
    await addSugs(sug_title, sug_description);
    const jobs = await addSugs();
    res.status(200).json({ totalJobs: jobs.length });
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

router.put("/suggestions/update/:sugId", async (req, res) => {
  try {
    const { sug_title, sug_description } = req.body;
    await updateSugs(req.params.sugId, sug_title, sug_description);
    res.status(200).json({ updated: true });
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

router.delete("/suggestions/remove/:sugId", async (req, res) => {
  try {
    await deleteSugs(req.params.sugId);
    const sugs = await getDbSugs();
    res.status(200).json({ totalSugs: sugs.length });
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

// routing for jobs

router.get("/jobs", async (req, res) => {
  try {
    const jobs = await getDbJobs();
    res.status(200).json(jobs);
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

router.get("/jobs/:jobId", async (req, res) => {
  try {
    const dbJobs = await getDbJobs();
    const job = dbJobs.find((job) => job.id == req.params.jobId);

    if (!job) {
      res.status(404).json({ error: "Job not found" });
    } else {
      res.status(200).json(job);
    }
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

router.get("/jobs/category/:category", async (req, res) => {
  try {
    const jobs = await getDbJobs();
    const filtered = jobs.filter((j) => j.category === req.params.category);
    res.status(200).json(filtered);
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

router.post("/jobs/new", async (req, res) => {
  try {
    const { title, description, salary, skills, category } = req.body;
    await addDbJob(title, description, salary, skills, category);
    const jobs = await getDbJobs();
    res.status(200).json({ totalJobs: jobs.length });
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

router.put("/jobs/update/:jobId", async (req, res) => {
  try {
    const { title, description, salary, skills, category } = req.body;
    await updateDbJob(
      req.params.jobId,
      title,
      description,
      salary,
      skills,
      category
    );
    res.status(200).json({ updated: true });
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

router.delete("/jobs/remove/:jobId", async (req, res) => {
  try {
    await deleteDbJob(req.params.jobId);
    const jobs = await getDbJobs();
    res.status(200).json({ totalJobs: jobs.length });
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

// routing for jobPostings

router.get("/jobPostings", async (req, res) => {
  try {
    const posts = await getDbJobPostings();
    res.status(200).json(posts);
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

router.get("/jobPostings/location/:location", async (req, res) => {
  try {
    const posts = await getDbJobPostings();
    const filtered = posts.filter((p) => p.location === req.params.location);
    res.status(200).json(filtered);
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

router.post("/jobPostings/new", async (req, res) => {
  try {
    const { jobId, location, description, datePosted } = req.body;
    await addDbJobPosting(jobId, location, description, datePosted);
    const posts = await getDbJobPostings();
    res.status(200).json({ totalPostings: posts.length });
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

router.put("/jobPostings/update/:postingId", async (req, res) => {
  try {
    const { jobId, location, description, datePosted } = req.body;
    await updateDbJobPosting(
      req.params.postingId,
      jobId,
      location,
      description,
      datePosted
    );
    res.status(200).json({ updated: true });
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

router.delete("/jobPostings/remove/:postingId", async (req, res) => {
  try {
    await deleteDbJobPosting(req.params.postingId);
    const posts = await getDbJobPostings();
    res.status(200).json({ totalPostings: posts.length });
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

function getJobs() {
  return new Promise((resolve, reject) => {
    db.all(`select * from jobs`, [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

function addJobs(addTitle, addDescription, addSalary, addSkill, addCategory) {
  return new Promise((resolve, reject) => {
    db.run(
      `insert into jobs (addTitle, addDescription, addSalary, addSkill, addCategory)
       values ("${addTitle}", "${addDescription}", "${addSalary}", "${addSkill}", "${addCategory}")`,
      function (err) {
        if (err) reject(err);
        else resolve({ id: this.lastID });
      }
    );
  });
}

function editJob(
  id,
  editTitle,
  editDescription,
  editSalary,
  editSkill,
  editCategory
) {
  return new Promise((resolve, reject) => {
    db.run(
      `UPDATE jobs
       SET title = ?,
           description = ?,
           salary = ?,
           skills = ?,
           category = ?
       WHERE id = ?`,
      [editTitle, editDescription, editSalary, editSkill, editCategory, id],
      function (err) {
        if (err) reject(err);
        else resolve(true);
      }
    );
  });
}

function deleteJob(id) {
  return new Promise((resolve, reject) => {
    db.get(`select * from jobs where id = ?`, [id], (err, row) => {
      if (err) reject(err);
      if (!row) {
        reject(new Error("Job not found"));
      } else {
        db.run(`delete from jobs where id = ?`, [id], function (err) {
          if (err) reject(err);
          else resolve(true);
        });
      }
    });
  });
}

router.get("/jobs", async (req, res) => {
  try {
    const job = await getJobs();
    res.status(200).json(job);
  } catch (e) {
    res.status(400).json({ error: e });
  }
});
router.post("/new/add", async (req, res) => {
  try {
    const { addTitle, addDescription, addSalary, addSkill, addCategory } =
      req.body;
    await addJobs(addTitle, addDescription, addSalary, addSkill, addCategory);
    const jobs = await addJobs();
    res.status(200).json({ totalJobs: jobs.length });
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

router.put("/update/edit/:id", async (req, res) => {
  try {
    const { editTitle, editDescription, editSalary, editSkill, editCategory } =
      req.body;
    await editJob(
      req.params.id,
      editTitle,
      editDescription,
      editSalary,
      editSkill,
      editCategory
    );
    res.status(200).json({ updated: true });
  } catch (e) {
    res.status(400).json({ error: e });
    console.error("Error updating job:", e);
    res.status(500).json({ error: e.message || e });
  }
});

router.delete("/update/delete/:jobId", async (req, res) => {
  try {
    await deleteJob(req.params.jobId);
    const job = await getJobs();
    res.status(200).json({ totalJobs: job.length });
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

module.exports = router;
