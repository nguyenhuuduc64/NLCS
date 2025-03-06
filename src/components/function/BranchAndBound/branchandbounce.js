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

    useEffect(() => {
        console.log(dsdv); // Ghi log mỗi khi dsdv thay đổi
    }, [dsdv]); // useEffect này chỉ được gọi khi dsdv thay đổi

    const Chon = (TLConLai, TLVat) => (TLVat === 0 ? 0 : Math.floor(TLConLai / TLVat));

    const GhiNhanKiLuc = (newBestSolutions, newTGT) => {
        if (GiaLNTT < newTGT) {
            GiaLNTT = newTGT;
            const updatedDsdv = JSON.parse(JSON.stringify(dsdv));
            newBestSolutions.forEach((item, index) => {
                updatedDsdv[index].PA = item;
            });
            console.log('new', updatedDsdv);
            setDsdv(updatedDsdv);
            let templeTLConLai = trongluong - updatedDsdv.reduce((sum, item) => sum + item.PA * item.TL, 0);
            let templeTGT = updatedDsdv.reduce((sum, item) => sum + item.PA * item.GT, 0);
            setRemainingWeight(templeTLConLai);
            setTotalValueBnb(templeTGT);
            console.log('da ghi nhan ky luc');
        }
    };

    const upperBound = (i, TGT, TLConLai) => {
        let bound = TGT;
        for (let k = i; k < n; k++) {
            if (dsdv[k].TL <= TLConLai) {
                bound += dsdv[k].GT; // Chọn toàn bộ nếu còn đủ trọng lượng
                TLConLai -= dsdv[k].TL;
            } else {
                bound += TLConLai * dsdv[k].DG; // Chia nhỏ vật phẩm cuối
                break;
            }
        }
        return bound;
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
                let CT = upperBound(i, newTGT, newTLConLai);

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
