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

async function selectGroupName(){
    const result = await sql`SELECT id as value, name as label FROM ideal.group ORDER BY id`;
    return result
}

async function selectMember(){
    const result = await sql`SELECT member.id, member.name, ideal.group.name as group_name FROM ideal.member INNER JOIN ideal.group ON member.group_id = ideal.group.id;`;
    return result
}

async function selectMemberWhereId(id){
    const result = await sql`SELECT member.id, member.name, member.group_id as group_id FROM ideal.member Where member.id = ${id};`;
    return result
}

async function insertMember(body){
  await sql`INSERT INTO ideal.member (name, group_id) VALUES (${body.name},${body.group_id})`;
}

async function updateMember(body){
  await sql`UPDATE ideal.member SET (name, group_id) = (${body.name},${body.group_id}) WHERE id=${body.id}`;
}

async function deleteMember(body){
  await sql`DELETE FROM ideal.member WHERE id=${body.id}`;
}

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

async function selectYoutube(){
    const result = await sql`SELECT * FROM ideal.youtube ORDER BY id`;
    return result
}

async function selectYoutubeWhereId(id){
    const result = await sql`SELECT * FROM ideal.youtube Where id = ${id}`;
    return result
}

async function insertYoutube(body){
  await sql`INSERT INTO ideal.youtube (name, unique_key) VALUES (${body.name},${body.unique_key})`;
}

async function updateYoutube(body){
  await sql`UPDATE ideal.youtube SET (name, unique_key) = (${body.name},${body.unique_key}) WHERE id=${body.id}`;
}

async function deleteYoutube(body){
  await sql`DELETE FROM ideal.youtube WHERE id=${body.id}`;
}

app.get("/member/api", (req, res) => {
    selectMember().then(function(result){
        res.json({data: result})
    })
})

app.get("/member/group", (req, res) => {
    selectGroupName().then(function(result){
        res.json({data: result})
    })
})

app.post("/member/api", (req, res) => {
  selectMemberWhereId(req.body.id).then(function(result){
      res.json({data: result})
  })
})

app.post("/member/register", (req, res) => {
  insertMember(req.body).then(function(){
    selectMember().then(function(result){
      res.json({data: result})
    })
  })
})

app.post("/member/update", (req, res) => {
  updateMember(req.body).then(function(){
    selectMember().then(function(result){
      res.json({data: result})
    })
  })
})

app.post("/member/delete", (req, res) => {
  deleteMember(req.body).then(function(){
    selectMember().then(function(result){
      res.json({data: result})
    })
  })
})

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

app.get("/youtube/api", (req, res) => {
    selectYoutube().then(function(result){
        res.json({data: result})
    })
})

app.post("/youtube/api", (req, res) => {
  selectYoutubeWhereId(req.body.id).then(function(result){
      res.json({data: result})
  })
})

app.post("/youtube/register", (req, res) => {
  insertYoutube(req.body).then(function(){
    selectYoutube().then(function(result){
      res.json({data: result})
    })
  })
})

app.post("/youtube/update", (req, res) => {
  updateYoutube(req.body).then(function(){
    selectYoutube().then(function(result){
      res.json({data: result})
    })
  })
})

app.post("/youtube/delete", (req, res) => {
  deleteYoutube(req.body).then(function(){
    selectYoutube().then(function(result){
      res.json({data: result})
    })
  })
})

app.listen(5000, () => {console.log("Server started on port 5000")})