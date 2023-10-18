const express = require("express");
const app = express();
require("dotenv").config();
const OpenAI = require("openai");
const port = process.env.PORT || 5001;
const cors = require("cors");

const openai = new OpenAI();
app.use(express.json());
app.use(cors());
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: message,
    });
    res.status(200).json(completion.choices[0].message);
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Server Connected to PORT: ${port}`);
});
