import { useContext, useEffect, useState } from 'react';
import styles from '../../pages/Home/home.module.scss';
import classNames from 'classnames/bind';
import { itemsContext } from '../../App';
import { current } from '@reduxjs/toolkit';
const cx = classNames.bind(styles);
function SortTable({ sapxep, PA, itemsArray }) {
    const { itemsArrayFile, itemsArrayHand, greedy, trongluong, setTrongluong } = useContext(itemsContext);

    if (sapxep && itemsArray) {
        /*tạo đơn giá cho các đò vật */
        for (let i = 0; i < itemsArray.length; i++) {
            /*làm tròn đến số thập phân thứ 2 */
            itemsArray[i].DG = Math.round((itemsArray[i].TL / itemsArray[i].GT) * 100) / 100;
        }
        /*sắp xếp lại mảng */
        for (let i = 0; i < itemsArray.length; i++) {
            for (let j = i + 1; j < itemsArray.length; j++) {
                if (itemsArray[i].DG < itemsArray[j].DG) {
                    let temp = itemsArray[i];
                    itemsArray[i] = itemsArray[j];
                    itemsArray[j] = temp;
                }
            }
        }
    }
    var current_trongluong = trongluong;
    console.log(current_trongluong);
    if (greedy) {
        itemsArray.forEach((item, index) => {
            item.PA = Math.floor(current_trongluong / item.TL);

            current_trongluong = current_trongluong - item.PA * item.TL;
        });
    }
    return (
        <div className={cx('output-table')}>
            {itemsArray && (
                <table className={cx('table')}>
                    <thead className={cx('thead')}>
                        <tr>
                            <th>Tên</th>
                            <th>Trọng lượng</th>
                            <th>Giá trị</th>
                            {sapxep && <th>Đơn giá</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {itemsArray.map((item, index) => (
                            <tr key={index}>
                                <td>{item.ten || 'N/A'}</td>
                                <td>{item.TL || 0}</td>
                                <td>{item.GT || 0}</td>
                                {sapxep && <td>{item.DG || 0}</td>}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
export default SortTable;
