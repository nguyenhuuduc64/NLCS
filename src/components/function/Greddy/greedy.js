import { useContext, useState, useEffect, useMemo } from 'react';
import { itemsContext } from '../../../App';
import classNames from 'classnames/bind';
import styles from '../../../pages/Home/home.module.scss';
import { arrange } from '../arrange/arrange';
import OutputTable from '../../OutputTable/outputTable';
import { setPA, setSolutionBeforeSort, setSolutionForItemsArray } from '../utils';
const cx = classNames.bind(styles);

function Greedy({ itemsArray }) {
    const { trongluong, inputState, setInputState, greedy, totalValueGreedy, setTotalValueGreedy } =
        useContext(itemsContext);
    const [remainingWeight, setRemainingWeight] = useState(trongluong);
    const { currentIndex, setCurrentIndex } = useContext(itemsContext);
    const [solution, setSolution] = useState(Array(itemsArray.length).fill(0));
    // Lưu PA
    const templeItemsArray = useMemo(() => arrange(itemsArray), [itemsArray]);
    const sortedItems = JSON.parse(JSON.stringify(templeItemsArray));
    useEffect(() => {
        if (currentIndex < sortedItems.length) {
            const id = setTimeout(() => {
                var templePA;
                templePA =
                    Math.floor(sortedItems[currentIndex].SL && remainingWeight / sortedItems[currentIndex].TL) >
                    sortedItems[currentIndex].SL
                        ? sortedItems[currentIndex].SL
                        : Math.floor(remainingWeight / sortedItems[currentIndex].TL);

                setSolution((prevSolution) => {
                    const newSolution = [...prevSolution];

                    newSolution[currentIndex] = templePA;
                    sortedItems[currentIndex].PA = newSolution[currentIndex];
                    return newSolution;
                });
                let templeTotalValue = totalValueGreedy + sortedItems[currentIndex].GT * templePA;
                setTotalValueGreedy(templeTotalValue);

                setRemainingWeight((prevWeight) => {
                    return prevWeight - sortedItems[currentIndex].TL * templePA;
                });

                setCurrentIndex((prev) => prev + 1);
            }, 1000);

            return () => clearTimeout(id);
        }
    }, [currentIndex, remainingWeight]); // Chỉ chạy khi `currentIndex` thay đổi
    setSolutionForItemsArray(sortedItems, solution);
    let resultItemsArray = setSolutionBeforeSort(sortedItems, itemsArray);
    return (
        <OutputTable
            sapxep={false}
            itemsArray={sortedItems}
            PA={true}
            currentIndex={currentIndex}
            remainingWeight={remainingWeight}
            totalValue={totalValueGreedy}
        />
    );
}

export default Greedy;
