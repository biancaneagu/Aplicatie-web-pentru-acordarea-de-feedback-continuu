import express from "express";
import cors from "cors";
import axios from "axios";

import sequelize from "./db.js";
import { Activity, Feedback } from "./models/index.js";

const app = express();
app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173",
  "https://aplicatie-web-pentru-acordarea-de-f.vercel.app"
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error("Not allowed by CORS"));
  },
  credentials: true
}));

app.use(express.json());

sequelize.sync().then(() => {
  console.log("Database synchronized");
});

function CodeGenerator() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

function isActiveNow(activity) {
  const now = new Date();
  const start = new Date(activity.startTime);
  const end = new Date(activity.endTime);
  return now >= start && now <= end;
}

app.get("/api", (req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/activities", async (req, res) => {
  try {
    const { title, description, startTime, endTime } = req.body;

    if (!title || !description || !startTime || !endTime) {
      return res.status(400).json({ message: "Date incomplete" });
    }

    const activity = await Activity.create({
      title,
      description,
      startTime,
      endTime,
      code: CodeGenerator(),
    });

    return res.json(activity);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Eroare la creare activitate" });
  }
});

app.get("/api/activities", async (req, res) => {
  try {
    const list = await Activity.findAll({
      order: [["createdAt", "DESC"]],
    });
    return res.json(list);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Eroare la listare activități" });
  }
});

app.post("/api/activities/join", async (req, res) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ message: "Cod lipsă" });
    }

    const activity = await Activity.findOne({ where: { code } });

    if (!activity) {
      return res.status(404).json({ message: "Cod invalid" });
    }

    if (!isActiveNow(activity)) {
      return res
        .status(403)
        .json({ message: "Activitatea nu este activă acum" });
    }

    return res.json({
      id: activity.id,
      title: activity.title,
      description: activity.description,
      startTime: activity.startTime,
      endTime: activity.endTime,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Eroare la join" });
  }
});


app.post("/api/activities/:id/feedback", async (req, res) => {
  try {
    const { type } = req.body;

    if (!type) {
      return res.status(400).json({ message: "Tip feedback lipsă" });
    }

    const activity = await Activity.findByPk(req.params.id);
    if (!activity) {
      return res.status(404).json({ message: "Activitate inexistentă" });
    }

    if (!isActiveNow(activity)) {
      return res
        .status(403)
        .json({ message: "Activitatea nu este activă acum" });
    }

    const feedback = await Feedback.create({
      type,
      activityId: req.params.id,
    });

    return res.json(feedback);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Eroare la trimitere feedback" });
  }
});

app.get("/api/activities/:id/feedback", async (req, res) => {
  try {
    const list = await Feedback.findAll({
      where: { activityId: req.params.id },
      order: [["createdAt", "ASC"]],
    });
    return res.json(list);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Eroare la listare feedback" });
  }
});


app.get("/api/external/status", async (req, res) => {
  try {
    const owner = "biancaneagu";
    const repo = "Aplicatie-web-pentru-acordarea-de-feedback-continuu";

    const response = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}`,
      {
        timeout: 5000,
        headers: {
          "User-Agent": "tw-feedback-app",
          Accept: "application/vnd.github+json",
        },
      }
    );

    const data = response.data;

    return res.json({
      source: "GitHub API",
      repo: data.full_name,
      updatedAt: data.updated_at,
      stars: data.stargazers_count,
    });
  } catch (err) {
    console.error("External API error:", err.message);
    return res.status(500).json({
      message: "Eroare la apelarea serviciului extern",
      error: err.message,
    });
  }
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
