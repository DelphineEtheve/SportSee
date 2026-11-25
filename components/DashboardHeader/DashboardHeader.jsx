import Image from 'next/image'
import Link from 'next/link'
import styles from './DashboardHeader.module.css'

export default function DashboardHeader() {
  return (
    <header className={styles.header}>
      <Link href="/dashboard" aria-label="SportSee — Tableau de bord">
        <Image
          src="/images/Logo.png"
          alt="SportSee"
          width={160}
          height={24}
          className={styles.logo}
        />
      </Link>

      <nav className={styles.nav} aria-label="Navigation principale">
        <Link href="/dashboard">Dashboard</Link>

        <button type="button" disabled>Coach AI</button>
        <button type="button" disabled>Mon profil</button>
        <button type="button" className={styles.logout} disabled>
            Se déconnecter
        </button>
      </nav>
    </header>
  )
}