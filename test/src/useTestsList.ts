import {useMemo} from "react";
import {test1, test2, test3, test4, test5} from "./mock/matrix";

export function useTestsList() {
    return useMemo(() => [test1, test2, test3, test4, test5], [])
}
