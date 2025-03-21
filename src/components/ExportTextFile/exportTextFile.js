import React, { useState, useEffect, useContext, useMemo } from 'react';
import classNames from 'classnames/bind';
import styles from './../../pages/Home/home.module.scss';
import { sortByID } from '../function/utils';
import { itemsContext } from '../../App';

const cx = classNames.bind(styles);

const ExportTextFile = ({ data }) => {
    const [dsdv, setDsdv] = useState([]);

    const {
        trongluong,
        PAGreedy,
        PADynamicProgramming,
        PABranchAndBound,
        compare,
        remainingWeightGreedy,
        remainingWeightBranchAndBound,
        remainingWeightDynamicProgramming,
        totalValueGreedy,
        totalValueBnb,
        totalValueDynamicProgramming,
        greedy,
        branhAndBound,
        dynamicProgramming,
    } = useContext(itemsContext);

    useEffect(() => {
        setDsdv(sortByID([...data]));
    }, [data]);

    const headers = useMemo(() => {
        if (compare) return ['ID', 'Tên', 'TL', 'GT', 'DG', 'PAGreedy', 'PABnB', 'PADP'];
        if (greedy) return ['ID', 'Tên', 'TL', 'GT', 'DG', 'PAGreedy'];
        if (branhAndBound) return ['ID', 'Tên', 'TL', 'GT', 'DG', 'PABnB'];
        if (dynamicProgramming) return ['ID', 'Tên', 'TL', 'GT', 'DG', 'PADP'];
        return [];
    }, [compare, greedy, branhAndBound, dynamicProgramming]);

    const columnWidths = {
        ID: 3,
        Tên: 20,
        TL: 5,
        GT: 5,
        DG: 7,
        PAGreedy: 10,
        PABnB: 10,
        PADP: 10,
    };

    const formatRow = (rowData) => {
        return rowData.map((cell, index) => cell.toString().padEnd(columnWidths[headers[index]] || 10, ' ')).join('|');
    };

    const formattedTable = () => {
        if (!Array.isArray(dsdv) || dsdv.length === 0) return '';

        const headerRow = formatRow(headers);

        const rows = dsdv.map((item, index) => {
            const rowData = [
                item.id,
                item.ten,
                item.TL,
                item.GT,
                item.DG,
                ...(compare
                    ? [PAGreedy[index], PABranchAndBound[index], PADynamicProgramming[index]]
                    : greedy
                      ? [PAGreedy[index]]
                      : branhAndBound
                        ? [PABranchAndBound[index]]
                        : dynamicProgramming
                          ? [PADynamicProgramming[index]]
                          : []),
            ];
            return formatRow(rowData);
        });

        const remainingWeight = compare
            ? [remainingWeightGreedy, remainingWeightBranchAndBound, remainingWeightDynamicProgramming]
            : greedy
              ? [remainingWeightGreedy]
              : branhAndBound
                ? [remainingWeightBranchAndBound]
                : dynamicProgramming
                  ? [remainingWeightDynamicProgramming]
                  : [];

        const totalValue = compare
            ? [totalValueGreedy, totalValueBnb, totalValueDynamicProgramming]
            : greedy
              ? [totalValueGreedy]
              : branhAndBound
                ? [totalValueBnb]
                : dynamicProgramming
                  ? [totalValueDynamicProgramming]
                  : [];

        const remainingWeightRow = formatRow(['', 'Trọng lượng còn lại', '', '', '', ...remainingWeight]);
        const totalValueRow = formatRow(['', 'Tổng giá trị', '', '', '', ...totalValue]);

        return [
            `Trọng lượng ba lô: ${trongluong}`,
            headerRow,
            '-'.repeat(headerRow.length),
            ...rows,
            '-'.repeat(headerRow.length),
            remainingWeightRow,
            totalValueRow,
        ].join('\n');
    };

    const handleDownload = () => {
        const text = formattedTable();
        if (!text) {
            console.error('Lỗi khi định dạng dữ liệu');
            return;
        }

        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = compare ? 'bang_so_sanh.txt' : 'ket_qua_thuat_toan.txt';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <div>
            <input id="export-btn" type="button" style={{ display: 'none' }} onClick={handleDownload} />
            <label htmlFor="export-btn" className={cx('input-file')}>
                {compare ? 'Lưu bảng so sánh' : 'Lưu kết quả thuật toán'}
            </label>
        </div>
    );
};

export default ExportTextFile;
