'use client';

import {useLogin} from "@/hooks/useLogin";
import {useRouter} from "next/navigation";
import styles from './LoginForm.module.css';

export default function LoginForm() {
  const { login } = useLogin()
  const router = useRouter()


async function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget)
        const username = formData.get('username')
        const password = formData.get('password')

    try {
        await login({ username, password })
        router.replace('/dashboard')
    } catch (error) {
        console.error("Erreur lors de la connexion :", error.message)
    }
};

return(
    <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="username">Nom d'utilisateur</label>
        <input
            id="username"
            name="username"
            type="text"
            required
        />
        <label htmlFor="password">Mot de passe</label>
        <input
            id="password" 
            name="password"
            type="password"
            required
        />
        <button type="submit">
            Se connecter
        </button>
    </form>
)}