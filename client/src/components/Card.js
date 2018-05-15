import React, { Component } from 'react';
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  Button,
  Glyphicon,
  FormControl,
  InputGroup,
  HelpBlock
} from 'react-bootstrap';

const DEFAULT_STATE = {
  email: {
    isValid: null,
    isActive: false,
    value: '',
    error: null
  },
  passwordOne: {
    isValid: null,
    isActive: false,
    value: '',
    error: null
  },
  passwordTwo: {
    isValid: null,
    isActive: false,
    value: '',
    error: null
  }
};

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...DEFAULT_STATE
    };
  }

  onEmailFocus = e => {
    this.setState(prevState => ({
      email: { ...this.state.email, isActive: !prevState.isActive }
    }));
  };

  handlePasswordOneChange = e => {
    const passwordOne = e.target.value.toString();
    // Minimum eight characters, at least one uppercase letter,
    // one lowercase letter and one number:
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    let isValid;
    let error;
    if (passwordOne === '') {
      isValid = null;
    } else if (re.test(passwordOne)) {
      isValid = true;
    } else {
      isValid = false;
      error =
        'Password must contain at least eight characters, one uppercase letter, one lowercase letter and one number';
    }
    this.setState(prevState => {
      const { value, isValid: prevIsValid, ...rest } = prevState.passwordOne;
      return { passwordOne: { ...rest, value: passwordOne, isValid, error } };
    });
  };

  handlePasswordTwoChange = e => {
    const passwordTwo = e.target.value.toString();
    const passwordOne = this.state.passwordOne;
    let isValid;
    let error;
    if (passwordTwo === passwordOne.value && passwordOne.isValid) {
      isValid = true;
    } else if (passwordTwo === '') {
      isValid = null;
    } else {
      isValid = false;
      error = 'Passwords must match';
    }
    this.setState(prevState => {
      const { value, isValid: prevIsValid, ...restOfPasswordTwo } = prevState.passwordTwo;
      return { passwordTwo: { ...restOfPasswordTwo, value: passwordTwo, isValid, error } };
    });
  };

  handleEmailChange = e => {
    const email = e.target.value;
    // fits standard email address format
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid;
    let error;
    if (email === '') {
      isValid = null;
    } else if (re.test(String(email).toLowerCase())) {
      isValid = true;
    } else {
      isValid = false;
      error = "hmmm this doesn't look like an email to us";
    }
    this.setState({
      email: { ...email, value: email, isValid, error }
    });
  };

  handleSubmit = e => {
    alert(`Email was submitted: ${this.state.email} Password: ${this.state.password}`);
    e.preventDefault();
  };

  render() {
    const { email, passwordOne, passwordTwo } = this.state;

    return (
      <Grid>
        <Row>
          <Col xs={12} className="card">
            <form onSubmit={this.handleSubmit}>
              <FormGroup
                controlId="formEmailValidation"
                className={
                  (email.isValid && 'isValid') || (email.isValid === false && 'isNotValid') || ''
                }
              >
                <ControlLabel>Email</ControlLabel>
                <InputGroup>
                  <InputGroup.Addon>
                    <Glyphicon glyph="user" />
                  </InputGroup.Addon>
                  <FormControl
                    type="email"
                    name="email"
                    value={email.value}
                    onFocus={this.onEmailFocus}
                    onBlur={this.onBlur}
                    onChange={this.handleEmailChange}
                  />
                </InputGroup>
                <FormControl.Feedback />
                {email.error && <HelpBlock className="card-help-block">{email.error}</HelpBlock>}
              </FormGroup>
              <FormGroup
                controlId="formPasswordOneValidation"
                className={
                  (passwordOne.isValid && 'isValid') ||
                  (passwordOne.isValid === false && 'isNotValid') ||
                  ''
                }
              >
                <ControlLabel>Password</ControlLabel>
                <InputGroup>
                  <InputGroup.Addon>
                    <Glyphicon glyph="lock" />
                  </InputGroup.Addon>
                  <FormControl
                    value={passwordOne.value}
                    type="text"
                    name="passwordOne"
                    onChange={this.handlePasswordOneChange}
                  />
                </InputGroup>
                <FormControl.Feedback />
                {passwordOne.error && (
                  <HelpBlock className="card-help-block">{passwordOne.error}</HelpBlock>
                )}
              </FormGroup>
              <FormGroup
                controlId="formPasswordTwoValidation"
                className={
                  (passwordTwo.isValid && 'isValid') ||
                  (passwordTwo.isValid === false && 'isNotValid') ||
                  ''
                }
              >
                <ControlLabel>Verify Password</ControlLabel>
                <InputGroup>
                  <InputGroup.Addon>
                    <Glyphicon glyph="lock" />
                  </InputGroup.Addon>
                  <FormControl
                    type="text"
                    name="passwordTwo"
                    onChange={this.handlePasswordTwoChange}
                    value={this.state.passwordTwo.value}
                  />
                </InputGroup>
                <FormControl.Feedback />
                {passwordTwo.error && (
                  <HelpBlock className="card-help-block">{passwordTwo.error}</HelpBlock>
                )}
              </FormGroup>
              {email.isValid &&
                passwordOne.isValid &&
                passwordTwo.isValid && (
                  <Button className="remove-default btn btn-primary" type="submit">
                    Register
                  </Button>
                )}

              <h5> Already Have an Account? </h5>
            </form>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Card;
