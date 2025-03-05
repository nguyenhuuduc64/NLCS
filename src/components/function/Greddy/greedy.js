import { useContext, useState, useEffect, useMemo } from 'react';
import { itemsContext } from '../../../App';
import classNames from 'classnames/bind';
import styles from '../../../pages/Home/home.module.scss';
import { arrange } from '../arrange/arrange';
import OutputTable from '../../OutputTable/outputTable';
import { setPA, setSolutionBeforeSort, setSolutionForItemsArray } from '../utils';
const cx = classNames.bind(styles);

function Greedy({ itemsArray }) {
    const {
        trongluong,
        inputState,
        setInputState,
        greedy,
        totalValueGreedy,
        setTotalValueGreedy,
        exportArrayResult,
        setExportArrayResult,
    } = useContext(itemsContext);
    console.log(typeof trongluong);
    const [remainingWeight, setRemainingWeight] = useState(parseInt(trongluong));
    const { currentIndex, setCurrentIndex } = useContext(itemsContext);
    const [solution, setSolution] = useState(Array(itemsArray.length).fill(0));

    const sortedItems = arrange(itemsArray);
    const [dsdv, setDsdv] = useState(() => JSON.parse(JSON.stringify(sortedItems)));

    useEffect(() => {
        // Mỗi khi branchAndBound thay đổi, reset dsdv
        let newArr = JSON.parse(JSON.stringify(sortedItems));
        setCurrentIndex(0);
        setTotalValueGreedy(0);
        setPA(newArr);
        setDsdv(newArr);
    }, [greedy]);
    useEffect(() => {
        if (currentIndex < dsdv.length) {
            const id = setTimeout(() => {
                var templePA;
                templePA =
                    Math.floor(dsdv[currentIndex].SL && remainingWeight / dsdv[currentIndex].TL) > dsdv[currentIndex].SL
                        ? dsdv[currentIndex].SL
                        : Math.floor(remainingWeight / dsdv[currentIndex].TL);

                setSolution((prevSolution) => {
                    const newSolution = [...prevSolution];
                    newSolution[currentIndex] = templePA;

                    setDsdv((prevDsdv) => {
                        const newDsdv = [...prevDsdv];
                        newDsdv[currentIndex] = { ...newDsdv[currentIndex], PA: templePA };
                        return newDsdv;
                    });

                    return newSolution;
                });

                let templeTotalValue = totalValueGreedy + dsdv[currentIndex].GT * templePA;
                setTotalValueGreedy(templeTotalValue);

                setRemainingWeight((prevWeight) => prevWeight - dsdv[currentIndex].TL * templePA);

                setCurrentIndex((prev) => prev + 1);
            }, 500);

            return () => clearTimeout(id);
        }
    }, [currentIndex]);
    /*****************************lam cho export array */
    setExportArrayResult(dsdv);
    return (
        <OutputTable
            sapxep={true}
            itemsArray={dsdv}
            PA={true}
            currentIndex={currentIndex}
            remainingWeight={remainingWeight}
            totalValue={totalValueGreedy}
        />
    );
}

export default Greedy;
