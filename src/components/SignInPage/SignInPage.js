import React from "react";

class SignInPage extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
        };
    }

    onEmailChange = (event) => {
        this.setState({email : event.target.value});
    }

    onPassChange = (event) => {
        this.setState({password : event.target.value});
    }

    onSignIn = (event) => {
        event.preventDefault();
        fetch("https://face-recog-api-g1p6.onrender.com/signin/", {
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                // @ts-ignore
                email: this.state.email,
                // @ts-ignore
                password: this.state.password
            })
        })
            .then(response => response.json())
            .then(data => {
                if(data.id){
                    // @ts-ignore
                    this.props.loadUser(data);
                    // @ts-ignore
                    this.props.onRouteChange("home");
                }
            })
    }

    render(){
        // @ts-ignore
        const { onRouteChange } = this.props;
        return(
            <article className="br3 ba b--black-10 mv6 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <form className="measure tc">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input onChange={this.onPassChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
                        </div>
                        </fieldset>
                        <div className="">
                        <input onClick={this.onSignIn} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" />
                        </div>
                        <div className="lh-copy mt3">
                        <p onClick={() => {onRouteChange("register")}} className="f6 link dim black db pointer">Register</p>
                        </div>
                    </form>
                    </main>
            </article>
        );
    }
    
}

export default SignInPage;