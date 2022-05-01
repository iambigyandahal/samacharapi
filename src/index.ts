import express from "express";
import News from "./models/News";
import mongoose from "mongoose";
import path from "path";

if(process.env.MODE === "dev") {
  import("dotenv").then(dotenv => {
    dotenv.config();
    if(!process.env.MONGO_URI) {
      console.log("Set MODE and MONGO_URI environment variable properly!");
      process.exit();
    }
    mongoose.connect(process.env.MONGO_URI!)
      .catch((err) => console.error(err));
  });
} else if((process.env.MODE === "prod") && (process.env.MONGO_URI)) {
  mongoose.connect(process.env.MONGO_URI)
    .catch((err) => console.error(err));
} else {
  console.log("Set MODE and MONGO_URI environment variable properly!");
  process.exit();
}

const PORT = process.env.PORT || 5000;
const app = express();

app.use("/static", express.static(path.resolve(__dirname, "../public")));

app.get("/", async (_, res) => {
  res.sendFile(path.resolve(__dirname, "../public/index.html"));
});

app.get("/api/news", async (_, res) => {
  try {
    const news = await News.find({}).sort({$natural: -1});
    if(news.length) {
      res.status(200).json({ status: "success", data: news });
    } else {
      res.status(503).json({ status: "error", data: "Server on maintenance! Contact API maintainer for help if you are seeing this for long time." });
    }
  } catch(err) {
    res.status(500).json({ status: "error", data: "Server Error!" });
  }
});

app.get("/api/news/onlinekhabar", async (_, res) => {
  try {
    const news = await News.find({ network: "ok" }).sort({$natural: -1});
    if(news.length) {
      res.status(200).json({ status: "success", data: news });
    } else {
      res.status(503).json({ status: "error", data: "Server on maintenance! Contact API maintainer for help if you are seeing this for long time." });
    }
  } catch(err) {
    res.status(500).json({ status: "error", data: "Server Error!" });
  }
});

app.get("/api/news/nagariknews", async (_, res) => {
  try {
    const news = await News.find({ network: "nn" }).sort({$natural: -1});
    if(news.length) {
      res.status(200).json({ status: "success", data: news });
    } else {
      res.status(503).json({ status: "error", data: "Server on maintenance! Contact API maintainer for help if you are seeing this for long time." });
    }
  } catch(err) {
    res.status(500).json({ status: "error", data: "Server Error!" });
  }
});

app.listen(PORT, () => {
  console.log(`Samarchar API is running at http://localhost:${PORT}`);
});