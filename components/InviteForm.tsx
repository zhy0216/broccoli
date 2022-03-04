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
  isLoading: boolean
  errorAttributes: Set<keyof State>
  errorMessage: string
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
      isLoading: false,
      errorAttributes: new Set(),
      errorMessage: "",
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
      .then(r => r.ok? r.json(): Promise.reject(r))
  }

  onSubmit = () => {
    const {onSuccessSubmit} = this.props
    const {name, email, confirmEmail, isLoading} = this.state
    const errorAttributes = new Set<keyof State>()
    if(isLoading) {
      return
    }
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

    if (errorAttributes.size === 0) {
      this.setState({isLoading: true, errorMessage: ""})
      this.makeAuth()
        .then(response => {
          onSuccessSubmit()
        })
        .catch(res => {
          res.json()
            .then(({errorMessage}: {errorMessage: string}) => {
              this.setState({errorMessage})
            })

        })
        .finally(() => {
          this.setState({isLoading: false})
        })
    }
  }

  render() {
    const {name, email, confirmEmail, isLoading, errorAttributes, errorMessage} = this.state
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
        {isLoading? "Sending, please wait.": "Send"}
      </button>
      {<div className={styles.errorMessage}>{errorMessage}</div>}
    </div>
  }
}
