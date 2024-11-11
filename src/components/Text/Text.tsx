import cn from 'classnames';
import styles from './Text.module.css';
import { TextProps } from './Text.props';

export function Text( {children, size}: TextProps ) {
  return (
    <p className={cn(styles['p'], 
        {
            [styles['small']]: size === 'small',
            [styles['medium']]: size === 'medium'
        }
    )}>{children}</p>
);
}
