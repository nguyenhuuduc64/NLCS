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
export const exceptionData = (itemsArray = []) => {
    const invalidItem = itemsArray.find((item) => isNaN(item.TL) || isNaN(item.GT) || item.GT == 0 || item.TL == 0);

    if (invalidItem) {
        alert('Thông tin đồ vật không hợp lệ! Vui lòng nhập lại.');
        return false;
    }

    return true;
};

export const errorName = (name) => {
    name == 'N/A' ?? alert('Lỗi nhập tên đồ vật!!');
    return name == 'N/A';
};

export const errorTL = (TL) => {
    TL == 0 ?? alert('Trọng lượng không được bằng 0');
    return TL == 0;
};

export const errorGT = (GT) => {
    GT == 0 ?? alert('Giá trị không được bằng 0');
    return GT == 0;
};

export const sortByID = (itemsArray) => {
    let n = itemsArray.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (itemsArray[j].id > itemsArray[j + 1].id) {
                // Swap itemsArray[j] and itemsArray[j + 1]
                let temp = itemsArray[j];
                itemsArray[j] = itemsArray[j + 1];
                itemsArray[j + 1] = temp;
            }
        }
    }
    return itemsArray;
};
