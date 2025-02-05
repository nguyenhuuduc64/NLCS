import { useContext } from 'react';
import { itemsContext } from '../../App';
import classNames from 'classnames/bind';

import styles from '../../../src/pages/Home/home.module.scss';
const cx = classNames.bind(styles);
function Greedy({ itemsArray }) {
    const { trongluong } = useContext(itemsContext);

    for (let i = 0; i < itemsArray.length; i++) {
        for (let j = i + 1; j < itemsArray.length; j++) {
            if (itemsArray[i].DG < itemsArray[j].DG) {
                let temp = itemsArray[i];
                itemsArray[i] = itemsArray[j];
                itemsArray[j] = temp;
            }
        }
    }

    var current_trongluong = trongluong;

    itemsArray.forEach((item, index) => {
        item.PA = Math.floor(current_trongluong / item.TL);

        current_trongluong = current_trongluong - item.PA * item.TL;
    });

    return (
        <>
            <p>trọng lượng còn lại: {current_trongluong}</p>
            <div className={cx('output-table')}>
                {itemsArray && (
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
                            {itemsArray.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.ten || 'N/A'}</td>
                                    <td>{item.TL || 0}</td>
                                    <td>{item.GT || 0}</td>
                                    <td>{item.DG || 0}</td>
                                    <td>{item.PA}</td>
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
