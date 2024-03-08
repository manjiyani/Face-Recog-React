import React, {Component} from "react";
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceDetectionResult from './components/FaceDetectionResult/FaceDetectionResult';
import Register from "./components/Register/Register";

import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import SignInPage from "./components/SignInPage/SignInPage";


const particleOptions = {
  fpsLimit: 120,
  interactivity: {
    events: {
      onClick: {
        enable: false,
        mode: "push",
      },
      onHover: {
        enable: true,
        mode: "repulse",
      },
    },
    modes: {
      push: {
        quantity: 4,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: {
      value: "#ffffff",
    },
    links: {
      color: "#ffffff",
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    move: {
      direction: "none",
      enable: true,
      outModes: {
        default: "bounce",
      },
      random: false,
      speed: 6,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        value_area: 800,
      },
      value: 150,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: "circle",
    },
    size: {
      value: { min: 1, max: 5 },
    },
  },
  detectRetina: true,
}

class App extends Component {
  
  constructor(){
    super();
    this.state = {
      particleinit: false,
      url_input: '',
      img_url: '',
      box: {},
      route: 'signin',
      user: {
        id: "",
        email: "",
        name: "",
        joined: new Date(),
        entries: 0
      }
    };
  }

  componentDidMount(){
    initParticlesEngine(async(engine) => {await loadSlim(engine);}).then(() => {this.setState({particleinit: true})});
  }

  ///////////////////////////////////////////////////////////////////////////////////
    // PARTICLE GENERATOR BEGIN
  ///////////////////////////////////////////////////////////////////////////////////

  Particle_Loader = () => {
    if(this.state.particleinit){
      return(
        <Particles 
        id="tsparticles" 
        options={particleOptions} 
        className='particles'/>
      );
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////
    // PARTICLE GENERATOR END
  ///////////////////////////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////////////////////////
    // FACE DETECTION API CALL BEGIN
  ///////////////////////////////////////////////////////////////////////////////////

  onUrlInput = (event) => {
    this.setState({url_input: event.target.value});
  }

  onUrlSubmit = () => {
    this.setState({img_url: this.state.url_input});

    fetch("http://localhost:3001/imageurl/", {
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                input: this.state.url_input
            })
        })
        .then(response => response.json())
        .then(result => this.drawBoundingBox(result.outputs[0].data.regions[0].region_info.bounding_box))
        .catch(error => console.log('error', error));

  }

  drawBoundingBox = (box_props) =>{

    // update entry count
    fetch("http://localhost:3001/image/", {
            method: "put",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                id: this.state.user.id
            })
        })
          .then(response => response.json())
          .then(data => {
            if(data){
              const updated_user = this.state.user;
              updated_user.entries = data;
              this.setState({user: updated_user});
            }
          });

    //draw bounding box 
    const pic = document.getElementById('face_detection_out');
    const ht = Number(pic.height);
    const wt = Number(pic.width);
    const new_box = {
      left_col: box_props.left_col * wt,
      right_col: wt -  (box_props.right_col * wt),
      top_row: box_props.top_row * ht,
      bottom_row: ht - (box_props.bottom_row *ht)
    }
    this.setState({box: new_box});
  }

  ///////////////////////////////////////////////////////////////////////////////////
    // FACE DETECTION API CALL END
  ///////////////////////////////////////////////////////////////////////////////////


  onRouteChange = (new_route) =>{

    if(new_route === "signin"){
      this.setState({img_url: ''});
      this.setState({box: {}});
    }

    this.setState({route: new_route});
  }

  loadUser = (data) => {
    this.setState({user : {
      id: data.id,
      email: data.email,
      name: data.name,
      entries: data.entries,
      joined: data.joined
    }})
  }

  ///////////////////////////////////////////////////////////////////////////////////
    // APP RENDER BEGIN
  ///////////////////////////////////////////////////////////////////////////////////

  render() {

    return (
      <div>
        {/* <Particles id="tsparticles" options={options} className='particles'/> */}
        {this.Particle_Loader()}
        {
          {
            "signin" : <SignInPage loadUser={this.loadUser} onRouteChange = {this.onRouteChange}/>,
            "register" : <Register loadUser={this.loadUser} onRouteChange = {this.onRouteChange}/>,
            "home": <div>
                    <Navigation onRouteChange = {this.onRouteChange}/>
                    <Logo />
                    <Rank name = {this.state.user.name} entries = {this.state.user.entries} />
                    <ImageLinkForm onUrlSubmit = {this.onUrlSubmit} onUrlInput = {this.onUrlInput} />
                    <FaceDetectionResult ImgSrc = {this.state.img_url} boundingBox = {this.state.box}/>
                    </div>
          }[this.state.route]
        }
      </div>
    );
  }

  ///////////////////////////////////////////////////////////////////////////////////
    // APP RENDER END
  ///////////////////////////////////////////////////////////////////////////////////
}

export default App;
