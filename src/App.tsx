import './App.css'
import {Form, List, Space, Tabs, TabsProps} from "antd";
import {nanoid} from "nanoid";
import {useState} from "react";
import {TodoItem} from "./components/TodoItem/TodoItem.tsx";
import {Todo, Todos} from "./types.ts";
import {TodoFooter} from "./components/TodoFooter/TodoFooter.tsx";
import {TodoForm} from "./components/TodoForm/TodoForm.tsx";

const tabs: TabsProps['items'] = [
    {
        key: 'All',
        label: 'All',
    },
    {
        key: 'Active',
        label: 'Active',
    },
    {
        key: 'Completed',
        label: 'Completed',
    },
];

const initialData: Todos = [
    {
        id: nanoid(),
        value: 'Помыть посуду',
        done: true,
    },
    {
        id: nanoid(),
        value: 'Приготовить завтрак',
        done: false,
    },
    {
        id: nanoid(),
        value: 'Откликнуться на вакансию',
        done: false,
    }
];

function App() {
    const [form] = Form.useForm();
    const [todos, setTodos] = useState<Array<Todo>>(initialData);
    const [activeTab, setActiveTab] = useState<string>('All');

    const addTodo = (newTodo: string) => {
        setTodos((prevState) => [...prevState, {
            id: nanoid(),
            value: newTodo,
            done: false,
        }])
        form.resetFields();
    }

    const deleteTodo = (id: string) => {
        setTodos((prevState) => prevState.filter((todo) => todo.id !== id))
    }

    const toggleTodo = (id: string) => {
        setTodos((prevState) => prevState.map((todo) =>
            todo.id === id ? {...todo, done: !todo.done} : todo
        ))
    }

    const clearCompleted = () => {
        setTodos((prevState) => prevState.filter((todo) => !todo.done))
    }

    const filteredTodos = () => {
        switch (activeTab) {
            case 'Active':
                return todos.filter((todo) => !todo.done);
            case 'Completed':
                return todos.filter((todo) => todo.done);
            default:
                return todos;
        }
    }

    const activeTodosCount = todos.filter(todo => !todo.done).length;

    return (
        <div className="app-container">
            <Space direction="vertical" style={{width: '100%'}}>
                <TodoForm form={form} onFinish={addTodo} />

                <List
                    bordered
                    dataSource={filteredTodos()}
                    header={
                        <Tabs
                            activeKey={activeTab}
                            items={tabs}
                            onChange={setActiveTab}
                            centered
                        />
                    }
                    footer={
                        <TodoFooter activeTodosCount={activeTodosCount} clearCompleted={clearCompleted}
                                    isBtnDisabled={!todos.some(todo => todo.done)}/>
                    }
                    renderItem={(todo) => (
                        <TodoItem todo={todo} onToggle={toggleTodo} onDelete={deleteTodo}/>
                    )}
                />
            </Space>
        </div>
    )
}

export default App