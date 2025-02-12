import { useContext, useState, useEffect, useMemo } from 'react';
import { itemsContext } from '../../../App';
import classNames from 'classnames/bind';
import styles from '../../../pages/Home/home.module.scss';
import { arrange } from '../arrange/arrange';
import OutputTable from '../../OutputTable/outputTable';

const cx = classNames.bind(styles);

function Greedy({ itemsArray }) {
    const { trongluong, inputState, setInputState, greedy } = useContext(itemsContext);
    const [remainingWeight, setRemainingWeight] = useState(trongluong);
    const { currentIndex, setCurrentIndex } = useContext(itemsContext);
    const [solution, setSolution] = useState(Array(itemsArray.length).fill(0)); // Lưu PA

    var sortedItems = arrange(itemsArray);

    useEffect(() => {
        if (currentIndex < sortedItems.length) {
            const id = setTimeout(() => {
                var templePA;
                templePA =
                    Math.floor(remainingWeight / sortedItems[currentIndex].TL) > sortedItems[currentIndex].SL
                        ? sortedItems[currentIndex].SL
                        : Math.floor(remainingWeight / sortedItems[currentIndex].TL);
                setSolution((prevSolution) => {
                    const newSolution = [...prevSolution];

                    newSolution[currentIndex] = templePA;
                    sortedItems[currentIndex].PA = newSolution[currentIndex];
                    return newSolution;
                });

                setRemainingWeight((prevWeight) => {
                    return prevWeight - sortedItems[currentIndex].TL * templePA;
                });

                setCurrentIndex((prev) => {
                    return prev + 1;
                });
            }, 1000);

            return () => clearTimeout(id);
        }
    }, [currentIndex, remainingWeight]); // Chỉ chạy khi `currentIndex` thay đổi
    console.log(remainingWeight);
    return (
        <OutputTable
            sapxep={true}
            itemsArray={sortedItems}
            PA={true}
            currentIndex={currentIndex}
            remainingWeight={remainingWeight}
        />
    );
}

export default Greedy;
