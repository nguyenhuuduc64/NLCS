export const arrange = (array) => {
    let sortArray = [...array];
    for (let i = 0; i < sortArray.length; i++) {
        for (let j = i + 1; j < sortArray.length; j++) {
            if (sortArray[i].DG < sortArray[j].DG) {
                let temp = sortArray[i];
                sortArray[i] = sortArray[j];
                sortArray[j] = temp;
            }
        }
    }
    return sortArray;
};
