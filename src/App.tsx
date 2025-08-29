import React, { useState } from 'react';
import { useTodos } from './hooks/useTodos';
import { TodoItem } from './components/TodoItem';

const Filter = {
    ALL: 'All',
    ACTIVE: 'Active',
    COMPLETED: 'Completed'
};

const App: React.FC = () => {
    const { todos, addTodo, toggleTodo, clearCompleted } = useTodos();
    const [filter, setFilter] = useState<string>(Filter.ALL);
    const [input, setInput] = useState("");

    const filteredTodos = todos.filter((todo) => {
        if (filter === Filter.ACTIVE) { return !todo.completed; }
        if (filter === Filter.COMPLETED) { return todo.completed; }
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
                                className={filter === Filter.ALL ? "selected" : ""}
                                onClick={() => setFilter(Filter.ALL)}
                            >
                                {Filter.ALL}
                            </button>
                            <button
                                className={filter === Filter.ACTIVE ? "selected" : ""}
                                onClick={() => setFilter(Filter.ACTIVE)}
                            >
                                {Filter.ACTIVE}
                            </button>
                            <button
                                className={filter === Filter.COMPLETED ? "selected" : ""}
                                onClick={() => setFilter(Filter.COMPLETED)}
                            >
                                {Filter.COMPLETED}
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