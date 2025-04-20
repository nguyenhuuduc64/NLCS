import { useContext, useEffect, useState, useRef } from 'react';
import { itemsContext } from '../../../App';
import OutputTable from '../../OutputTable/outputTable';
import { arrange } from '../arrange/arrange';
import { sortByID } from '../utils';

function BranchAndBound({ itemsArray, display }) {
    const {
        trongluong,
        totalValueBnb,
        setTotalValueBnb,
        branchAndBound,
        setExportArrayResult,
        setPABranchAndBound,
        setRemainingWeightBranchAndBound,
        executionTimeBranchAndBound,
        setExecutionTimeBranchAndBound,
    } = useContext(itemsContext);

    const [remainingWeight, setRemainingWeight] = useState(trongluong);
    itemsArray = arrange(itemsArray);
    const n = itemsArray.length;
    let bestSolutions = Array(n).fill(0);
    let GiaLNTT = 0.0;
    const [dsdv, setDsdv] = useState(JSON.parse(JSON.stringify(itemsArray)));

    const startTimeRef = useRef(null);

    const Chon = (TLConLai, TLVat) => Math.floor(TLConLai / TLVat);

    const GhiNhanKiLuc = (newBestSolutions, newTGT, newTLCL) => {
        if (GiaLNTT < newTGT) {
            GiaLNTT = newTGT;
            const updatedDsdv = JSON.parse(JSON.stringify(dsdv));
            newBestSolutions.forEach((item, index) => {
                updatedDsdv[index].PA = item;
            });
            setDsdv(updatedDsdv);
            //let templeTLConLai = trongluong - updatedDsdv.reduce((sum, item) => sum + item.PA * item.TL, 0);
            //let templeTGT = updatedDsdv.reduce((sum, item) => sum + item.PA * item.GT, 0);
            setRemainingWeight(newTLCL);
            setTotalValueBnb(newTGT);
        }
    };

    const CanTren = (i, TGT, TLConLai) => {
        if (!dsdv[i + 1] || typeof dsdv[i + 1].DG === 'undefined') {
            return TGT;
        }
        return TGT + TLConLai * dsdv[i + 1].DG;
    };

    useEffect(() => {
        startTimeRef.current = performance.now();
        /*HÀM CHÍNH **********************************************************/
        let TLConLai = trongluong;
        let TGT = 0.0;

        const Try = (i, TLConLai, TGT, bestSolutions) => {
            if (i >= n || TLConLai < 0) return;

            let templeChon = dsdv[i].SL ? Math.min(Chon(TLConLai, dsdv[i].TL), dsdv[i].SL) : Chon(TLConLai, dsdv[i].TL);
            for (let j = templeChon; j >= 0; j--) {
                let newTGT = TGT + j * dsdv[i].GT;
                let newTLConLai = TLConLai - j * dsdv[i].TL;
                let newBestSolutions = [...bestSolutions];
                newBestSolutions[i] = j;
                let CT = CanTren(i, newTGT, newTLConLai);
                if (CT > GiaLNTT) {
                    if (i === n - 1 || newTLConLai === 0) {
                        GhiNhanKiLuc(newBestSolutions, newTGT, newTLConLai);
                    } else {
                        Try(i + 1, newTLConLai, newTGT, newBestSolutions);
                    }
                }
            }
        };
        /************************************************************************** */
        Try(0, TLConLai, TGT, bestSolutions);

        let endTime = performance.now();
        setExecutionTimeBranchAndBound((endTime - startTimeRef.current || 0.0001).toFixed(4));
    }, [trongluong, branchAndBound]);

    /*************************làm cho export array*/
    setExportArrayResult(dsdv);

    /*****************Đưa phương án của thuật toán nhánh cận ra ngoài */
    useEffect(() => {
        let PATemple = sortByID(dsdv).map((dv) => dv.PA);
        setPABranchAndBound(PATemple);
        setRemainingWeightBranchAndBound(remainingWeight);
    }, [dsdv]);
    setExportArrayResult(dsdv);
    return (
        display && (
            <div>
                <OutputTable
                    sapxep={true}
                    itemsArray={dsdv}
                    PA={true}
                    remainingWeight={remainingWeight}
                    totalValue={totalValueBnb}
                    name="Thuật toán Nhánh cận"
                    type="BRANCH_AND_BOUND"
                />
                <p>Thời gian thực hiện thuật toán: {executionTimeBranchAndBound} ms</p>
            </div>
        )
    );
}

export default BranchAndBound;
