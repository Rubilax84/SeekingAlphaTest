import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import Board from "../board";
import styles from './Body.module.scss';
import {getNextMatrixState} from "../../utils/matrix";
import {test1, test2, test3, test4} from "../../mock/matrix";
import {Binary} from "../../model";

interface IBodyComponentProps {
    refreshInterval?: number // ms
}

const Body: React.FC<IBodyComponentProps> = function (props) {
    const [data, setData] = useState(test2);
    const timoutRef = useRef<NodeJS.Timeout | undefined>();

    const testsList = useMemo(() => [test1, test2, test3, test4], [])

    const runTest = useCallback((value: Binary[][]) => {
        timoutRef.current && clearTimeout(timoutRef.current);
        setData(value);
    }, [])

    useEffect(() => {
        timoutRef.current = setTimeout(() => {
            setData(getNextMatrixState(data))
        }, props.refreshInterval || 400);

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
            <Board data={data}/>
        </div>
    )
}

export default Body;
