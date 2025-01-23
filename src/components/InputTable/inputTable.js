import React, { useState, useRef } from 'react';
import { Item } from '../../Items';
import Table from '../../pages/Home/table';
import styles from '../../../src/pages/Home/home.module.scss';
function InputTable() {
    const [rowCount, setRowCount] = useState(0);
    const [itemsArray, setItemsArray] = useState([]);
    const [submit, setSubmit] = useState(false);
    const inputRef = useRef();

    const handleInputChange = () => {
        const value = parseInt(inputRef.current.value, 10);
        if (!isNaN(value)) {
            setRowCount(value);
            const newItemsArray = Array.from({ length: value }, () => new Item());
            setItemsArray(newItemsArray);
        }
    };

    const rows = [];
    for (let r = 0; r < rowCount; r++) {
        rows.push(
            <tr key={r}>
                <td>
                    <input
                        type="text"
                        value={itemsArray[r]?.ten || ''}
                        onChange={(e) => {
                            const newItemsArray = [...itemsArray];
                            newItemsArray[r].ten = e.target.value;
                            setItemsArray(newItemsArray);
                        }}
                    />
                </td>
                <td>
                    <input
                        type="number"
                        value={itemsArray[r]?.TL || ''}
                        onChange={(e) => {
                            const newItemsArray = [...itemsArray];
                            newItemsArray[r].TL = parseInt(e.target.value, 10);
                            setItemsArray(newItemsArray);
                        }}
                    />
                </td>
                <td>
                    <input
                        type="number"
                        value={itemsArray[r]?.GT || ''}
                        onChange={(e) => {
                            const newItemsArray = [...itemsArray];
                            newItemsArray[r].GT = parseInt(e.target.value, 10);
                            setItemsArray(newItemsArray);
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
                    <input type="number" ref={inputRef} onChange={handleInputChange} />
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
                        <h1>Mảng đồ vật được nhập từ bàn phím</h1>
                        <Table itemsArray={itemsArray} sapxep={false} />
                    </div>
                )}

                {submit && (
                    <div>
                        <h1>Mảng đồ vật sau khi được sắp xếp</h1>
                        <Table itemsArray={itemsArray} sapxep={true} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default InputTable;
