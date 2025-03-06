export const setPA = (itemsArray) => {
    itemsArray.forEach((item) => {
        item.PA = 0;
    });
    console.log('da set PA');
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
    return !itemsArray.some((item) => isNaN(item.TL) || isNaN(item.GT));
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
