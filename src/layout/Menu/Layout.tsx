import { NavLink, Outlet, useLocation } from 'react-router-dom';
import styles from './Layout.module.css';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { selectFavoriteCount } from '../../store/favorite.slice';
import { AppDispatch, RootState } from '../../store/store';
import { userActions } from '../../store/user.slice';

export function MainMenu() {
	const loginedUser = useSelector((s: RootState) => s.user.loginedUser);
	const favoriteCount = useSelector((s: RootState) => selectFavoriteCount(s, loginedUser));
	const dispatch = useDispatch<AppDispatch>();

	let userMenu = <NavLink className={({ isActive }) => cn(styles.link,
		{
			[styles.active]: isActive
		}
	)} to='/login'>
		{({ isActive }) => (
			<>
				<img
					src={isActive ? '/login-active-icon.svg' : '/login-icon.svg'}
					alt="login icon"
				/>
				Войти
			</>
		)}
	</NavLink>

	if (loginedUser) {
	userMenu = <div className={styles.loginedUser}>
			<NavLink onClick={logout} className={({ isActive }) => cn(styles.link,
				{
					[styles.active]: isActive
				}
			)} to='/login'>Выйти</NavLink> 
			<div className={styles.link}>
				<img src="/user-icon.svg" alt="icon user" />
				{loginedUser}
			</div>
		</div>
	}
	
	function logout() {
		dispatch(userActions.logOut());
	}
	
	return(
		<>
			<div className={styles.navbar}>
				<div className={styles['img-favorite']}>
					<img src="/favorite-icon.svg" alt="favorite icon" />
				</div>
				<div className={styles.menu}>
					<NavLink className={({ isActive }) => cn(styles.link,
						{
							[styles.active]: isActive
						}
					)} to='/'>Поиск фильмов</NavLink>  
					<NavLink className={({ isActive }) => cn(styles.link, 
						{
							[styles.active]: isActive
						}
					)} to='/favorites'>
						{favoriteCount > 0 && <span>{favoriteCount}</span>}
						Мои фильмы
					</NavLink> 
					{userMenu}
				</div>
			</div>
			<div className={styles.outlet}>
				<Outlet />
			</div>
		</>
	);
}