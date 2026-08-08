import { useEffect, useState } from "react";
import axios from "axios";
import PetForm from "./components/PetForm";

const API_URL = "https://petcare-filesystem.onrender.com/pets";

function App() {
  const [pets, setPets] = useState([]);

  const fetchPets = async () => {
    try {
      const response = await axios.get(API_URL);
      setPets(response.data);
    } catch (error) {
      console.error("Error fetching pets:", error);
    }
  };

  const addPet = async (pet) => {
    try {
      await axios.post(API_URL, pet);
      fetchPets();
    } catch (error) {
      console.error("Error adding pet:", error);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  return (
    <div>
      <h1>PetCare</h1>

      <p>Pet Registration System</p>

      <PetForm addPet={addPet} />

      <h2>Registered Pets</h2>

      {pets.map((pet) => (
        <div key={pet.id}>
          <p>Owner: {pet.owner}</p>
          <p>Phone: {pet.phone}</p>
          <p>Pet: {pet.pet}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default App;