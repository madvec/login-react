import React, { Component } from 'react'
import styles from './SignIn.module.css'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import axios from 'axios'

class Login extends Component {

    state = {
        loginInputs: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Enter your email'
                },
                value: '',
                validation: {
                    isRequired: true,
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    isRequired: true,
                },
                valid: false,
                touched: false
            }
        },
        error: false,
        idToken: null
    }

    onInputHandler = (event) => {
        event.preventDefault();
        this.onAuth(this.state.loginInputs.email.value, this.state.loginInputs.password.value)
    }

    onAuth = (email, password) => {
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAIraa0C0u-L1lnpfoYjo8Sf9rBt4o8P1A'

        axios.post(url, authData)
            .then(response => {
                console.log(response.data)
                this.setState({ error: false, idToken: response.data.idToken })
            })
            .catch(error => {
                console.log(error)
                this.setState({ idToken: null, error: true })
            })
    }

    inputChangedHandler = (event, inputId) => {
        const updatedLoginForm = {
            ...this.state.loginInputs
        }

        const updatedInputElement = {
            ...updatedLoginForm[inputId]
        }

        updatedInputElement.value = event.target.value
        updatedInputElement.valid = this.checkValid(updatedInputElement.value, updatedInputElement.validation)
        updatedInputElement.touched = true;
        updatedLoginForm[inputId] = updatedInputElement

        this.setState({ loginInputs: updatedLoginForm })
    }

    checkValid = (value, rules) => {

        let isValid = true

        if (!rules) {
            return true
        }

        if (rules.isRequired) {
            isValid = value.trim() !== '' && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isPassword) {
            const pattern = /^(?!.* )(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.]).{8,20}$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.loginInputs) {
            formElementsArray.push({
                id: key,
                config: this.state.loginInputs[key]
            });
        }

        let form = formElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)} />

        ));

        let message = null

        if (this.state.idToken)
            message = <p>Congratulations, you are logged in</p>
        else if (!this.state.idToken && this.state.error)
            message = <p>Oops!!! Something went wrong. Try again please</p>

        return (
            <div className={styles.Login} >
                <div style={{ textAlign: "center" }}>
                    <p>Login: test@mail.com</p>
                    <p>Password: Test.123</p>
                </div>
                <form onSubmit={this.onInputHandler}>
                    {form}
                    <Button>Login</Button>
                </form>
                {message}
            </div>
        )
    }
}

export default Login
