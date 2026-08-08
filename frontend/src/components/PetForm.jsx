import { useState } from "react";

const PetForm = ({ addPet }) => {
  const [pet, setPet] = useState({
    owner: "",
    phone: "",
    pet: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setPet((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!pet.owner.trim() || !pet.phone.trim() || !pet.pet.trim()) {
      alert("Please fill in all the fields.");
      return;
    }

    addPet(pet);

    setPet({
      owner: "",
      phone: "",
      pet: "",
    });
  };

  return (
    <div>
      <h2>Pet Registration</h2>

      <form onSubmit={handleSubmit}>

        <div>
          <label>Owner Name</label>
          <br />
          <input
            type="text"
            name="owner"
            value={pet.owner}
            onChange={handleChange}
            placeholder="Enter owner name"
          />
        </div>

        <br />

        <div>
          <label>Phone Number</label>
          <br />
          <input
            type="text"
            name="phone"
            value={pet.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
          />
        </div>

        <br />

        <div>
          <label>Pet Type</label>
          <br />
          <input
            type="text"
            name="pet"
            value={pet.pet}
            onChange={handleChange}
            placeholder="Enter pet type"
          />
        </div>

        <br />

        <button type="submit">Save Pet</button>

      </form>
    </div>
  );
};

export default PetForm;