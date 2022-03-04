import type { NextPage } from 'next'
import styles from '../styles/Home.module.scss'
import {useState} from "react"
import {Modal} from "../components/Modal"
import {InviteForm} from "../components/InviteForm"

const Home: NextPage = () => {
  const [inviteModalVisible, setInviteModalVisible] = useState(false)

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
          onClick={() => setInviteModalVisible(true)}
        >
          Request an invite
        </button>
        <Modal
          title="Request an invite"
          visible={inviteModalVisible}
          confirmBtnText={"sending"}
          onConfirm={() => {}}
        >
          <InviteForm

          />
        </Modal>
        
      </main>

      <footer className={styles.footer}>
        <div>Made with love in Melbourne</div>
        <div>@ 2016 Broccoli & Co. All copy right reserved.</div>
      </footer>
    </div>
  )
}

export default Home
