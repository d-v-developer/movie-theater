import { Header } from '../Header/Header';
import { Button } from '../Button/Button';
import styles from './AuthForm.module.css';
import { AuthFormProps } from './AuthForm.props';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Input } from '../Input/Input';

export function AuthForm({ onSubmit }: AuthFormProps) {
    const [inputName, setInputName] = useState('');

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      setInputName(e.target.value);
    };

    const Login = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();      
        onSubmit(inputName);  
        setInputName('');
    };

  return (
    <form className={styles['auth-form']} onSubmit={Login}>
        <Header>Вход</Header>
        <Input placeholder={'Ваше имя'} onChange={onChange} value={inputName}/>
        <Button>Войти в профиль</Button>
    </form>
  );
}
