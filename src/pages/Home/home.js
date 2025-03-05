import classNames from 'classnames/bind';
import styles from './home.module.scss';
import { useContext, useRef, useState, useEffect } from 'react';
import { Item } from '../../Items';
import InputTable from '../../components/InputTable/inputTable';
import OutputTable from '../../components/OutputTable/outputTable';
import { itemsContext } from '../../App';
import Greedy from '../../components/function/Greddy/greedy';
import BranchAndBound from '../../components/function/BranchAndBound/branchandbounce';
import { setPA } from '../../components/function/utils';
import DynamicProgramming from '../../components/function/DynamicProgramming/DynamicProgramming';
import Compare from '../../components/Compare/compare';
import { arrange } from '../../components/function/arrange/arrange';
import ExportTextFile from '../../components/ExportTextFile/exportTextFile';
const cx = classNames.bind(styles);

function Home() {
    const [file, setFile] = useState(null);
    const [soluong, setSoluong] = useState(0);
    const [arrangeState, setArrangeState] = useState(false);
    const {
        setCurrentIndex,
        itemsArrayFile,
        setItemsArrayFile,
        itemsArrayHand,
        setItemsArrayHand,
        greedy,
        setGreedy,
        trongluong,
        setTrongluong,
        branhAndBound,
        setBranhAndBound,
        dynamicProgramming,
        setDynamicProgramming,
        inputState,
        setInputState,
        setTotalValueGreedy,
        setTotalValueBnb,
        totalValueGreedy,
        totalValueBnb,
        itemsArrayHandState,
        setItemsArrayHandState,
        itemsArrayFileState,

        setItemsArrayFileState,
        compare,
        setCompare,
        Export,
        setExport,
        exportArrayResult,
        setExportArrayResult,
    } = useContext(itemsContext);

    const [isDataReady, setIsDataReady] = useState(false);
    useEffect(() => {
        if (itemsArrayFile && itemsArrayFile.length > 0) {
            setIsDataReady(true);
        }
        if (itemsArrayHand && itemsArrayHand.length > 0) {
            setIsDataReady(true);
        }
    }, [itemsArrayFile, itemsArrayHand]);
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
                        const [TL, GT, ten, SL] = line.split('\t'); // Giả sử mỗi dòng có 3 trường
                        itemTemple.TL = parseInt(TL);
                        itemTemple.GT = parseInt(GT);
                        itemTemple.ten = ten;
                        if (itemTemple.SL) itemTemple.SL = parseInt(SL);
                        itemTemple.id = index;
                        return new Item(itemTemple);
                    });
                setItemsArrayFile(items);
            };
            reader.readAsText(file);
        }
    };

    const itemsArray = itemsArrayFile.length ? itemsArrayFile : itemsArrayHand;
    return (
        <div className={cx('container')}>
            <nav className={cx('nav')}>Bài toán cái ba lô</nav>
            <div className={cx('input-container')}>
                <div>
                    <input
                        id="input-file"
                        style={{ display: 'none' }}
                        type="file"
                        onChange={(e) => {
                            setItemsArrayHandState(false);
                            setItemsArrayHand([]);
                            handleFileChange(e);
                        }}
                    />
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
                            setItemsArrayHandState((prev) => {
                                return !prev;
                            });
                            setItemsArrayFileState(false);
                            setItemsArrayFile([]);
                        }}
                    />
                    <label htmlFor="input-btn" className={cx('input-btn')}>
                        Nhập thủ công
                    </label>
                </div>
                <div>
                    <input
                        id="arrange"
                        type="button"
                        style={{ display: 'none' }}
                        onClick={() => {
                            setArrangeState((prev) => !prev);
                            arrange(itemsArrayFile);
                            arrange(itemsArrayHand);
                        }}
                    />
                    <label htmlFor="arrange" className={cx('input-btn')}>
                        Sắp xếp theo đơn giá
                    </label>
                </div>
                <div>
                    <input
                        id="greedy-btn"
                        type="button"
                        style={{ display: 'none' }}
                        onClick={() => {
                            setGreedy((prev) => {
                                return !prev;
                            });
                        }}
                    />
                    <label htmlFor="greedy-btn" className={cx('input-btn')}>
                        Thuật toán tham lam
                    </label>
                </div>
                <div>
                    <input
                        id="bnb-btn"
                        type="button"
                        style={{ display: 'none' }}
                        onClick={() => {
                            setTotalValueBnb(0);

                            setBranhAndBound((prev) => !prev);
                        }}
                    />
                    <label htmlFor="bnb-btn" className={cx('input-btn')}>
                        Thuật toán nhánh cận
                    </label>
                </div>
                <div>
                    <input
                        id="dynamicpg-btn"
                        type="button"
                        style={{ display: 'none' }}
                        onClick={() => {
                            setDynamicProgramming((prev) => !prev);
                        }}
                    />
                    <label htmlFor="dynamicpg-btn" className={cx('input-btn')}>
                        Thuật toán quy hoạch động
                    </label>
                </div>
                <div>
                    <input
                        id="compare-btn"
                        style={{ display: 'none' }}
                        onClick={() => {
                            setCompare((prev) => !prev);
                        }}
                    />
                    <label htmlFor="compare-btn" className={cx('input-file')}>
                        So sánh
                    </label>
                </div>
                <div>
                    <ExportTextFile data={exportArrayResult} />
                </div>
            </div>
            <div className={cx('content')}>
                <div className={cx('read-table-container')}>
                    {itemsArrayHandState && <InputTable />}
                    {itemsArrayFile.length !== 0 && (
                        <div>
                            <h2>MẢNG ĐỒ VẬT ĐỌC ĐƯỢC</h2>
                            <OutputTable
                                sapxep={false}
                                PA={false}
                                itemsArray={itemsArrayFile}
                                remainingWeight={trongluong}
                            />
                        </div>
                    )}

                    <div>
                        {arrangeState && itemsArray && (
                            <>
                                <h2>MẢNG ĐỒ VẬT ĐƯỢC SẮP XẾP THEO ĐƠN GIÁ</h2>
                                <OutputTable
                                    sapxep={true}
                                    PA={false}
                                    itemsArray={itemsArray}
                                    remainingWeight={trongluong}
                                />
                            </>
                        )}
                    </div>

                    <div className={cx('input-table-container')}>{inputState && <InputTable />}</div>
                </div>
                <div className={cx('output-table-container')}>
                    {(greedy || branhAndBound || dynamicProgramming) && <h2>MẢNG ĐỒ VẬT PHƯƠNG ÁN</h2>}
                    <div>{greedy && <Greedy itemsArray={itemsArray} />}</div>
                    <div>{branhAndBound && <BranchAndBound itemsArray={itemsArray} />}</div>
                    <div>{dynamicProgramming && <DynamicProgramming itemsArray={itemsArray} />}</div>
                </div>
            </div>
            <div>{compare && <Compare itemsArray={itemsArrayFile} />}</div>
        </div>
    );
}
export default Home;
