import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h3>BROCCOLI & CO</h3>
      </header>
      <main className={styles.main}>
        <div style={{flex: 1}}>
          <h1>A better way <br/>to enjoy every day.</h1>
        </div>
        <div>be the first when we launch.</div>
        <button
          className={styles.inviteBtn}
        >
          Request an invite
        </button>
      </main>

      <footer className={styles.footer}>
        <div>Made with love in Melbourne</div>
        <div>@ 2016 Broccoli & Co. All copy right reserved.</div>
      </footer>
    </div>
  )
}

export default Home
