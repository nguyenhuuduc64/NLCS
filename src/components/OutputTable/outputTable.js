import { useContext, useEffect, useState } from 'react';
import styles from '../../pages/Home/home.module.scss';
import classNames from 'classnames/bind';
import { itemsContext } from '../../App';
import { arrange } from '../function/arrange/arrange';
import { sortByID } from '../function/utils';

const cx = classNames.bind(styles);

function OutputTable({ sapxep, PA, itemsArray, currentIndex, remainingWeight, totalValue, name, type, compare }) {
    const {
        PAGreedy,
        PABranchAndBound,
        PADynamicProgramming,
        totalValueGreedy,
        totalValueBnb,
        totalValueDynamicProgramming,
        remainingWeightGreedy,
        remainingWeightBranchAndBound,
        remainingWeightDynamicProgramming,
        executionTimeDynamicProgramming,
        executionTimeBranchAndBound,
        executionTimeGreedy,
    } = useContext(itemsContext);
    if (itemsArray) {
        /*tạo đơn giá cho các đò vật */
        for (let i = 0; i < itemsArray.length; i++) {
            /*làm tròn đến số thập phân thứ 2 */
            itemsArray[i].DG = Math.round((itemsArray[i].GT / itemsArray[i].TL) * 100) / 100;
        }

        /*sắp xếp lại mảng */
        if (sapxep) itemsArray = arrange(itemsArray);
    }

    // Check if any item has a valid SL value
    const hasValidSL = itemsArray.some((item) => item.SL !== null && !isNaN(item.SL));
    if (PA) itemsArray = sortByID(itemsArray);

    return !compare ? (
        <div>
            <h2>{name}</h2>
            <p>Trọng lượng còn lại: {remainingWeight}</p>
            {itemsArray && (
                <table className={cx('table', 'output-table')}>
                    <thead className={cx('thead')}>
                        <tr>
                            <th>Tên</th>
                            <th>Trọng lượng</th>
                            <th>Giá trị</th>
                            {hasValidSL && <th>Số lượng</th>}
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
                                {hasValidSL && <td>{item.SL}</td>}
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
    ) : (
        <div>
            <h2>{name}</h2>
            {itemsArray && (
                <table className={cx('table', 'output-table')}>
                    <thead className={cx('thead')}>
                        <tr>
                            <th>Tên</th>
                            <th>Trọng lượng</th>
                            <th>Giá trị</th>
                            {hasValidSL && <th>Số lượng</th>}
                            {sapxep && <th>Đơn giá</th>}
                            <th>Thuật toán tham lam</th>
                            <th>Thuật toán nhánh cận</th>
                            <th>Thuật toán quy hoạch động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {itemsArray.map((item, index) => (
                            <tr key={index}>
                                <td>{item.ten || 'N/A'}</td>
                                <td>{item.TL || 0}</td>
                                <td>{item.GT || 0}</td>
                                {hasValidSL && <td>{item.SL}</td>}
                                {sapxep && <td>{item.DG || 0}</td>}
                                <td>{PAGreedy[index]}</td>
                                <td>{PABranchAndBound[index]}</td>
                                <td>{PADynamicProgramming[index]}</td>
                            </tr>
                        ))}
                        <tr style={{ backgroundColor: '#7bbfff' }}>
                            <td>Tổng giá trị</td>
                            <td></td>
                            <td></td>
                            {hasValidSL && <td></td>}
                            <td style={{ fontWeight: 'bolder' }}>{totalValueGreedy}</td>
                            <td style={{ fontWeight: 'bolder' }}>{totalValueBnb}</td>
                            <td style={{ fontWeight: 'bolder' }}>{totalValueDynamicProgramming}</td>
                        </tr>
                        <tr style={{ backgroundColor: '#7bbfff' }}>
                            <td>Trọng lượng còn lại</td>
                            <td></td>
                            <td></td>
                            {hasValidSL && <td></td>}
                            <td style={{ fontWeight: 'bolder' }}>{remainingWeightGreedy}</td>
                            <td style={{ fontWeight: 'bolder' }}>{remainingWeightBranchAndBound}</td>
                            <td style={{ fontWeight: 'bolder' }}>{remainingWeightDynamicProgramming}</td>
                        </tr>
                        <tr style={{ backgroundColor: '#7bbfff' }}>
                            <td>Thời gian thực thi</td>
                            <td></td>
                            <td></td>
                            {hasValidSL && <td></td>}
                            <td style={{ fontWeight: 'bolder' }}>{executionTimeGreedy}</td>
                            <td style={{ fontWeight: 'bolder' }}>{executionTimeBranchAndBound}</td>
                            <td style={{ fontWeight: 'bolder' }}>{executionTimeDynamicProgramming}</td>
                        </tr>
                    </tbody>
                </table>
            )}
            {PA && <p>Tổng giá trị: {totalValue}</p>}
        </div>
    );
}

export default OutputTable;
