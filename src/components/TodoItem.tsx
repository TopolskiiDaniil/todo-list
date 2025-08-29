import React from 'react';
import { type Todo } from '../hooks/useTodos';
import { RoundCheckbox } from '../ui/round-checkbox';

interface Props {
    todo: Todo;
    toggleTodo: (id: number) => void;
}

export const TodoItem: React.FC<Props> = ({ todo, toggleTodo }) => {
    return (
        <li className="todo-item">
            <label>
                <RoundCheckbox
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                />
                <span className={todo.completed ? 'completed' : ''}>{todo.text}</span>
            </label>
        </li>
    );
};