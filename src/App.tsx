import React, { useState } from 'react';
import { useTodos } from './hooks/useTodos';
import { TodoItem } from './components/TodoItem';

export type Filter = "all" | "active" | "completed";

const App: React.FC = () => {
    const { todos, addTodo, toggleTodo, clearCompleted } = useTodos();
    const [filter, setFilter] = useState<Filter>("all");
    const [input, setInput] = useState("");

    const filteredTodos = todos.filter((t) => {
        if (filter === "active") return !t.completed;
        if (filter === "completed") return t.completed;
        return true;
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim()) {
            addTodo(input.trim());
            setInput("");
        }
    };

    const itemsLeft = todos.filter((t) => !t.completed).length;

    return (
        <div className="app">
            <h1 className="title">todos</h1>
            <div className="todo-container">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="new-todo"
                        placeholder="What needs to be done?"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                </form>

                <ul className="todo-list">
                    {filteredTodos.map((todo) => (
                        <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} />
                    ))}
                </ul>

                {todos.length > 0 && (
                    <footer className="footer">
                        <span>{itemsLeft} items left</span>
                        <div className="filters">
                            <button
                                className={filter === "all" ? "selected" : ""}
                                onClick={() => setFilter("all")}
                            >
                                All
                            </button>
                            <button
                                className={filter === "active" ? "selected" : ""}
                                onClick={() => setFilter("active")}
                            >
                                Active
                            </button>
                            <button
                                className={filter === "completed" ? "selected" : ""}
                                onClick={() => setFilter("completed")}
                            >
                                Completed
                            </button>
                        </div>
                        <button onClick={clearCompleted}>Clear completed</button>
                    </footer>
                )}
            </div>
        </div>
    );
};

export default App;