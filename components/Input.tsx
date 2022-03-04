import React from "react"
import styles from "./Input.module.scss"

interface Props {
  placeholder: string
  onChange: (value: string) => void
  value: string
  error: boolean
}

export class Input extends React.Component<Props> {
  render() {
    const {onChange, value, placeholder, error} = this.props
    const className = error? [styles.container, styles.containerError].join(" "): styles.container
    
    return <div
      className={className}
    >
      <input
        onChange={(e) => onChange(e.target.value)}
        value={value}
        placeholder={placeholder}
      />
    </div>
  }
}
