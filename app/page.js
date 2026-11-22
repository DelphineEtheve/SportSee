import Image from "next/image";
import styles from "./page.module.css";
import Link from 'next/link'


export default function Home() {
  
  

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        
        <div className={styles.intro}>
          <h1>
            Bienvenue dans le projet sportsee
          </h1>
             
            <Link href="/connexion">Se connecter</Link>
        </div>
      </main>
    </div>
  );
}
