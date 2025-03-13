import React, { useState, useEffect, useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './../../pages/Home/home.module.scss';
import { sortByID } from '../function/utils';
import { itemsContext } from '../../App';

const cx = classNames.bind(styles);

const ExportTextFile = ({ data }) => {
    // State lưu danh sách dữ liệu
    const [dsdv, setDsdv] = useState([]);

    // Lấy dữ liệu từ Context
    const { PAGreedy, PADynamicProgramming, PABranchAndBound, compare } = useContext(itemsContext);
    console.log('ba', PABranchAndBound);
    // Tạo danh sách kết quả
    useEffect(() => {
        let resultArray = [...data];

        setDsdv(sortByID(resultArray));
    }, [data]);

    // Xử lý lưu file
    const handleDownload = () => {
        if (!Array.isArray(dsdv) || dsdv.length === 0) {
            console.error('Dữ liệu không hợp lệ hoặc trống');
            return;
        }
        let headers;
        if (!compare) headers = ['TL', 'GT', 'DG', 'PA', 'ID', 'Tên'];
        else headers = ['TL', 'GT', 'DG', 'PAGreedy', 'PABranchAndBound', 'PADynamicProgramming', 'ID', 'Tên'];

        console.log(headers);
        const rows = dsdv
            .filter((item) => item && item.TL !== undefined) // Lọc bỏ undefined
            .map((item, index) =>
                !compare
                    ? `${item.TL}\t${item.GT}\t${item.DG}\t${item.PA}\t${item.id}\t${item.ten}`
                    : `${item.TL}\t${item.GT}\t${item.DG}\t${PAGreedy[index]}\t\t${PABranchAndBound[index]}\t\t\t${PADynamicProgramming[index]}\t\t\t${item.id}\t${item.ten}`,
            );

        const text = [headers.join('\t'), ...rows].join('\n');
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = 'bang_so_sanh.txt';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <div>
            <input id="export-btn" type="button" style={{ display: 'none' }} onClick={handleDownload} />
            <label htmlFor="export-btn" className={cx('input-file')}>
                Lưu bảng so sánh
            </label>
        </div>
    );
};

export default ExportTextFile;
