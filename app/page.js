import Image from "next/image";
import styles from "./page.module.css";
import Link from 'next/link'
import LoginForm from "@/components/LoginForm/LoginForm";


export default function Home() {
  
  return (
    <main className={styles.loginPage}>
      <div className={styles.loginPanel}>
      <Image
        src="/images/Logo.png"
        alt="SportSee"
        width={160}
        height={24}
        className={styles.logo}
      />

      <section className={styles.loginCard}>
        <h1>Transformez vos stats en résultats</h1>
        <h2>Se connecter</h2>
        <LoginForm />
      </section>
      </div>

      <div className={styles.hero} />
    </main>
  );
}

