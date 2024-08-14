const express = require('express')
const app = express()
app.use(express.json());
const postgres = require('postgres');
require('dotenv').config();
let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;

const sql = postgres({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: 'require',
  connection: {
    options: `project=${ENDPOINT_ID}`,
  },
});

async function selectGroup(){
    const result = await sql`SELECT * FROM ideal.group ORDER BY id`;
    return result
}

async function selectGroupWhereId(id){
    const result = await sql`SELECT * FROM ideal.group Where id = ${id}`;
    return result
}

async function insertGroup(body){
  await sql`INSERT INTO ideal.group (name, producer, category) VALUES (${body.name},${body.producer},${body.category})`;
}

async function updateGroup(body){
  await sql`UPDATE ideal.group SET (name, producer, category) = (${body.name},${body.producer},${body.category}) WHERE id=${body.id}`;
}

async function deleteGroup(body){
  await sql`DELETE FROM ideal.group WHERE id=${body.id}`;
}

app.get("/group/api", (req, res) => {
    selectGroup().then(function(result){
        res.json({data: result})
    })
})
app.post("/group/api", (req, res) => {
  selectGroupWhereId(req.body.id).then(function(result){
      res.json({data: result})
  })
})

app.post("/group/register", (req, res) => {
  insertGroup(req.body).then(function(){
    selectGroup().then(function(result){
      res.json({data: result})
    })
  })
})

app.post("/group/update", (req, res) => {
  updateGroup(req.body).then(function(){
    selectGroup().then(function(result){
      res.json({data: result})
    })
  })
})

app.post("/group/delete", (req, res) => {
  deleteGroup(req.body).then(function(){
    selectGroup().then(function(result){
      res.json({data: result})
    })
  })
})

app.listen(5000, () => {console.log("Server started on port 5000")})