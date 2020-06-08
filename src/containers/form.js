import React, { Component } from 'react'
import styles from './form.module.css'
import Logo from '../components/UI/Logo/logo'
import Input from '../components/UI/Input/Input'
import Button from '../components/UI/Button/Button'

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
                    required: true,
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
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
        }
    }

    onInputHandler = (event) => {
        event.preventDefault();
        console.log(event);
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
        return (
            <div className={styles.Login} >
                <Logo></Logo>
                <form onSubmit={this.onInputHandler}>
                    {form}
                    <Button>Login</Button>
                </form>
            </div>
        )
    }
}

export default Login
