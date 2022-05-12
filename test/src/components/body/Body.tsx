import React, {useCallback, useEffect, useRef, useState} from "react";
import Board from "../board";
import styles from './Body.module.scss';
import {getNextMatrixState} from "../../utils/matrix";
import {Binary} from "../../model";
import {useTestsList} from "../../useTestsList";

interface IBodyComponentProps {
    refreshInterval?: number // ms
}

const Body: React.FC<IBodyComponentProps> = function (props) {
    const [data, setData] = useState<Binary[][] | undefined>(undefined);
    const timoutRef = useRef<NodeJS.Timeout | undefined>();

    const testsList = useTestsList();

    const runTest = useCallback((value: Binary[][]) => {
        timoutRef.current && clearTimeout(timoutRef.current);
        setData(value);
    }, [])

    useEffect(() => {
        if (data) {
            timoutRef.current = setTimeout(() => {
                setData(getNextMatrixState(data))
            }, props.refreshInterval || 400);
        }
    }, [data, props.refreshInterval])

    return (
        <div className={styles.wrapper}>
            {/* tests button */}
            <div className={styles.headerPanel}>
                {testsList.map((test, idx) => {
                    return <button key={'test-' + idx} onClick={() => runTest(test)}>Test {idx + 1}</button>
                })}
            </div>

            {/* main board */}
            {data && <Board data={data}/>}
        </div>
    )
}

export default Body;
