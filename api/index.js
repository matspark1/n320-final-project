const router = require("express").Router();

const db = require("../database");

db.run(
  `create table if not exists cats (
  id integer primary key autoincrement,
  name text
)`,
  function (err) {
    if (err) {
      console.log(err);
    }
  }
);

async function getDbCats() {
  return new Promise((resolve, reject) => {
    db.all(`select * from cats`, [], function (err, rows) {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

async function addDbCat(name) {
  return new Promise(function (resolve, reject) {
    db.run(`insert into cats (name) values ("${name}")`, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ name });
      }
    });
  });
}

async function deleteDbCat(id) {
  return new Promise((resolve, reject) => {
    db.run(`delete from cats where id = ${id}`, function (err) {
      if (err) reject(err);
      else resolve(true);
    });
  });
}

/**
 
Creating tables in SQLite

create table if not exists cats (
  id integer primary key autoincrement,
  name text
)


 */

const cats = [
  { name: "Tabby", color: ["black", "white"] },
  { name: "Persian", color: ["beige", "white"] },
  { name: "Garfield", color: ["white"] },
  { name: "Larry", color: ["red"] },
];

router.get("/cats", async function (req, res) {
  try {
    const dbCats = await getDbCats();

    console.log(dbCats);

    res.status(200).json(dbCats);
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

router.get("/cats/color/:color", async function (req, res) {
  const dbCats = await getDbCats();
  const filteredCats = dbCats.filter((cat) => {
    return cat.color && cat.color.length
      ? cat.color.includes(req.params.color)
      : true;
  });
  res.status(200).json(filteredCats);
});

router.post("/cats/new", async function (req, res) {
  try {
    await addDbCat(req.body.name);

    const dbCats = await getDbCats();

    res.status(200).json({ totalCats: dbCats.length });
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

router.delete("/cats/remove/:catId", async function (req, res) {
  //   return -1 if not found
  // if (catIndex < 0) {
  //   res.status(404).json({ error: "Cat not found" });
  // } else {
  // cats.splice(catIndex, 1);
  try {
    const dbCats = await getDbCats();
    await deleteDbCat(req.params.catId);
    res.status(200).json({ totalCats: dbCats.length });
  } catch (e) {
    res.status(400).json({ error: e });
  }
  // }
});

module.exports = router;
