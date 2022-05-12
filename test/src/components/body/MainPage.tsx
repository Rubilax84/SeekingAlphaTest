import React, {useCallback, useEffect, useRef, useState} from "react";
import Board from "../board";
import styles from './MainPage.module.scss';
import {getNextMatrixState} from "../../utils/matrix";
import {Binary} from "../../model";
import {useTestsList} from "../../useTestsList";

interface IBodyComponentProps {
    refreshInterval?: number // ms
}

const MainPage: React.FC<IBodyComponentProps> = function (props) {
    /* initializing component state */
    const [data, setData] = useState<Binary[][] | undefined>(undefined);

    /* timeout ref needs to reset on new data */
    const timoutRef = useRef<NodeJS.Timeout | undefined>();

    /* static data ( sorry for that ) */
    const testsList = useTestsList();

    /* changing a current board data  */
    const runTest = useCallback((value: Binary[][]) => {
        timoutRef.current && clearTimeout(timoutRef.current);
        setData(value);
    }, [])

    /* ticker */
    useEffect(() => {
        /* next iterations only if we have a data */
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

export default MainPage;
