import React from 'react';
import styles from '../assets/Tooltip.module.scss';
interface TooltipProps {
    text: string;
    children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({text, children}) => {
    return (
        <div className={styles['tooltip-container']}>
            {children}
            <div className={styles['tooltip']}>{text}</div>
        </div>
    );
};

export default Tooltip;