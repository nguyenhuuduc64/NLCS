import Table from '../../pages/Home/table';
import { Item } from '../../Items';
import { itemsArray } from '../../pages/Home/table';
import { itemsContext } from '../../App';
import { useContext } from 'react';
function OutputTable() {
    const { itemsArray, setItemsArray } = useContext(itemsContext);

    const PA = [];
    itemsArray.map((item, index) => {
        PA[index] = new Item(item);
        PA[index].PA = 50 % PA[index].TL;
    });
    return <div>{}</div>;
}

export default OutputTable;
