import { useContext, useEffect, useState } from 'react';
import styles from '../../pages/Home/home.module.scss';
import classNames from 'classnames/bind';
import { itemsContext } from '../../App';
import { current } from '@reduxjs/toolkit';
import { arrange } from '../function/arrange/arrange';
const cx = classNames.bind(styles);
function OutputTable({ sapxep, PA, itemsArray, currentIndex, remainingWeight, totalValue }) {
    const { itemsArrayFile, itemsArrayHand, greedy, trongluong, setTrongluong } = useContext(itemsContext);
    if (sapxep && itemsArray) {
        /*tạo đơn giá cho các đò vật */
        for (let i = 0; i < itemsArray.length; i++) {
            /*làm tròn đến số thập phân thứ 2 */
            itemsArray[i].DG = Math.round((itemsArray[i].GT / itemsArray[i].TL) * 100) / 100;
        }

        /*sắp xếp lại mảng */
        if (sapxep) itemsArray = arrange(itemsArray);
    }

    return (
        <div>
            <p>Trọng lượng còn lại: {remainingWeight}</p>
            {itemsArray && (
                <table className={cx('table', 'output-table')}>
                    <thead className={cx('thead')}>
                        <tr>
                            <th>Tên</th>
                            <th>Trọng lượng</th>
                            <th>Giá trị</th>
                            {!isNaN(itemsArray[0].SL) && <th>Số lượng</th>}
                            {sapxep && <th>Đơn giá</th>}
                            {PA && <th>Phương án</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {itemsArray.map((item, index) => (
                            <tr key={index}>
                                <td>{item.ten || 'N/A'}</td>
                                <td>{item.TL || 0}</td>
                                <td>{item.GT || 0}</td>
                                {!isNaN(item.SL) && <td>{item.SL}</td>}
                                {sapxep && <td>{item.DG || 0}</td>}
                                {PA && (
                                    <td
                                        style={{
                                            backgroundColor: index === currentIndex ? 'red' : 'beige',
                                        }}
                                    >
                                        {item.PA ?? 0}
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {PA && <p>Tổng giá trị: {totalValue}</p>}
        </div>
    );
}
export default OutputTable;
