import React, {useEffect, useState} from "react";
import Board from "../board";
import styles from './Body.module.scss';
import {getRandomBinaryMatrix} from "../../utils/random";

interface IBodyComponentProps {
}

const Body: React.FC<IBodyComponentProps> = function () {
    const [data, setData] = useState(getRandomBinaryMatrix())

    useEffect(() => {
        setInterval(() => {
            setData(getRandomBinaryMatrix())
        }, 1000)
    }, [])

    return (
        <div className={styles.wrapper}>
            <Board data={data}/>
        </div>
    )
}

export default Body;
