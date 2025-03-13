import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './../../pages/Home/home.module.scss';
import { sortByID } from '../function/utils';

const cx = classNames.bind(styles);

const ExportTextFile = ({ data }) => {
    // Thêm useState để lưu danh sách dữ liệu
    const [dsdv, setDsdv] = useState([]);

    useEffect(() => {
        if (Array.isArray(data) && data.length > 0) {
            setDsdv(sortByID([...data])); // Gán dữ liệu mới vào state
        } else {
            console.warn('Dữ liệu chưa sẵn sàng:', data);
        }
    }, [data]); // Chạy lại mỗi khi data thay đổi

    console.log('data', data);
    console.log('dsdv', dsdv);

    const handleDownload = () => {
        if (!Array.isArray(dsdv) || dsdv.length === 0) {
            console.error('Dữ liệu không hợp lệ hoặc trống');
            return;
        }

        const headers = ['TL', 'GT', 'DG', 'PA', 'ID', 'Tên'];
        const rows = dsdv.map((item) => `${item.TL}\t${item.GT}\t${item.DG}\t${item.PA}\t${item.id}\t${item.ten}`);

        const text = [headers.join('\t'), ...rows].join('\n');
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = 'result.txt';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <div>
            <input id="export-btn" type="button" style={{ display: 'none' }} onClick={handleDownload} />
            <label htmlFor="export-btn" className={cx('input-file')}>
                Lưu phương án
            </label>
        </div>
    );
};

export default ExportTextFile;
