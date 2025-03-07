import classNames from 'classnames/bind';
import styles from '../../../pages/Home/home.module.scss';
import OutputTable from '../../OutputTable/outputTable';
import { useContext, useEffect, useState } from 'react';
import { itemsContext } from '../../../App';
import { setPA } from '../utils';

const cx = classNames.bind(styles);

function DynamicProgramming({ itemsArray }) {
    const { trongluong, dynamicProgramming, exportArrayResult, setExportArrayResult } = useContext(itemsContext);
    const n = itemsArray.length; // Kích thước của mảng items
    const W = parseInt(trongluong); // Trọng lượng tối đa
    // Khởi tạo bảng F và X
    let F = Array.from({ length: n }, () => Array(W + 1).fill(0));
    let X = Array.from({ length: n }, () => Array(W + 1).fill(0));
    const [dsdv, setDsdv] = useState(() => JSON.parse(JSON.stringify(itemsArray)));

    useEffect(() => {
        let newArr = JSON.parse(JSON.stringify(itemsArray));
        setPA(newArr);
        setDsdv(newArr);
    }, [dynamicProgramming]);

    const Chon = (k, V) => {
        if (dsdv[k].SL == null) return Math.floor(V / dsdv[k].TL);
        else return Math.floor(V / dsdv[k].TL) > dsdv[k].SL ? dsdv[k].SL : Math.floor(V / dsdv[k].TL);
    };

    const TaoBang = (dsdv, n, W, F, X) => {
        // Khởi tạo hàng đầu tiên
        for (let V = 0; V <= W; V++) {
            X[0][V] = Chon(0, V); // Sử dụng Math.floor để tránh giá trị thập phân
            F[0][V] = X[0][V] * dsdv[0].GT;
        }

        // Điền bảng động
        for (let k = 1; k < n; k++) {
            for (let V = 0; V <= W; V++) {
                let FMax = F[k - 1][V];
                console.log('cap nhat Fmax');
                let XMax = 0;
                let yk = Chon(k, V);
                for (let xk = 0; xk <= yk; xk++) {
                    let TLConLai = V - xk * dsdv[k].TL;
                    if (TLConLai >= 0) {
                        let newValue = F[k - 1][TLConLai] + xk * dsdv[k].GT;
                        if (newValue > FMax) {
                            FMax = newValue;
                            XMax = xk;
                        }
                    }
                }
                F[k][V] = FMax;
                X[k][V] = XMax;
            }
        }
    };
    console.log(X);
    const TraBang = (dsdv, n, W, X) => {
        let V = W;
        for (let k = n - 1; k >= 0; k--) {
            dsdv[k].PA = X[k][V];
            V -= X[k][V] * dsdv[k].TL;
        }
    };
    TaoBang(dsdv, n, W, F, X);
    TraBang(dsdv, n, W, X);
    const totalValue = F[n - 1][W];
    const remainingWeight = W - dsdv.reduce((acc, item) => acc + item.PA * item.TL, 0);
    /**********************làm cho export arrayarray */
    setExportArrayResult(dsdv);
    return (
        <div className={cx('')}>
            <OutputTable
                itemsArray={dsdv}
                PA={true}
                sapxep={true}
                totalValue={totalValue}
                remainingWeight={remainingWeight}
                name="Thuật toán Quy hoạch động"
            />
        </div>
    );
}

export default DynamicProgramming;
