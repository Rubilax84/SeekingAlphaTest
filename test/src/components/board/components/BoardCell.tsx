import React from "react";
import cx from 'classnames';
import styles from './BoardCell.module.scss';

export enum BoardCellType {
    Alive = 1,
    Dead = 0
}

interface IBoardCellProps {
    type: BoardCellType;
}

const BoardCell: React.FC<IBoardCellProps> = function (props) {
    return <div className={cx(styles.cellWrapper, {
        [styles.alive]: props.type === BoardCellType.Alive,
        [styles.dead]: props.type === BoardCellType.Dead,
    })}></div>
}

export default BoardCell;
