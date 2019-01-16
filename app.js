const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 8000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// Declare initial furnitures data

let musics = {
  next_id: 6,
  data: [
    {
      id: 1,
      singer: "Virzha",
      title: "Tentang Rindu"
    },
    {
      id: 2,
      singer: "Tulus",
      title: "Labirin"
    },
    {
      id: 3,
      singer: "Wahyu",
      title: "Selow"
    },
    {
      id: 4,
      singer: "Eka Gustiwana feat Prince Husein",
      title: "Tersimpan Di Hati"
    },
    {
      id: 5,
      singer: "Weird Genius",
      title: "Sweet Scar"
    }
  ]
};

// Get 200 OK

app.get("/", (req, res) => {
  res.send({
    message: "200 OK",
    headers: req.headers
  });
});

// Get all music

app.get("/musics", (req, res) => {
  res.send({
    count: musics.data.length,
    data: musics.data
  });
});

// Search music by title & singer

app.get("/musics/search", (req, res) => {
  const queryTitle = req.query.title ? req.query.title.toLowerCase() : null;
  const querySinger = req.query.singer ? req.query.singer.toLowerCase() : null;

  const resultMusic = musics.data.find(music => {
    if (queryTitle && querySinger) {
      return (
        music.title.toLowerCase().includes(queryTitle) &&
        music.singer.toLowerCase().includes(querySinger)
      );
    } else if (querySinger) {
      return music.singer.toLowerCase().includes(querySinger);
    } else if (queryTitle) {
      return music.title.toLowerCase().includes(queryTitle);
    } else {
      return res.send({
        error: "Data Not Found",
        message: "Please Check the Query"
      });
    }
  });

  res.send({
    query: req.query,
    data: resultMusic
  });
});

// Get music by id

app.get("/musics/:id", (req, res) => {
  const music = musics.data.find(music => {
    return music.id === Number(req.params.id);
  });

  res.send({
    data: music
  });
});

// Save new music

app.post("/musics", (req, res) => {
  const newMusic = {
    id: musics.next_id,
    singer: req.body.singer,
    title: req.body.title
  };

  const newMusics = {
    next_id: musics.next_id + 1,
    data: musics.data.concat(newMusic)
  };

  musics = newMusics;

  res.send({
    newData: newMusic,
    data: musics
  });
});

// Delete music all

app.delete("/musics", (req, res) => {
  musics.data = [];

  res.send({
    data: musics.data
  });
});

// Delete music by Id

app.delete("/musics/:id", (req, res) => {
  const id = Number(req.params.id);

  const newMusics = musics.data.filter(music => {
    return music.id !== id;
  });

  res.send({
    data: newMusics
  });
});

// Update music

app.put("/musics/:id", (req, res) => {
  const id = Number(req.params.id);

  const resultMusic = musics.data.find(music => {
    return music.id === id;
  });

  const newMusic = {
    id: id,
    singer: req.body.singer ? req.body.singer : resultMusic.singer,
    title: req.body.title ? req.body.title : resultMusic.title
  };

  const newMusics = {
    data: musics.data.concat(newMusic)
  };

  musics = newMusics;

  res.send({
    newData: newMusic,
    data: musics
  });
});

app.listen(port, err => {
  console.log(`Server running at http://localhost:${port}`);
});
