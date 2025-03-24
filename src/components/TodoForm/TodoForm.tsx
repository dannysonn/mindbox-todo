import {FC} from "react";
import {Button, Form, FormInstance, Input, Space} from "antd";

interface Props {
    form: FormInstance,
    onFinish: (value: string) => void,
}

export const TodoForm: FC<Props> = (props) => {
    const {form, onFinish} = props;

    return (
        <Form
            form={form}
            name="basic"
            onFinish={(values: { todoInput: string }) => onFinish(values.todoInput)}
        >
            <Space.Compact style={{width: '100%'}}>
                <Form.Item<string>
                    name="todoInput"
                    rules={[{required: true, message: 'Пожалуйста, введите новый ToDo'}]}
                    style={{flex: 1}}
                >
                    <Input placeholder={'What needs to be done?'}/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Add ToDo
                    </Button>
                </Form.Item>
            </Space.Compact>
        </Form>
    )
}