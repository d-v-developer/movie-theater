import styles from './Header.module.css';
import { HeaderProps } from './Header.props';

export function Header({ children }: HeaderProps) {
	return (
		<h1 className={styles['header']}>{children}</h1>
	);
}
