import { useState } from 'react';

export interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

export const useTodos = () => {
    const [todos, setTodos] = useState<Todo[]>([]);

    const addTodo = (text: string) => {
        setTodos((prev) => [
            ...prev,
            { id: Date.now(), text, completed: false },
        ]);
    };

    const toggleTodo = (id: number) => {
        setTodos((prev) =>
            prev.map((t) =>
                t.id === id ? { ...t, completed: !t.completed } : t
            )
        );
    };

    const clearCompleted = () => {
        setTodos((prev) => prev.filter((t) => !t.completed));
    };

    return { todos, addTodo, toggleTodo, clearCompleted };
};