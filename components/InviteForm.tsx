import React from "react"
import styles from "./InviteForm.module.scss"
import {Input} from "./Input"

interface Props {
  onSuccessSubmit: () => void
}

interface State {
  name: string
  email: string
  confirmEmail: string
  submitText: string
  errorAttributes: Set<String>
}

export class InviteForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      name: "",
      email: "",
      confirmEmail: "",
      submitText: "Send",
      errorAttributes: new Set(),
    }
  }

  makeOnChange = (attributeName: keyof State) => (value: string) => this.setState({[attributeName]: value} as any)

  onSubmit = () => {
    const {name, email, confirmEmail} = this.state
    const errorAttributes = new Set<string>()
    // do validation here


    this.setState({errorAttributes})

    if(errorAttributes.size === 0) {

    }
  }

  render() {
    const {name, email, confirmEmail, submitText, errorAttributes} = this.state
    return <div className={styles.container}>
      <Input
        error={errorAttributes.has("name")}
        placeholder="Full name"
        onChange={this.makeOnChange("name")}
        value={name}
      />

      <Input
        error={errorAttributes.has("email")}
        placeholder="Email"
        onChange={this.makeOnChange("email")}
        value={email}
      />

      <Input
        error={errorAttributes.has("confirmEmail")}
        placeholder="Confirm Email"
        onChange={this.makeOnChange("confirmEmail")}
        value={confirmEmail}
      />

      <button
        onClick={this.onSubmit}
      >
        {submitText}
      </button>
    </div>
  }


}
