export const setPA = (itemsArray) => {
    itemsArray.forEach((item) => {
        item.PA = 0;
    });
};

export const setSolutionForItemsArray = (itemsArray, PA) => {
    itemsArray.filter((item, i) => {
        item.PA = PA[i];
    });
};

export const setSolutionBeforeSort = (sortItems, itemsArray) => {
    itemsArray.map((item, i) => {
        sortItems.map((sortItem, j) => {
            if (item.id === sortItem.id) {
                item.PA = sortItem.PA;
            }
        });
    });
    return itemsArray;
};

export const identifyBalo = (itemsArray, soluong) => {
    let count = 0;
    itemsArray.map((item) => {
        if (item.SL) count++;
    });
    if (count > 0) return 2;
    if (count == 0) {
        let temple = prompt('Bạn muốn giải thuật theo bài toán cái ba lô 1 hay 3');
        return temple;
    }
};

export const exceptionData = (itemsArray = [], soluong, identify) => {
    /*if (identify == 1 || identify == 3) {
        itemsArray.some((item, index) => {
            if (isNaN(item.GT) || isNaN(item.TL) || item.TL == 0 || item.GT == 0) {
                console.log('khong co so luong');

                alert(`Dữ liệu không hợp lệ, lỗi tại dòng ${index + 1}`);
                window.location.reload();
                return false;
            }
        });
    }*/
    if (identify == 2 || identify == 0) {
        const isInvalid = itemsArray.some((item, index) => {
            if (isNaN(item.GT) || isNaN(item.TL) || isNaN(item.SL) || item.TL == 0 || item.GT == 0 || item.SL == 0) {
                alert(`Dữ liệu không hợp lệ, Lỗi tại dòng: ${index + 1}`);
                window.location.reload();
                return true;
            }
            return false;
        });
    }

    return true;
};
export const handleItemsArray = (itemsArray, soluong, identify) => {
    if (identify == 1) itemsArray.filter((item) => (item.SL = Infinity));
    if (identify == 3) itemsArray.filter((item) => (item.SL = 1));
};
export const sortByID = (itemsArray) => {
    let sortedArray = itemsArray.map((item) => ({ ...item })); // Tạo bản sao
    let n = sortedArray.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (sortedArray[j].id > sortedArray[j + 1].id) {
                // Hoán đổi giá trị
                let temp = sortedArray[j];
                sortedArray[j] = sortedArray[j + 1];
                sortedArray[j + 1] = temp;
            }
        }
    }
    return sortedArray;
};
