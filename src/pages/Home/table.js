import styles from './home.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Table({ itemsArray, sapxep }) {
    console.log(sapxep);

    if (sapxep) {
        /*tạo đơn giá cho các đò vật */
        for (let i = 0; i < itemsArray.length; i++) {
            /*làm tròn đến số thập phân thứ 2 */
            itemsArray[i].DG = Math.round((itemsArray[i].TL / itemsArray[i].GT) * 100) / 100;
        }

        /*sắp xếp lại mảng */
        for (let i = 0; i < itemsArray.length; i++) {
            for (let j = i + 1; j < itemsArray.length; j++) {
                if (itemsArray[i].DG < itemsArray[j].DG) {
                    let temp = itemsArray[i];
                    itemsArray[i] = itemsArray[j];
                    itemsArray[j] = temp;
                }
            }
        }
    }
    return (
        <div>
            {itemsArray.length != 0 && (
                <table className={cx('table')}>
                    <thead>
                        <tr>
                            <th>Tên</th>
                            <th>Trọng lượng</th>
                            <th>Giá trị</th>
                            {sapxep && <th>Đơn giá</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {itemsArray.map((item, index) => (
                            <tr key={index}>
                                <td>{item.ten}</td>
                                <td>{item.TL}</td>
                                <td>{item.GT}</td>
                                <td>{item.dg ?? item.DG}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Table;
