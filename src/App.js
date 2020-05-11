import React, { Component } from 'react';
import config from './config';
import { load } from './spreadsheet';
import data from './data.json';
import { Player } from 'video-react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import TabPanel from './TabPanel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AppBar from '@material-ui/core/AppBar';


class App extends Component {

 
  constructor(props) {
    super(props);

    this.state = { submissions: data, checked1: true, checked2: true, checked3: true };
  }

  componentDidMount() {
    // 1. Load the JavaScript client library.
    console.log("callse");
    window.gapi.load("client", this.initClient);
  }

  handleCheckChange = (event,id) => {
    console.log(event.target.checked);
    if(id===1){
    this.setState({ checked1: event.target.checked })
    }else if(id===2){
this.setState({ checked2: event.target.checked })
    }else if(id===3){
this.setState({ checked3: event.target.checked })
    }
  };

  render() {


    console.log("fff");
    const submissions = this.state.submissions;
    const checked1=this.state.checked1;
    const checked2=this.state.checked2;
    const checked3=this.state.checked3;

    return (

      <React.Fragment>
        <AppBar position="static">
          <div style={{ textAlign: 'right' }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.checked1}
                  onChange={(event)=>this.handleCheckChange(event,1)}
                  inputProps={{ 'aria-label': 'primary checkbox' }}

                />
              }
              label="Upto 10 Years"
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.checked2}
                  onChange={(event)=>this.handleCheckChange(event,2)}
                  inputProps={{ 'aria-label': 'primary checkbox' }}

                />
              }
              label="10 to 20 Years"
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.checked3}
                  onChange={(event)=>this.handleCheckChange(event,3)}
                  inputProps={{ 'aria-label': 'primary checkbox' }}

                />
              }
              label="20 Years and Above"
            />
          </div>
        </AppBar>
        <TabPanel submissions={submissions} checked1={checked1} checked2={checked2} checked3={checked3}/>



      </React.Fragment>
    )

  }

  initClient = () => {

    // 2. Initialize the JavaScript client library.
    window.gapi.client
      .init({
        apiKey: config.apiKey,
        // Your API key will be automatically added to the Discovery Document URLs.
        discoveryDocs: config.discoveryDocs
      })
      .then(() => {
        // 3. Initialize and make the API request.
        load(this.onLoad);
      });
  };

  onLoad = (data, error) => {
    if (data) {
      const submissions = data.submissions;
console.log("hi");
      console.log(JSON.stringify(submissions))
      this.setState({ submissions: submissions });
    } else {
      this.setState({ error });
    }
  };

}



export default App;
