import { useState } from "react";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: true },
//   { id: 3, description: "Bag", quantity: 1, packed: false },
//   { id: 4, description: "Shoes", quantity: 1, packed: true },
// ];

function App() {
  const [items, setItems] = useState([]);
  // Function to display items in the UI
  function handleItem(item) {
    setItems((items) => [...items, item]);
  }
  // Function to delete items
  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }
  // Function to update a check box
  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleClearList() {
    setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleItem} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItems={handleToggleItem}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}

export default App;

// Component Logo

function Logo() {
  return (
    <div>
      <h1>🏝️My Travel List🧳</h1>
    </div>
  );
}

//  Component Form

function Form({ onAddItems }) {
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

// Component PackingList

function PackingList({ items, onDeleteItem, onToggleItems, onClearList }) {
  const [sortBy, SetSortBy] = useState("input");

  let sortedItems;
  if (sortBy === "input") sortedItems = items;

  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            onDeleteItem={onDeleteItem}
            key={item.id}
            onToggleItems={onToggleItems}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => SetSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={onClearList}>Clear list</button>
      </div>
    </div>
  );
}

// Component Item
function Item({ item, onDeleteItem, onToggleItems }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => {
          onToggleItems(item.id);
        }}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity}
        {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

// Component Stats
function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats ">
        <em>Start some items to your packing list</em>
      </p>
    );

  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);

  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You got everything! Ready to Go Bhuti"
          : `💼You have ${numItems} items on your list, and you already packed
        ${numPacked} (
        ${percentage}%)`}
      </em>
    </footer>
  );
}
