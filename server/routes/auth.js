import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate username and password
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    // Additional username and password requirements can be added here

    const chatEngineResponse = await axios.get(
      "https://api.chatengine.io/users/me",
      {
        headers: {
          "Project-ID": process.env.PROJECT_ID,
          "User-Name": username,
          "User-Secret": password,
        },
      }
    );

    res.status(200).json({ response: chatEngineResponse.data });
  } catch (error) {
    console.error("error", error);
    res.status(500).json({ message: "Sign In Unsuccessful" });
  }
});

router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate username and password
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    // Additional username and password requirements can be added here

    const chatEngineResponse = await axios.post(
      "https://api.chatengine.io/users/",
      {
        username: username,
        secret: password,
      },
      {
        headers: { "Private-Key": process.env.PRIVATE_KEY },
      }
    );

    res.status(200).json({ message: "Signup successful - Go To Already A User" });
  } catch (error) {
    console.error("error", error.message);
    res.status(500).json({ message: "Sign Up Unsuccessful" });
  }
});

export default router;
