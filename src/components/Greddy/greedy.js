import { useContext, useState, useEffect, useMemo } from 'react';
import { itemsContext } from '../../App';
import classNames from 'classnames/bind';
import styles from '../../../src/pages/Home/home.module.scss';

const cx = classNames.bind(styles);

function Greedy({ itemsArray }) {
    const { trongluong } = useContext(itemsContext);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [solution, setSolution] = useState(Array(itemsArray.length).fill(0)); // Lưu PA
    const [remainingWeight, setRemainingWeight] = useState(trongluong);

    var sortedItems = [...itemsArray];
    for (let i = 0; i < sortedItems.length; i++) {
        for (let j = i + 1; j < sortedItems.length; j++) {
            if (sortedItems[i].DG < sortedItems[j].DG) {
                let temp = sortedItems[i];
                sortedItems[i] = sortedItems[j];
                sortedItems[j] = temp;
            }
        }
    }

    useEffect(() => {
        if (currentIndex < sortedItems.length) {
            const id = setTimeout(() => {
                setSolution((prevSolution) => {
                    const newSolution = [...prevSolution];
                    newSolution[currentIndex] = Math.floor(remainingWeight / sortedItems[currentIndex].TL);
                    return newSolution;
                });

                setRemainingWeight((prevWeight) => {
                    return (
                        prevWeight -
                        sortedItems[currentIndex].TL * Math.floor(prevWeight / sortedItems[currentIndex].TL)
                    );
                });

                setCurrentIndex((prev) => prev + 1);
            }, 1000);

            return () => clearTimeout(id);
        }
    }, [currentIndex, remainingWeight]); // Chỉ chạy khi `currentIndex` thay đổi

    return (
        <>
            <p>Trọng lượng còn lại: {remainingWeight}</p>
            <div className={cx('output-table')}>
                {sortedItems.length > 0 && (
                    <table className={cx('table')}>
                        <thead className={cx('thead')}>
                            <tr>
                                <th>Tên</th>
                                <th>Trọng lượng</th>
                                <th>Giá trị</th>
                                <th>Đơn giá</th>
                                <th>Phương án</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedItems.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.ten || 'N/A'}</td>
                                    <td>{item.TL || 0}</td>
                                    <td>{item.GT || 0}</td>
                                    <td>{item.DG || 0}</td>
                                    <td
                                        style={{
                                            backgroundColor: index === currentIndex ? 'red' : 'white',
                                        }}
                                    >
                                        {solution[index]}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    );
}

export default Greedy;
