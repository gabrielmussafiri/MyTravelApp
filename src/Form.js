import { useState } from "react";

export default function Form({ onAddItems }) {
  // State en charge to stock the input fields(String)
  const [description, setDescription] = useState("");
  // State en charge to stock the oprion  fields(number)
  const [quantity, setQuantity] = useState(1);
  //  State en charge to stock items to be displayed in the UI (an Array)

  function handleSubmit(e) {
    // block the all loading page on submission
    e.preventDefault();
    // constrole the empty description submission
    if (!description) return;
    // Add new item
    const newItem = { description, quantity, package: false, id: Date.now() };
    console.log(newItem);
    // call the function to Display the new item in the UI
    onAddItems(newItem);

    // Reset default value as before submitting
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {/* create an array of 20 number dynamique for inisde of Option */}
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Whrite yout Item here.."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
