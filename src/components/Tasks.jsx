import { useEffect, useState } from "react";
import taskData from "../data/tasks.json";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCompleted, setShowCompleted] = useState(false);
  const [showTasks, setShowTasks] = useState(true);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    const storedCompletedTasks = localStorage.getItem("completedTasks");

    if (storedTasks && storedCompletedTasks) {
      setTasks(JSON.parse(storedTasks));
      setCompletedTasks(JSON.parse(storedCompletedTasks));
      setLoading(false);
    } else {
      // Simulating an asynchronous task fetching
      setTimeout(() => {
        setTasks(taskData);
        setLoading(false);
      }, 2000);
    }
  }, []);

  const handleTaskComplete = (taskId) => {
    const completedTask = tasks.find((task) => task.id === taskId);

    if (completedTask) {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      setCompletedTasks((prevCompletedTasks) => [...prevCompletedTasks, completedTask]);
      // Saving changes to localStorage
      localStorage.setItem("tasks", JSON.stringify(tasks.filter((task) => task.id !== taskId)));
      localStorage.setItem(
        "completedTasks",
        JSON.stringify([...completedTasks, completedTask])
      );
    }
  };

  const handleTaskDelete = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    // Saving changes to localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks.filter((task) => task.id !== taskId)));
  };

  const toggleCompletedTasks = () => {
    setShowCompleted((prevShowCompleted) => !prevShowCompleted);
  };

  const toggleTasks = () => {
    setShowTasks((prevShowTasks) => !prevShowTasks);
  };

  return (
    <div className="center justify-content-center ">
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <>
          <div className="col-12">
            <h3>Tugas</h3>
            <button className="btn btn-primary btn-sm mb-2" onClick={toggleCompletedTasks}>
              {showCompleted ? "Tampilkan Semua Tugas" : "Tampilkan Tugas Selesai"}
            </button>
            <button className="btn btn-primary btn-sm mb-2" onClick={toggleTasks}>
              {showTasks ? "Sembunyikan Tugas Belum Selesai" : "Tampilkan Tugas Belum Selesai"}
            </button>
            {showTasks && (tasks.length > 0 ? (
              tasks.map((task) => (
                <div className="card mb-4" key={task.id}>
                  <div className="card-body">
                    <h5 className="card-title">{task.title}</h5>
                    <p className="card-text">{task.description}</p>
                    <div className="d-flex justify-content-end">
                      <button
                        className="btn btn-primary btn-sm mr-2"
                        onClick={() => handleTaskComplete(task.id)}
                      >
                        Selesai
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleTaskDelete(task.id)}
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>Tidak ada tugas yang belum selesai.</p>
            ))}
          </div>

          {showCompleted && (
            <div className="col-12">
              <h3>Tugas Selesai</h3>
              {completedTasks.length > 0 ? (
                completedTasks.map((task) => (
                  <div className="card mb-4" key={task.id}>
                    <div className="card-body">
                      <h5 className="card-title">{task.title}</h5>
                      <p className="card-text">{task.description}</p>
                      <div className="text-center">
                        <span className="text-success">&#10004;</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>Tidak ada tugas yang telah selesai.</p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
