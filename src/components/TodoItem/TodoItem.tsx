import {FC} from "react";
import {Button, Checkbox, List} from "antd";
import {CloseOutlined} from "@ant-design/icons";
import {Todo} from "../../types.ts";

interface Props {
    todo: Todo;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
}

export const TodoItem: FC<Props> = (props) => {
    const {todo, onToggle, onDelete} = props;

    return (
        <List.Item
            className={todo.done ? 'completed-todo' : ''}
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}
        >
            <Checkbox
                checked={todo.done}
                onChange={() => onToggle(todo.id)}
            >
                <span style={{
                    textDecoration: todo.done ? 'line-through' : 'none',
                    opacity: todo.done ? 0.6 : 1
                }}>
                    {todo.value}
                </span>
            </Checkbox>
            <Button
                type="text"
                icon={<CloseOutlined/>}
                onClick={() => onDelete(todo.id)}
                danger
            />
        </List.Item>
    )
}