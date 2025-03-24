import {Button} from "antd";
import {FC} from "react";

interface Props {
    activeTodosCount: number,
    clearCompleted: () => void,
    isBtnDisabled: boolean,
}

export const TodoFooter: FC<Props> = (props) => {
    const {activeTodosCount, clearCompleted, isBtnDisabled} = props;

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 16px'
        }}>
            <div>{activeTodosCount} items left</div>
            <Button
                type="link"
                onClick={clearCompleted}
                disabled={isBtnDisabled}
            >
                Clear completed
            </Button>
        </div>
    )
}