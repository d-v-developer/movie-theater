import { useEffect, useState } from "react";
import { AuthForm } from "../../components/AuthForm/AuthForm";
import styles from './Login.module.css';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { userActions } from "../../store/user.slice";

export function Login() {
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();
	const loginedUser = useSelector((s: RootState) => s.user.loginedUser);
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		let errorTimer: ReturnType<typeof setTimeout>;
		if (error) {
			errorTimer = setTimeout(() => {
				setError(null);
			}, 2000)
		}
		return () => {
			clearTimeout(errorTimer)
		}
	}, [error])

	const checkUser = (userName: string) => {
		if (loginedUser) {
			setError('User has already logged in. Please, log out first!');
		} else {
			dispatch(userActions.login(userName));
			setError(null);
			navigate('/')
		};
	};

	return(
		<div>
			{error && <div className={styles.error}>{error}</div>}
			<AuthForm onSubmit={checkUser}/>		
		</div>
	);
}