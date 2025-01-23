import classNames from 'classnames/bind';
import styles from './home.module.scss';
import { useContext, useRef, useState } from 'react';
import { Item } from '../../Items';
import Table from './table';
import InputTable from '../../components/InputTable/inputTable';
import OutputTable from '../../components/OutputTable/outputTable';
import { itemsContext } from '../../App';

const cx = classNames.bind(styles);

function Home() {
    const [file, setFile] = useState(null);
    const [soluong, setSoluong] = useState(0);
    const { itemsArray, setItemsArray } = useContext(itemsContext);
    const [inputState, setInputState] = useState(false);
    const [trongluong, setTrongluong] = useState(0);
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const text = e.target.result;
                setFile(text);
                const lines = text.split('\n');
                setSoluong(lines.length);
                setTrongluong(lines[0].split('\t')[0]);
                console.log(trongluong);
                const items = lines
                    .filter((line, index) => index != 0)
                    .map((line, index) => {
                        const itemTemple = new Item();
                        const [ten, TL, GT] = line.split('\t'); // Giả sử mỗi dòng có 3 trường
                        itemTemple.ten = ten;
                        itemTemple.TL = parseInt(TL);
                        itemTemple.GT = parseInt(GT);
                        return new Item(itemTemple);
                    });

                setItemsArray(items);
            };
            reader.readAsText(file);
        }
    };

    return (
        <div className={cx('container')}>
            <nav className={cx('nav')}>Bài toán cái ba lô</nav>
            <input id="input-file" style={{ display: 'none' }} type="file" onChange={handleFileChange} />
            <label htmlFor="input-file" className={cx('input-file')}>
                Chọn tập tin
            </label>

            <input
                id="input-btn"
                type="button"
                style={{ display: 'none' }}
                onClick={() => {
                    setInputState((prev) => !prev);
                }}
            />
            <label htmlFor="input-btn" className={cx('input-btn')}>
                Nhập thông tin đồ vật
            </label>

            {itemsArray.length != 0 && (
                <div>
                    <h2>MẢNG ĐỒ VẬT ĐỌC ĐƯỢC</h2>
                    <p>trọng lượng: {trongluong}</p>
                    <Table itemsArray={itemsArray} sapxep={false} />
                </div>
            )}

            {itemsArray.length != 0 && (
                <div>
                    <h2>MẢNG ĐỒ VẬT ĐƯỢC SẮP XẾP THEO ĐƠN GIÁ</h2>
                    <Table itemsArray={itemsArray} sapxep={true} />
                </div>
            )}

            <div className={cx('input-table-container')}>{inputState && <InputTable />}</div>
            <div>
                <OutputTable />
            </div>
        </div>
    );
}
export default Home;
