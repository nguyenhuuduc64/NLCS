import classNames from 'classnames/bind';
import styles from '../../../pages/Home/home.module.scss';
import OutputTable from '../../OutputTable/outputTable';
import { useContext, useEffect, useState } from 'react';
import { itemsContext } from '../../../App';
import { setPA } from '../utils';

const cx = classNames.bind(styles);

function DynamicProgramming({ itemsArray, display }) {
    const {
        trongluong,
        dynamicProgramming,
        setExportArrayResult,
        setPADynamicProgramming,
        setTotalValueDynamicProgramming,
        totalValueDynamicProgramming,
        setRemainingWeightDynamicProgramming,
        remainingWeightDynamicProgramming,
        executionTimeDynamicProgramming,
        setExecutionTimeDynamicProgramming,
    } = useContext(itemsContext);
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
        for (let V = 0; V <= W; V++) {
            X[0][V] = Chon(0, V);
            F[0][V] = X[0][V] * dsdv[0].GT;
        }

        for (let k = 1; k < n; k++) {
            for (let V = 0; V <= W; V++) {
                let FMax = F[k - 1][V];
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
    const TraBang = (dsdv, n, W, X) => {
        let V = W;
        for (let k = n - 1; k >= 0; k--) {
            dsdv[k].PA = X[k][V];
            V -= X[k][V] * dsdv[k].TL;
        }
    };

    /**********************làm cho export arrayarray */
    setExportArrayResult(dsdv);
    /*****************Đưa phương án của greedy ra ngoài */
    useEffect(() => {
        const startTime = window.performance.now();
        TaoBang(dsdv, n, W, F, X);
        TraBang(dsdv, n, W, X);
        const totalValue = F[n - 1][W];
        console.log(F);
        console.log(X);
        const remainingWeight = W - dsdv.reduce((acc, item) => acc + item.PA * item.TL, 0);
        const endTime = window.performance.now();
        const resultTime = endTime - startTime || 0.0001;
        let PATemple = dsdv.map((dv) => dv.PA);
        setPADynamicProgramming(PATemple);
        setRemainingWeightDynamicProgramming(remainingWeight);
        setTotalValueDynamicProgramming(totalValue);
        setExecutionTimeDynamicProgramming(resultTime.toFixed(4));
    }, [dsdv]);
    return (
        display && (
            <div>
                <OutputTable
                    itemsArray={dsdv}
                    PA={true}
                    sapxep={true}
                    totalValue={totalValueDynamicProgramming}
                    remainingWeight={remainingWeightDynamicProgramming}
                    name="Thuật toán Quy hoạch động"
                    type="DYNAMIC_PROGRAMMING"
                />
                <p>Thời gian thực thi thuật toán: {executionTimeDynamicProgramming}</p>
            </div>
        )
    );
}

export default DynamicProgramming;
