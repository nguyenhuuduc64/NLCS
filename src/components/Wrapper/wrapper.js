import styles from './wrapper.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Wrapper() {
    return <div className={cx('wrapper')}></div>;
}

export default Wrapper;
