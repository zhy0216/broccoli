import React from "react"
import ReactDOM from "react-dom"
import styles from "./Modal.module.scss"

interface Props {
  title: string
  visible: boolean
  onClickOutside?: () => void
}

export class Modal extends React.Component<Props> {
  domClick = (e: Event) => {
    const {onClickOutside} = this.props
    onClickOutside && onClickOutside()
  }

  componentDidMount() {
    window.addEventListener("click", this.domClick)
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.domClick)
  }

  render() {
    const {children, title, visible} = this.props
    if (!visible) {
      return <></>
    }

    return ReactDOM.createPortal(<>
      <div className={styles.mask}></div>
      <div
        className={styles.container}
        onClick={e => e.stopPropagation()}
      >
        <div className={styles.header}>{title}</div>
        <div className={styles.content}>{children}</div>
      </div>
      </>, document.body)
  }
}
