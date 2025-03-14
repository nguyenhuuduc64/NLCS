import React, { useState, useRef, useContext, useEffect } from 'react';
import { Item } from '../../Items';
import OutputTable from '../OutputTable/outputTable';

import { itemsContext } from '../../App';
import { arrange } from '../function/arrange/arrange';
import classNames from 'classnames/bind';
import styles from './inputTable.module.scss';
import { errorName, exceptionData } from '../function/utils';
const cx = classNames.bind(styles);
function InputTable() {
    const [rowCount, setRowCount] = useState(0);
    const { itemsArrayHand, setItemsArrayHand, itemsArrayHandState, trongluong, setTrongluong } =
        useContext(itemsContext);
    const [submit, setSubmit] = useState(false);
    const inputRef = useRef();
    const handleInputChange = () => {
        const value = parseInt(inputRef.current.value, 10);
        if (!isNaN(value)) {
            setRowCount(value);
            setItemsArrayHand((prevItems) => {
                //làm cho trường hợp người dùng nhấn thêm dòng
                if (value > prevItems.length) {
                    return [...prevItems, ...Array.from({ length: value - prevItems.length }, () => new Item())];
                } else {
                    // người dùng nhấn giảm số dòng
                    return prevItems.slice(0, value);
                }
            });
        }
    };

    const handleDeleteRow = (index) => {
        const newItemsArrayHand = itemsArrayHand.filter((_, i) => i !== index);
        setItemsArrayHand(newItemsArrayHand);
        setRowCount(newItemsArrayHand.length); // Cập nhật số dòng
    };

    useEffect(() => {
        setTrongluong(0);
    }, []);

    const rows = [];
    for (let r = 0; r < rowCount; r++) {
        rows.push(
            <tr key={r}>
                <td>
                    <input
                        type="text"
                        value={itemsArrayHand[r]?.ten || ''}
                        onChange={(e) => {
                            const newItemsArrayHand = [...itemsArrayHand];
                            newItemsArrayHand[r] = { ...newItemsArrayHand[r], ten: e.target.value, id: r };
                            setItemsArrayHand(newItemsArrayHand);
                        }}
                    />
                </td>
                <td>
                    <input
                        type="number"
                        value={itemsArrayHand[r]?.TL || ''}
                        onChange={(e) => {
                            const newItemsArrayHand = [...itemsArrayHand];
                            newItemsArrayHand[r].TL = parseInt(e.target.value, 10);
                            setItemsArrayHand(newItemsArrayHand);
                        }}
                    />
                </td>
                <td>
                    <input
                        type="number"
                        value={itemsArrayHand[r]?.GT || ''}
                        onChange={(e) => {
                            const newItemsArrayHand = [...itemsArrayHand];
                            newItemsArrayHand[r].GT = parseInt(e.target.value, 10);
                            setItemsArrayHand(newItemsArrayHand);
                        }}
                    />
                </td>
                <td>
                    <input
                        type="number"
                        value={itemsArrayHand[r]?.SL || ''}
                        onChange={(e) => {
                            const newItemsArrayHand = [...itemsArrayHand];
                            newItemsArrayHand[r].SL = parseInt(e.target.value, 10);
                            setItemsArrayHand(newItemsArrayHand);
                        }}
                    />
                </td>
                <td>
                    <button onClick={() => handleDeleteRow(r)}>Xóa</button>
                </td>
            </tr>,
        );
    }
    const sortItems = arrange(itemsArrayHand);
    return (
        <div>
            {!submit && itemsArrayHandState && (
                <div className={cx('wrapper')}>
                    <div className={cx('header')}>
                        <input
                            type="number"
                            placeholder="Nhập số lượng đồ vật"
                            value={rowCount}
                            ref={inputRef}
                            onChange={handleInputChange}
                        />
                        <input
                            type="number"
                            placeholder="Nhập trọng lượng của ba lô"
                            onChange={(e) => setTrongluong(e.target.value)}
                        />
                    </div>
                    <table>
                        <thead>
                            {rows.length > 0 && (
                                <tr>
                                    <th>Tên</th>
                                    <th>Trọng lượng</th>
                                    <th>Giá trị</th>
                                    <th>Số lượng</th>
                                </tr>
                            )}
                        </thead>
                        <tbody>{rows}</tbody>
                    </table>
                    <button type="submit" onClick={() => setSubmit(true)}>
                        Hoàn tất
                    </button>
                </div>
            )}
            <div>
                {submit && (
                    <div>
                        <h1>Mảng đồ vật được nhập từ bàn phím</h1>
                        <OutputTable sapxep={false} itemsArray={itemsArrayHand} remainingWeight={trongluong} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default InputTable;
