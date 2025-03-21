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
    console.log(itemsArray);
    const invalidItem = itemsArray.find(
        (item) => isNaN(item.TL) || isNaN(item.GT) || isNaN(item.SL) || item.GT == 0 || item.TL == 0,
    );

    if (invalidItem) {
        alert('Thông tin đồ vật không hợp lệ! Vui lòng nhập lại.');
        window.location.reload();

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
