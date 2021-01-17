import Head from 'next/head'
import styles from '../styles/Main.module.css'
import { Map, Sidebar } from '../components'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Wander Tracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Sidebar />
        <Map />
      </main>
    </div>
  )
}
