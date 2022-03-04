import React from "react"
import styles from "./Input.module.scss"

interface Props {
  placeholder: string
  onChange: (value: string) => void
  value: string
  error: boolean
}

interface State {
}

export class Input extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {}
  }

  render() {
    const {onChange, value, placeholder, error} = this.props


    return <div
      className={error? styles.container: [styles.container, styles.containerError].join(" ")}
    >
      <input
        onChange={(e) => onChange(e.target.value)}
        value={value}
        placeholder={placeholder}
      />
    </div>
  }
}
