import classNames from 'classnames/bind';
import styles from '../../pages/Home/home.module.scss';
import Greedy from '../function/Greddy/greedy';
import BranchAndBound from '../function/BranchAndBound/branchandbounce';
import DynamicProgramming from '../function/DynamicProgramming/DynamicProgramming';
import { useContext, useEffect } from 'react';
import { itemsContext } from '../../App';
import OutputTable from '../OutputTable/outputTable';

const cx = classNames.bind(styles);
function Compare({ itemsArray }) {
    const { compare, setCompare, PAGreedy, PABranchAndBound, PADynamicProgramming } = useContext(itemsContext);
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
            <Greedy itemsArray={itemsArray} display={false} />
            <BranchAndBound itemsArray={itemsArray} display={false} />
            <DynamicProgramming itemsArray={itemsArray} display={false} />
            <OutputTable itemsArray={itemsArray} compare={true} />
        </div>
    );
}

export default Compare;
