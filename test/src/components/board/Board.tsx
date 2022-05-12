import React, {useMemo} from "react";
import BoardCell, {BoardCellType} from "./components/BoardCell";
import styles from './Board.module.scss';

interface IBoardProps {
    data: BoardCellType[][]
}

const Board: React.FC<IBoardProps> = (props) => {

    const cells = useMemo(() => {
        const cellsList: JSX.Element[] = [];

        for (let i = 0; i < props.data.length; i++) {
            const rowData = props.data[i];
            for (let j = 0; j < rowData.length; j++) {
                const value = rowData[j];
                const key = `${i}-${j}-${value}`;
                cellsList.push(
                    <BoardCell key={key} type={value}/>
                );
            }
        }

        return cellsList;
    }, [props.data])

    const maxWrapperWidth = useMemo(() => props.data.length * (50), [props.data])

    return <div className={styles.boardWrapper} style={{width: `${maxWrapperWidth}px`}}>
        {cells}
    </div>
}

export default Board;
