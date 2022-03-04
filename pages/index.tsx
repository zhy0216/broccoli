import type {NextPage} from 'next'
import styles from '../styles/Home.module.scss'
import {useState} from "react"
import {Modal} from "../components/Modal"
import {InviteForm} from "../components/InviteForm"

const Home: NextPage = () => {
  const [inviteModalVisible, setInviteModalVisible] = useState(false)
  const [allDoneModalVisible, setAllDoneModalVisible] = useState(false)

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
          onClick={(e) => {
            e.stopPropagation()
            setInviteModalVisible(true)
          }}
        >
          Request an invite
        </button>
        <Modal
          title="Request an invite"
          visible={inviteModalVisible}
          onClickOutside={() => setInviteModalVisible(false)}
        >
          <InviteForm
            onSuccessSubmit={() => {
              setInviteModalVisible(false)
              setAllDoneModalVisible(true)
            }}
          />
        </Modal>
        <Modal
          title="All done!"
          visible={allDoneModalVisible}
          onClickOutside={() => setAllDoneModalVisible(false)}
        >
          <div>You will be the first to experience
            Broccoli & Co. when we launch.
          </div>
          <button
            className={styles.okBtn}
            onClick={() => setAllDoneModalVisible(false)}
          >
            OK
          </button>
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
