import React, {MouseEventHandler} from "react"
import ReactDOM from "react-dom"
import styles from "./Modal.module.scss"

interface Props {
  title: string
  visible: boolean
}

interface State {
  // visible: boolean
}

export class Modal extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {

    }
  }

  render() {
    const {children, title, visible} = this.props
    if (!visible) {
      return <></>
    }

    return ReactDOM.createPortal(<>
      <div className={styles.mask}></div>
      <div className={styles.container}>
        <div className={styles.header}>{title}</div>
        <div className={styles.content}>{children}</div>
      </div>
      </>, document.body)
  }
}
