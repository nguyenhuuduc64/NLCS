import React, { useState, useRef } from 'react';
import { Item } from '../../Items';
function InputTable({ styles }) {
    const [rowCount, setRowCount] = useState(0);
    const inputRef = useRef();

    const handleInputChange = () => {
        const value = parseInt(inputRef.current.value, 10);
        if (!isNaN(value)) {
            setRowCount(value);
        }
    };
    const itemsArray = new Item[rowCount]();
    const rows = [];
    for (let r = 0; r < rowCount; r++) {
        rows.push(
            <tr key={r}>
                <td>
                    <input type="text" />
                </td>
                <td>
                    <input type="number" />
                </td>
                <td>
                    <input type="number" />
                </td>
            </tr>,
        );
    }

    return (
        <div style={styles}>
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
        </div>
    );
}

export default InputTable;
