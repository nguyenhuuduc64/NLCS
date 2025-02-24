import classNames from 'classnames/bind';
import styles from '../../pages/Home/home.module.scss';
import Greedy from '../function/Greddy/greedy';
import BranchAndBound from '../function/BranchAndBound/branchandbounce';
import DynamicProgramming from '../function/DynamicProgramming/DynamicProgramming';

const cx = classNames.bind(styles);

function Compare({ itemsArray }) {
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
