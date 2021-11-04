const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(express.json());
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "blog",
});
// configuration =========================

app.set("port", process.env.PORT || 3001);
app.use(cors());

app.get("/", (req, res) => {
  res.send("Root");
});

app.get("/content", (req, res) => {
  connection.query(
    "SELECT * from blog_content ORDER BY no desc",
    (error, rows) => {
      if (error) console.log(error);
      console.log("User info is: ", rows);
      res.send(rows);
    }
  );
});

//특정 게시물 데이터 가져오기
app.get("/content/:no", (req, res) => {
  connection.query(
    `SELECT * from blog_content where no=${req.params.no}`,
    (error, rows) => {
      if (error) console.log(error);
      console.log("Post: ", rows);
      res.send(rows);
    }
  );
});
//특정 게시물 삭제
app.get("/content/delete/:no", (req, res) => {
  connection.query(
    `DELETE FROM blog_content WHERE no=${req.params.no}`,
    (error, rows) => {
      if (error) console.log(error);
      console.log("Post: ", rows);
      res.send(rows);
    }
  );
});

//특정 게시물 수정하기
app.post("/content/edit/", (req, res) => {
  connection.query(
    `UPDATE blog_content SET subject = "${req.body.subject}", content="${req.body.content}" WHERE no=${req.body.no}`,
    (error, rows) => {
      if (error) console.log(error);
      console.log("Post: ", rows);
      res.send([rows, req.body]);
    }
  );
});
//특정 게시물 생성하기
app.post("/postcreate", (req, res) => {
  connection.query(
    `INSERT INTO blog_content(subject,content) values('${req.body.subject}','${req.body.content}') `,
    (error, rows) => {
      if (error) console.log(error);
      console.log("edit: ", rows);
      res.send(rows);
    }
  );
});
//특정 댓글 지우기
app.get("/comment/delete/:no", (req, res) => {
  connection.query(
    `DELETE FROM comment WHERE no=${req.params.no}`,
    (error, rows) => {
      if (error) console.log(error);
      console.log("Post: ", rows);
      res.send(rows);
    }
  );
});
//특정 게시물의 댓글 가져오기
app.get("/comment/:no", (req, res) => {
  connection.query(
    `SELECT * from comment where post_no=${req.params.no}`,
    (error, rows) => {
      if (error) console.log(error);
      console.log("Post: ", rows);
      res.send(rows);
    }
  );
});
//특정 게시물의 댓글 달기
app.post("/commentcreate", (req, res) => {
  connection.query(
    `insert into comment(name,comment,post_no,password) values("${req.body.name}","${req.body.comment}",${req.body.no},"${req.body.password}")`,
    (error, rows) => {
      if (error) console.log(error);
      console.log("edit: ", rows);
      res.send(rows);
    }
  );
});

app.listen(app.get("port"), () => {
  console.log("Express server listening on port " + app.get("port"));
});
