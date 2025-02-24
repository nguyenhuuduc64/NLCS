import classNames from 'classnames/bind';
import styles from '../../../pages/Home/home.module.scss';
import OutputTable from '../../OutputTable/outputTable';
import { useContext, useEffect, useState } from 'react';
import { itemsContext } from '../../../App';
import { setPA } from '../utils';

const cx = classNames.bind(styles);

function DynamicProgramming({ itemsArray }) {
    const { trongluong, dynamicProgramming } = useContext(itemsContext);
    const n = itemsArray.length; // Kích thước của mảng items
    const W = parseInt(trongluong); // Trọng lượng tối đa
    // Khởi tạo bảng F và X
    let F = Array.from({ length: n }, () => Array(W + 1).fill(0));
    let X = Array.from({ length: n }, () => Array(W + 1).fill(0));
    const [dsdv, setDsdv] = useState(() => JSON.parse(JSON.stringify(itemsArray)));

    useEffect(() => {
        // Mỗi khi branchAndBound thay đổi, reset dsdv
        let newArr = JSON.parse(JSON.stringify(itemsArray));
        setPA(newArr);
        setDsdv(newArr);
    }, [dynamicProgramming]);
    const TaoBang = (dsdv, n, W, F, X) => {
        // Khởi tạo hàng đầu tiên
        for (let V = 0; V <= W; V++) {
            X[0][V] = Math.floor(V / dsdv[0].TL); // Sử dụng Math.floor để tránh giá trị thập phân
            F[0][V] = X[0][V] * dsdv[0].GT;
        }

        // Điền bảng động
        for (let k = 1; k < n; k++) {
            for (let V = 0; V <= W; V++) {
                let FMax = F[k - 1][V];
                let XMax = 0;
                let yk = Math.floor(V / dsdv[k].TL);

                for (let xk = 1; xk <= yk; xk++) {
                    if (V >= xk * dsdv[k].TL) {
                        const potentialValue = F[k - 1][V - xk * dsdv[k].TL] + xk * dsdv[k].GT;
                        if (potentialValue > FMax) {
                            FMax = potentialValue;
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
        console.log(typeof W);
        for (let k = n - 1; k >= 0; k--) {
            dsdv[k].PA = X[k][V];
            //console.log(`X[${k}][${V}] = ${X[k][V]}`);
            V -= X[k][V] * dsdv[k].TL;
        }
    };
    // Gọi hàm để thực thi lập trình động
    TaoBang(dsdv, n, W, F, X);
    TraBang(dsdv, n, W, X);
    console.log('X', X);
    console.log('F', F);
    const totalValue = F[n - 1][W];
    const remainingWeight = W - dsdv.reduce((acc, item) => acc + item.PA * item.TL, 0);
    return (
        <div className={cx('')}>
            <OutputTable
                itemsArray={dsdv}
                PA={true}
                sapxep={true}
                totalValue={totalValue}
                remainingWeight={remainingWeight}
            />
        </div>
    );
}

export default DynamicProgramming;
