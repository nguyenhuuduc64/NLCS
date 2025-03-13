import { useContext, useState, useEffect } from 'react';
import { itemsContext } from '../../../App';
import classNames from 'classnames/bind';
import styles from '../../../pages/Home/home.module.scss';
import OutputTable from '../../OutputTable/outputTable';
import { setPA, sortByID } from '../utils';

const cx = classNames.bind(styles);

function Greedy({ itemsArray, display }) {
    const {
        trongluong,
        greedy,
        setTotalValueGreedy,
        setExportArrayResult,
        setExecutionTimeGreedy,
        executionTimeGreedy,
        setPAGreedy,
        setRemainingWeightGreedy,
    } = useContext(itemsContext);

    const [remainingWeight, setRemainingWeight] = useState(parseInt(trongluong));
    const [dsdv, setDsdv] = useState(() => JSON.parse(JSON.stringify(itemsArray)));
    const [solution, setSolution] = useState(Array(itemsArray.length).fill(0));

    useEffect(() => {
        let startTime = window.performance.now();

        let newArr = JSON.parse(JSON.stringify(itemsArray));
        setPA(newArr);
        /*HÀM CHÍNH********************************************************/
        let totalValue = 0;
        let newRemainingWeight = parseInt(trongluong);

        for (let i = 0; i < newArr.length; i++) {
            let templePA = Math.min(Math.floor(newRemainingWeight / newArr[i].TL), newArr[i].SL || Infinity);
            newArr[i].PA = templePA;
            totalValue += newArr[i].GT * templePA;
            newRemainingWeight -= newArr[i].TL * templePA;
        }
        /**************************************************************** */
        let endTime = window.performance.now();
        let executionTime = endTime - startTime || 0.0001;
        setExecutionTimeGreedy(executionTime.toFixed(4));

        setDsdv(newArr);
        setTotalValueGreedy(totalValue);
        setRemainingWeightGreedy(newRemainingWeight);
        setRemainingWeight(newRemainingWeight);
    }, [greedy]);
    useEffect(() => {
        if (dsdv.length > 0) {
            let PATemple = sortByID(dsdv).map((dv) => dv.PA);
            setPAGreedy(PATemple);
            setExportArrayResult(dsdv);
        }
    }, [dsdv]);
    return (
        display && (
            <div>
                <OutputTable
                    sapxep={true}
                    itemsArray={dsdv}
                    PA={true}
                    remainingWeight={remainingWeight}
                    totalValue={dsdv.reduce((sum, item) => sum + item.PA * item.GT, 0)}
                    name="Thuật toán Tham lam"
                />
                <p>Thời gian thực thi thuật toán Tham lam: {executionTimeGreedy} ms</p>
            </div>
        )
    );
}

export default Greedy;
