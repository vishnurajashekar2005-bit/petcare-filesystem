import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 8000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "data", "pets.json");

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});
const readPets = () => {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};



const writePets = (pets) => {
  fs.writeFileSync(filePath, JSON.stringify(pets, null, 2));
};


app.get("/pets", (req, res) => {
  const pets = readPets();

  res.status(200).json(pets);
});


app.post("/pets", (req, res) => {
  const newPet = req.body;

  const pets = readPets();

  newPet.id =
    pets.length > 0
      ? pets[pets.length - 1].id + 1
      : 1;

  pets.push(newPet);

  writePets(pets);

  res.status(201).json({
    message: "Pet Added Successfully",
    pet: newPet
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});