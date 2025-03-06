export const exceptionData = (itemsArray = []) => {
    return !itemsArray.some((item) => isNaN(item.TL) || isNaN(item.GT));
};
