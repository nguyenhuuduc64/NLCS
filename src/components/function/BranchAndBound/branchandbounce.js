import { useContext, useEffect, useState } from 'react';
import { itemsContext } from '../../../App';
import OutputTable from '../../OutputTable/outputTable';
import { arrange } from '../arrange/arrange';

function BranchAndBound({ itemsArray }) {
    const {
        trongluong,
        setTrongluong,
        parentIndex,
        setParentIndex,
        branhAndBound,
        bnbCurrentIndex,
        setBnbCurrentIndex,
    } = useContext(itemsContext);
    const [remainingWeight, setRemainingWeight] = useState(trongluong);

    itemsArray = arrange(itemsArray);

    const n = itemsArray.length;

    let currentWeight = trongluong;
    let bestSolutions = Array(n).fill(0);
    let dsdv = [...itemsArray];
    let TLConLai, CT, GiaLNTT, TGT;
    const Chon = (TLConLai, TLVat) => {
        return TLVat === 0 ? 0 : Math.floor(TLConLai / TLVat);
    };

    const init = () => {
        TLConLai = currentWeight;
        CT = n > 0 ? currentWeight * dsdv[0].DG : 0;
        GiaLNTT = 0.0;
        TGT = 0.0;
    };

    const GhiNhanKiLuc = (newBestSolutions, newTGT) => {
        if (GiaLNTT < newTGT) {
            GiaLNTT = newTGT;
            for (let i = 0; i < n; i++) {
                dsdv[i].PA = newBestSolutions[i];
            }
            let templeTLConLai = trongluong;
            dsdv.forEach((item, index) => {
                templeTLConLai -= item.PA * item.TL;
            });
            setTimeout(() => {
                setRemainingWeight(templeTLConLai);
            }, 0);
        }
    };

    const Try = (i, TLConLai, TGT, bestSolutions) => {
        if (i >= n) return;

        let templeChon = Chon(TLConLai, dsdv[i].TL) > dsdv[i].SL ? dsdv[i].SL : Chon(TLConLai, dsdv[i].TL);
        for (let j = templeChon; j >= 0; j--) {
            let newTGT = TGT + j * dsdv[i].GT;
            let newTLConLai = TLConLai - j * dsdv[i].TL;
            let newBestSolutions = [...bestSolutions]; // Tạo bản sao để không bị ghi đè
            newBestSolutions[i] = j; // Cập nhật phương án của vật thứ i
            let CT = newTGT + (i < n - 1 ? newTLConLai * dsdv[i + 1].DG : 0);

            if (CT > GiaLNTT) {
                if (i === n - 1 || newTLConLai === 0) {
                    GhiNhanKiLuc(newBestSolutions, newTGT);
                } else {
                    Try(i + 1, newTLConLai, newTGT, newBestSolutions);
                }
            }
        }
    };

    init();
    Try(0, TLConLai, TGT, bestSolutions);
    return (
        <OutputTable
            sapxep={true}
            itemsArray={dsdv}
            PA={true}
            remainingWeight={remainingWeight}
            currentIndex={parentIndex}
        />
    );
}

export default BranchAndBound;
