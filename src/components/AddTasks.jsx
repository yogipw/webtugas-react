import React, { useState } from "react";
import taskData from "../data/tasks.json";

export default function AddTasks() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const addTask = (event) => {
    event.preventDefault();

    if (title && description) {
      const newTask = {
        id: (taskData.length + 1).toString(),
        title: title,
        description: description
      };

      taskData.push(newTask);

      // Simpan perubahan ke JSON
      // Misalnya menggunakan localStorage
      localStorage.setItem("tasks", JSON.stringify(taskData));

      // Reset input fields
      setTitle("");
      setDescription("");

      alert("Tugas berhasil ditambahkan.");
    } else {
      alert("Mohon isi semua field.");
    }
  };

  return (
    <div className="container">
      <h3>Tambah Tugas</h3>
      <form onSubmit={addTask}>
        <div className="form-group">
          <label htmlFor="title">Judul</label>
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="Masukkan judul tugas"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Deskripsi</label>
          <textarea
            className="form-control"
            id="description"
            rows="3"
            placeholder="Masukkan deskripsi tugas"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Tambah
        </button>
      </form>
    </div>
  );
}
