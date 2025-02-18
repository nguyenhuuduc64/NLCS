import { useContext, useEffect, useState } from 'react';
import { itemsContext } from '../../../App';
import OutputTable from '../../OutputTable/outputTable';
import { arrange } from '../arrange/arrange';
import { setPA } from '../utils';

function BranchAndBound({ itemsArray }) {
    const {
        trongluong,
        setParentIndex,
        setBnbCurrentIndex,
        bnbCurrentIndex,
        parentIndex,
        totalValueBnb,
        setTotalValueBnb,
        branchAndBound,
    } = useContext(itemsContext);
    const [remainingWeight, setRemainingWeight] = useState(trongluong);

    // Sắp xếp danh sách vật phẩm
    itemsArray = arrange(itemsArray);
    const n = itemsArray.length;
    let bestSolutions = Array(n).fill(0);
    const [dsdv, setDsdv] = useState(() => JSON.parse(JSON.stringify(itemsArray)));

    useEffect(() => {
        // Mỗi khi branchAndBound thay đổi, reset dsdv
        let newArr = JSON.parse(JSON.stringify(itemsArray));
        setPA(newArr);
        setDsdv(newArr);
    }, []);
    let GiaLNTT = 0.0;

    const Chon = (TLConLai, TLVat) => (TLVat === 0 ? 0 : Math.floor(TLConLai / TLVat));

    const GhiNhanKiLuc = (newBestSolutions, newTGT) => {
        if (GiaLNTT < newTGT) {
            GiaLNTT = newTGT;
            const updatedDsdv = dsdv.map((item, i) => ({ ...item, PA: newBestSolutions[i] }));
            setDsdv(updatedDsdv);

            let templeTLConLai = trongluong - dsdv.reduce((sum, item) => sum + item.PA * item.TL, 0);
            let templeTGT = dsdv.reduce((sum, item) => sum + item.PA * item.GT, 0);
            setRemainingWeight(templeTLConLai);
            setTotalValueBnb(templeTGT);
        }
    };
    useEffect(() => {
        let TLConLai = trongluong;
        let TGT = 0.0;

        const Try = (i, TLConLai, TGT, bestSolutions) => {
            if (i >= n) return;

            setTimeout(() => {
                setParentIndex(i);
            }, 100);
            let templeChon;

            if (dsdv[i].SL) templeChon = Math.min(Chon(TLConLai, dsdv[i].TL), dsdv[i].SL);
            else templeChon = Chon(TLConLai, dsdv[i].TL);
            for (let j = templeChon; j >= 0; j--) {
                let newTGT = TGT + j * dsdv[i].GT;
                let newTLConLai = TLConLai - j * dsdv[i].TL;
                let newBestSolutions = [...bestSolutions];
                newBestSolutions[i] = j;
                let CT = newTGT + (i < n - 1 ? newTLConLai * dsdv[i + 1].DG : 0);

                if (CT > GiaLNTT) {
                    if (i === n - 1 || newTLConLai === 0) {
                        GhiNhanKiLuc(newBestSolutions, newTGT);
                    } else {
                        setTimeout(() => {
                            Try(i + 1, newTLConLai, newTGT, newBestSolutions);
                        }, 500); // Delay giúp UI dễ thấy hơn
                    }
                }
            }
        };

        Try(0, TLConLai, TGT, bestSolutions);
    }, [trongluong, branchAndBound]); // useEffect chạy lại khi `trongluong` thay đổi

    return (
        <OutputTable
            sapxep={true}
            itemsArray={dsdv}
            PA={true}
            remainingWeight={remainingWeight}
            currentIndex={parentIndex} // Node con
            totalValue={totalValueBnb}
        />
    );
}

export default BranchAndBound;
