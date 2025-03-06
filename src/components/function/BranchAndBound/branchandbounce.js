import { useContext, useEffect, useState } from 'react';
import { itemsContext } from '../../../App';
import OutputTable from '../../OutputTable/outputTable';
import { arrange } from '../arrange/arrange';
import { setPA } from '../utils';

function BranchAndBound({ itemsArray }) {
    const { trongluong, setParentIndex, totalValueBnb, setTotalValueBnb, branchAndBound, setExportArrayResult } =
        useContext(itemsContext);

    const [remainingWeight, setRemainingWeight] = useState(trongluong);
    // Sắp xếp danh sách vật phẩm
    itemsArray = arrange(itemsArray);
    const n = itemsArray.length;
    let bestSolutions = Array(n).fill(0);
    let GiaLNTT = 0.0;
    const [dsdv, setDsdv] = useState(JSON.parse(JSON.stringify(itemsArray)));

    const Chon = (TLConLai, TLVat) => Math.floor(TLConLai / TLVat);

    const GhiNhanKiLuc = (newBestSolutions, newTGT) => {
        console.log(newBestSolutions);
        if (GiaLNTT < newTGT) {
            GiaLNTT = newTGT;
            const updatedDsdv = JSON.parse(JSON.stringify(dsdv));
            newBestSolutions.forEach((item, index) => {
                updatedDsdv[index].PA = item;
            });
            setDsdv(updatedDsdv);
            let templeTLConLai = trongluong - updatedDsdv.reduce((sum, item) => sum + item.PA * item.TL, 0);
            let templeTGT = updatedDsdv.reduce((sum, item) => sum + item.PA * item.GT, 0);
            setRemainingWeight(templeTLConLai);
            setTotalValueBnb(templeTGT);
        }
    };

    const upperBound = (i, TGT, TLConLai) => {
        // Kiểm tra xem đối tượng dsdv[i + 1] có thuộc tính DG hay không
        if (!dsdv[i + 1] || typeof dsdv[i + 1].DG === 'undefined') {
            // Trả về giá trị mặc định nếu DG không tồn tại
            return TGT;
        }
        let bound = TGT + TLConLai * dsdv[i + 1].DG;
        return bound;
    };

    useEffect(() => {
        let TLConLai = trongluong;
        let TGT = 0.0;

        const Try = (i, TLConLai, TGT, bestSolutions) => {
            if (i >= n || TLConLai < 0) return;

            let templeChon;

            if (dsdv[i].SL) templeChon = Math.min(Chon(TLConLai, dsdv[i].TL), dsdv[i].SL);
            else templeChon = Chon(TLConLai, dsdv[i].TL);
            console.log('templeChon', templeChon);
            for (let j = templeChon; j >= 0; j--) {
                console.log('j', j);
                let newTGT = TGT + j * dsdv[i].GT;
                let newTLConLai = TLConLai - j * dsdv[i].TL;
                let newBestSolutions = [...bestSolutions];
                newBestSolutions[i] = j;
                let CT = upperBound(i, newTGT, newTLConLai);
                console.log('i', i, 'CT', CT, 'GTLNTT', GiaLNTT);
                if (CT > GiaLNTT) {
                    if (i === n - 1 || newTLConLai === 0) {
                        GhiNhanKiLuc(newBestSolutions, newTGT);
                    } else {
                        Try(i + 1, newTLConLai, newTGT, newBestSolutions);
                    }
                }
            }
        };

        Try(0, TLConLai, TGT, bestSolutions);
    }, [trongluong, branchAndBound]);
    /*************************làm cho export array*/
    setExportArrayResult(dsdv);
    return (
        <OutputTable
            sapxep={true}
            itemsArray={dsdv}
            PA={true}
            remainingWeight={remainingWeight}
            totalValue={totalValueBnb}
            name="Thuật toán Nhánh cận"
        />
    );
}

export default BranchAndBound;
