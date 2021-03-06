import React, { Component, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import NotificationAlert from 'react-notification-alert';
import Signinmainn from './Signinmainn';


var Success = {
    place: 'tr',
    message: (
        <div>
            <div>
                Login Successfully
            </div>
        </div>
    ),
    type: "success",
    autoDismiss: 7
}

var Error = {
    place: 'tr',
    message: (
        <div>
            <div>
                Your Username or Password doesnot match
            </div>
        </div>
    ),
    type: "danger",
    autoDismiss: 7
}



class SignInMain extends Component {
  
    constructor(props) {
        super(props);
        this.state = {
          email: '',
          password: ''
        };
        
    }

   
    async loginUser() {
        
        
        return fetch(`${process.env.API_URL}/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.state)
        })
          .then(data => data.json())
         
    }   
   
    
    handleLogin = async e => {
        e.preventDefault();		
        const token = await this.loginUser();
       
        if(token.success){
            this.setToken(token.data.access_token);
          
            //this.props.history.push("/")
            this.alertSuccess();
           
           
        } else {
            this.alertError();
        }
    }  
    
    setToken(userToken) {
        sessionStorage.setItem('token', JSON.stringify(userToken));
        console.log(sessionStorage.getItem('token'));
    }

    alertSuccess(){
        this.refs.notify.notificationAlert(Success);
    }

    alertError(){
        this.refs.notify.notificationAlert(Error);
    }

    render() {      
    
        return (
            <main>
                <section className="signup__area po-rel-z1 pt-100 pb-145">
                    <div className="sign__shape">
                        <img className="man-1" src="assets/img/icon/sign/man-1.png" alt="img not found"/>
                        <img className="man-2" src="assets/img/icon/sign/man-2.png" alt="img not found"/>
                        <img className="circle" src="assets/img/icon/sign/circle.png" alt="img not found"/>
                        <img className="zigzag" src="assets/img/icon/sign/zigzag.png" alt="img not found"/>
                        <img className="dot" src="assets/img/icon/sign/dot.png" alt="img not found"/>
                        <img className="bg" src="assets/img/icon/sign/sign-up.png" alt="img not found"/>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-xxl-8 offset-xxl-2 col-xl-8 offset-xl-2">
                                <div className="section__title-wrapper text-center mb-55">
                                    <h2 className="section__title">Sign in to <br/>  recharge direct.</h2>
                                    <p>it you don't have an account you can <Link href="/sign-up"><a>Register here!</a></Link></p>
                                </div>
                            </div>
                        </div>
                        <NotificationAlert ref="notify" zIndex={9999} />

                        <div className="row">
                            <div className="col-xxl-6 offset-xxl-3 col-xl-6 offset-xl-3 col-lg-8 offset-lg-2">
                                <div className="sign__wrapper white-bg">
                                    <div className="sign__header mb-35">
                                    <div className="sign__in text-center">
                                        <a href="#" className="sign__social g-plus text-start mb-15"><i><FontAwesomeIcon icon={['fab', 'google']} /></i>Sign Up with Google</a>
                                        <a href="#" className="sign__social text-start mb-15"><i><FontAwesomeIcon icon={['fab', 'facebook-f']} /></i></a>
                                        <p> <span>........</span> Or, <Link href="/sign-in"><a>sign in</a></Link> with your email<span> ........</span> </p>
                                    </div>
                                    </div>
                                    <div className="sign__form">
                                    <form onSubmit={this.handleLogin}>
                                        <div className="sign__input-wrapper mb-25">
                                            <h5>Work email</h5>
                                            <div className="sign__input">
                                                <input type="text" placeholder="e-mail address" name='email'
                                                onChange={e => this.setState({ email : e.target.value})}/>
                                                <i><FontAwesomeIcon icon={['fas', 'envelope']} /></i>
                                            </div>
                                        </div>
                                        <div className="sign__input-wrapper mb-10">
                                            <h5>Password</h5>
                                            <div className="sign__input">
                                                <input type="password" placeholder="Password" name='password'
                                                onChange={e => this.setState({ password : e.target.value})}/>
                                                <i><FontAwesomeIcon icon={['fas', 'lock']} /></i>
                                            </div>
                                        </div>
                                        <div className="sign__action d-sm-flex justify-content-between mb-30">
                                            <div className="sign__agree d-flex align-items-center">
                                                <input className="m-check-input" type="checkbox" id="m-agree"/>
                                                <label className="m-check-label"  htmlFor="m-agree">Keep me signed in</label>
                                            </div>
                                            <div className="sign__forgot">
                                                <a href="#">Forgot your password?</a>
                                            </div>
                                        </div>
                                        
                                        <button className="e-btn w-100"> <span></span> Sign in</button>
                                        <div className="sign__new text-center mt-20">
                                            <p>New to Market? <Link href="/sign-up"><a>Sign Up</a></Link></p>
                                        </div>
                                    </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

        	</main>
        );
    }
}

export default SignInMain;