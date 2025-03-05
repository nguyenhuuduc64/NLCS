import React from 'react';
import classNames from 'classnames/bind';
import styles from './../../pages/Home/home.module.scss';

const cx = classNames.bind(styles);

const ExportTextFile = ({ data }) => {
    const handleDownload = () => {
        if (!Array.isArray(data)) {
            console.error('Dữ liệu không hợp lệ');
            return;
        }

        // Tạo tiêu đề cột
        const headers = ['TL', 'GT', 'DG', 'PA', 'ID', 'Tên'];

        // Chuyển đổi từng dòng dữ liệu thành chuỗi có định dạng bảng
        const rows = data.map((item) => `${item.TL}\t${item.GT}\t${item.DG}\t${item.PA}\t${item.id}\t${item.ten}`);

        // Kết hợp tiêu đề và dữ liệu
        const text = [headers.join('\t'), ...rows].join('\n');

        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = 'result.txt'; // Xuất file dạng bảng
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
