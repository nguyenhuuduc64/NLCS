import classNames from 'classnames/bind';
import styles from '../../pages/Home/home.module.scss';
import Greedy from '../function/Greddy/greedy';
import BranchAndBound from '../function/BranchAndBound/branchandbounce';
import DynamicProgramming from '../function/DynamicProgramming/DynamicProgramming';
import { useContext, useEffect } from 'react';
import { itemsContext } from '../../App';

const cx = classNames.bind(styles);
function Compare({ itemsArray }) {
    const { compare, setCompare } = useContext(itemsContext);
    /*nhấn esc để tắt hiển thị bảng so sánh */
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key == 'Escape') setCompare(false);
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []); // Dependency array rỗng để chỉ chạy một lần khi component mount

    return (
        <div className={cx('compare-wrapper')} style={{ display: 'flex' }}>
            <div style={{ width: 'calc(100% / 3)' }}>
                <Greedy itemsArray={itemsArray} />
            </div>
            <div style={{ width: 'calc(100% / 3)' }}>
                <BranchAndBound itemsArray={itemsArray} />
            </div>
            <div style={{ width: 'calc(100% / 3)' }}>
                <DynamicProgramming itemsArray={itemsArray} />
            </div>
        </div>
    );
}

export default Compare;
