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
