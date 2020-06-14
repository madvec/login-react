import React, { Component } from 'react'
import styles from './SignIn.module.css'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import Loader from '../../components/UI/Loader/Loader'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/actions'

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
                    isEmail: true
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
        idToken: null,
        formisInvalid: false
    }

    onInputHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.loginInputs.email.value, this.state.loginInputs.password.value)
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

        let formisValid = true

        for (let inputId in updatedLoginForm) {
            formisValid = updatedLoginForm[inputId].valid && formisValid
        }

        this.setState({ loginInputs: updatedLoginForm, formisInvalid: formisValid })
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

        if (this.props.idToken && !this.props.error)
            message = <p>Congratulations, you are logged in</p>
        else if (!this.props.idToken && this.props.error)
            message = <p>Oops!!! Something went wrong. Try again please</p>

        if (this.props.loading) {
            return <Loader />
        }

        return (
            <div className={styles.Login} >
                <div style={{ textAlign: "center" }}>
                    <p>Login: test@mail.com</p>
                    <p>Password: Test.123</p>
                </div>
                <form onSubmit={this.onInputHandler}>
                    {form}
                    <Button disabled={!this.state.formisInvalid}>Login</Button>
                </form>
                {message}
            </div>
        )
    }
}

const mapStateToProps = state => {    
    return {
        idToken: state.idToken,
        loading: state.loading,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password) => dispatch(actions.sign_in(email, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
