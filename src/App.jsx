import { useState, useEffect } from "react";
import "./App.css";

const API_URL = "https://6a09ee7de7e3f433d4839895.mockapi.io/tasks";

function App() {
    const [tasks, setTasks] = useState([]);
    const [inputValue, setInputValue] = useState("");

    const [editingId, setEditingId] = useState(null);
    const [editValue, setEditValue] = useState("");

    useEffect(() => {
        fetch(API_URL)
            .then((res) => res.json())
            .then((data) => setTasks(data))
            .catch((err) => console.error("Lỗi fetch data:", err));
    }, []);

    // CREATE:

    const handleAddTask = () => {
        const trimmedValue = inputValue.trim();
        if (!trimmedValue) return;

        const tempId = `temp-${Date.now()}`;
        const tempTask = {
            id: tempId,
            title: trimmedValue,
            completed: false,
        };

        setTasks((prev) => [...prev, tempTask]);
        setInputValue("");

        const newTaskForAPI = { title: trimmedValue, completed: false };

        fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTaskForAPI),
        })
            .then((res) => res.json())
            .then((realTask) => {
                setTasks((prev) =>
                    prev.map((task) => (task.id === tempId ? realTask : task)),
                );
            })
            .catch((err) => {
                console.error("Lỗi khi thêm trên server:", err);

                setTasks((prev) => prev.filter((task) => task.id !== tempId));
                alert("Lỗi mạng! Không thể lưu công việc.");
            });
    };

    const handleKeyDownAdd = (e) => {
        if (e.key === "Enter") handleAddTask();
    };

    //  DELETE
    const handleDelete = (id) => {
        setTasks((prev) => prev.filter((task) => task.id !== id));

        fetch(`${API_URL}/${id}`, { method: "DELETE" });
    };

    //  TOGGLE DONE
    const handleToggleDone = (id, currentStatus) => {
        const newStatus = !currentStatus;
        setTasks((prev) =>
            prev.map((task) =>
                task.id === id ? { ...task, completed: newStatus } : task,
            ),
        );

        fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ completed: newStatus }),
        });
    };

    //  EDIT / SAVE
    const handleStartEdit = (task) => {
        setEditingId(task.id);
        setEditValue(task.title);
    };

    const handleSaveEdit = (id) => {
        if (!editValue.trim()) return;

        setTasks((prev) =>
            prev.map((task) =>
                task.id === id ? { ...task, title: editValue } : task,
            ),
        );
        setEditingId(null);

        fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: editValue }),
        });
    };

    const handleKeyDownEdit = (e, id) => {
        if (e.key === "Enter") handleSaveEdit(id);
    };

    // RENDER GIAO DIỆN
    return (
        <div className="container">
            <h1 className="heading">TO DO APP</h1>
            <div className="add-task">
                <input
                    id="input"
                    type="search"
                    placeholder="Type your task here..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDownAdd}
                />
                <button id="btn" className="btn" onClick={handleAddTask}>
                    Add Task
                </button>
            </div>

            <table id="table">
                <thead>
                    <tr>
                        <th>Number</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task, index) => {
                        const isCompleted =
                            task.completed === true ||
                            task.completed === "true";
                        const textStyle = isCompleted
                            ? { textDecoration: "line-through", color: "#888" }
                            : {};
                        const isEditing = editingId === task.id;

                        return (
                            <tr key={task.id}>
                                <td>{index + 1}</td>
                                <td style={textStyle}>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            className="edit-input"
                                            value={editValue}
                                            onChange={(e) =>
                                                setEditValue(e.target.value)
                                            }
                                            onKeyDown={(e) =>
                                                handleKeyDownEdit(e, task.id)
                                            }
                                            autoFocus
                                            style={{
                                                padding: "5px",
                                                fontSize: "16px",
                                                width: "80%",
                                            }}
                                        />
                                    ) : (
                                        task.title
                                    )}
                                </td>
                                <td className="action-cell">
                                    <button
                                        type="button"
                                        className="btn-action btn-done"
                                        onClick={() =>
                                            handleToggleDone(
                                                task.id,
                                                isCompleted,
                                            )
                                        }
                                    >
                                        Done <span className="icon-box">✔</span>
                                    </button>

                                    {isEditing ? (
                                        <button
                                            type="button"
                                            className="btn-action btn-edit"
                                            style={{
                                                backgroundColor: "#2196f3",
                                            }}
                                            onClick={() =>
                                                handleSaveEdit(task.id)
                                            }
                                        >
                                            Save{" "}
                                            <span className="icon-box">💾</span>
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            className="btn-action btn-edit"
                                            style={{
                                                backgroundColor: "#ff9800",
                                            }}
                                            onClick={() =>
                                                handleStartEdit(task)
                                            }
                                        >
                                            Edit{" "}
                                            <span className="icon-box">✏️</span>
                                        </button>
                                    )}

                                    <button
                                        type="button"
                                        className="btn-action btn-delete"
                                        onClick={() => handleDelete(task.id)}
                                    >
                                        Delete{" "}
                                        <span className="icon-box">✖</span>
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default App;
