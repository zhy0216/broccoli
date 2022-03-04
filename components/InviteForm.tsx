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
  errorAttributes: Set<keyof State>
}

// https://stackoverflow.com/a/46181
const validateEmail = (email: string) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

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

  makeAuth = async () => {
    const {name, email} = this.state
    const url = "https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth"
    return fetch(url, {
      method: "POST",
      body: JSON.stringify({name, email})
    })
      .then(response => response.json())
  }

  onSubmit = () => {
    const {onSuccessSubmit} = this.props
    const {name, email, confirmEmail} = this.state
    const errorAttributes = new Set<keyof State>()
    // do validation here
    if(name.length < 3) {
      errorAttributes.add("name")
    }

    if(!validateEmail(email)) {
      errorAttributes.add("email")
    }

    if(email !== confirmEmail) {
      errorAttributes.add("confirmEmail")
    }

    this.setState({errorAttributes})

    if(errorAttributes.size === 0) {
      this.makeAuth()
        .then(response => {
          onSuccessSubmit()
        }).catch(() => {

      })
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
