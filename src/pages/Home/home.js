import classNames from 'classnames/bind';
import styles from './home.module.scss';
import { useContext, useRef, useState, useEffect } from 'react';
import { Item } from '../../Items';
import InputTable from '../../components/InputTable/inputTable';
import OutputTable from '../../components/SortTable/sortTable';
import { itemsContext } from '../../App';
import Greedy from '../../components/Greddy/greedy';

const cx = classNames.bind(styles);

function Home() {
    const [file, setFile] = useState(null);
    const [soluong, setSoluong] = useState(0);
    const {
        itemsArrayFile,
        setItemsArrayFile,
        itemArrayHand,
        setItemsArrayHand,
        greedy,
        setGreedy,
        trongluong,
        setTrongluong,
    } = useContext(itemsContext);
    const [inputState, setInputState] = useState(false);

    const [isDataReady, setIsDataReady] = useState(false);
    useEffect(() => {
        if (itemsArrayFile && itemsArrayFile.length > 0) {
            setIsDataReady(true);
        }
        if (itemArrayHand && itemArrayHand.length > 0) {
            setIsDataReady(true);
        }
    }, [itemsArrayFile, itemArrayHand]);
    //sau khi cập nhật lại itemsArrayFIle hoặc itemsArrayHand thì useEffect sẽ chạy và set Data về true.
    //ban đầu ở lần render đầu tiên thì useEffect chưa nhận ra sự thay đổi của itemsArrayFile hoặc itemsArrayHand nên chưa chạy code bên trongtrong
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setItemsArrayHand([]);

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const text = e.target.result;
                setFile(text);
                const lines = text.split('\n');
                setSoluong(lines.length);
                setTrongluong(lines[0].split('\t')[0]);
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
                setItemsArrayFile(items);
            };
            reader.readAsText(file);
        }
    };
    return (
        <div className={cx('container')}>
            <nav className={cx('nav')}>Bài toán cái ba lô</nav>
            <div className={cx('input-container')}>
                <div>
                    <input id="input-file" style={{ display: 'none' }} type="file" onChange={handleFileChange} />
                    <label htmlFor="input-file" className={cx('input-file')}>
                        Chọn tập tin
                    </label>
                </div>
                <div>
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
                </div>

                <div>
                    <input
                        id="greedy-btn"
                        type="button"
                        style={{ display: 'none' }}
                        onClick={() => {
                            setGreedy((prev) => !prev);
                            console.log(greedy);
                        }}
                    />
                    <label htmlFor="greedy-btn" className={cx('input-btn')}>
                        Thuật toán tham lam
                    </label>
                </div>
            </div>
            <div className={cx('content')}>
                <div className={cx('read-table-container')}>
                    {itemsArrayFile.length !== 0 && (
                        <div>
                            <h2>MẢNG ĐỒ VẬT ĐỌC ĐƯỢC</h2>
                            <p style={{ fontWeight: 'bolder' }}>trọng lượng của ba lô: {trongluong}</p>
                            <OutputTable sapxep={false} PA={false} itemsArray={itemsArrayFile} />
                        </div>
                    )}

                    {itemsArrayFile.length !== 0 && (
                        <div>
                            <h2>MẢNG ĐỒ VẬT ĐƯỢC SẮP XẾP THEO ĐƠN GIÁ</h2>
                            <OutputTable sapxep={true} PA={false} itemsArray={itemsArrayFile} />
                        </div>
                    )}
                    <div className={cx('input-table-container')}>{inputState && <InputTable />}</div>
                </div>
                <div>{greedy && <Greedy itemsArray={itemsArrayFile} />}</div>
            </div>
        </div>
    );
}
export default Home;
