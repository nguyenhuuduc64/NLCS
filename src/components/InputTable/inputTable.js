import React, { useState, useRef, useContext } from 'react';
import { Item } from '../../Items';
import OutputTable from '../SortTable/sortTable';
import styles from '../../../src/pages/Home/home.module.scss';
import { itemsContext } from '../../App';
function InputTable() {
    const [rowCount, setRowCount] = useState(0);
    const { itemsArrayHand, setItemsArrayHand, itemsArrayFile, setItemsArrayFile } = useContext(itemsContext);
    const [submit, setSubmit] = useState(false);
    const inputRef = useRef();
    const [trongLuong, setTrongLuong] = useState(0);
    const handleInputChange = () => {
        const value = parseInt(inputRef.current.value, 10);
        if (!isNaN(value)) {
            setRowCount(value);
            const newItemsArray = Array.from({ length: value }, () => new Item());
            setItemsArrayHand(newItemsArray);
        }
    };
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
                            newItemsArrayHand[r].ten = e.target.value;
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
            </tr>,
        );
    }

    return (
        <div style={styles}>
            {!submit && (
                <div>
                    <input
                        type="number"
                        placeholder="Nhập số lượng đồ vật"
                        ref={inputRef}
                        onChange={handleInputChange}
                    />
                    <input
                        type="number"
                        placeholder="Nhập trọng lượng của ba lô"
                        onChange={(e) => setTrongLuong(e.target.value)}
                    />
                    <table>
                        <thead>
                            <tr>
                                <th>Tên</th>
                                <th>Trọng lượng</th>
                                <th>Giá trị</th>
                            </tr>
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
                        <p>Trọng lượng: {trongLuong}</p>
                        <h1>Mảng đồ vật được nhập từ bàn phím</h1>
                        <OutputTable sapxep={false} />
                    </div>
                )}

                {submit && (
                    <div>
                        <h1>Mảng đồ vật sau khi được sắp xếp</h1>
                        <OutputTable sapxep={true} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default InputTable;
