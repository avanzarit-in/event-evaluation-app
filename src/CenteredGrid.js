import React from 'react';
import ReactDOM from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Player } from 'video-react';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import MyModal from './MyModal';
import Modal from 'react-modal';
import logo from './video_player.png';
import Chip from '@material-ui/core/Chip';
import ReactAudioPlayer from 'react-audio-player';
import YouTube from '@u-wave/react-youtube';

function meetsAgeCriteria(age, checked1, checked2, checked3){
  const intAge = parseInt(age);
  if (checked1 && intAge <= 10) {
    return true;
  }
  if (checked2 && intAge > 10 && intAge <= 20) {
    return true;
  }

  if (checked3 && intAge > 20) {
    return true;
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1

  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  paperOther: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  image: {
    width: 125,
    height: 175,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  }
}));

export default function CenteredGrid(props) {
  const classes = useStyles();
  let submissions = props.submissions;
  let filter = props.filter;
  let checked1 = props.checked1;
  let checked2 = props.checked2;
  let checked3 = props.checked3;

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>

        {submissions.filter(item => { if (item.category === filter && item.for_competition === "Yes" && meetsAgeCriteria(item.age, checked1, checked2, checked3)) { return true; } else { return false; } }).map((item, index) => {
          let poster = "https://drive.google.com/uc?export=download&id=" + item.profile.split("=").pop();
          let src1 = "https://drive.google.com/uc?export=download&id=" + item.submission.split("=").pop();
          //let src1=item.submission;
          console.log(src1);
          return (
            <React.Fragment key={index}>
              <Grid item xs={8}>
                <Paper className={classes.paperOther}>
                  <Grid container spacing={2}>
                    <Grid item>
                      <ButtonBase className={classes.image}>
                        <img className={classes.img} alt="complex" src={poster} />
                      </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm container>
                      <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>


                          <Typography gutterBottom variant="subtitle1">
                            Category :  <Chip label={item.category} />
                          </Typography>
                          <Typography variant="body2" gutterBottom>
                            Name    : {item.name}
                          </Typography>
                          <Typography variant="body2" gutterBottom>
                            Address : {item.tower}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            Gender  : {item.gender}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            Age     : {item.age}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            Phone   : {item.phone}
                          </Typography>
                        </Grid>
                       {/**  <Grid item>
                          <Typography variant="body2" style={{ cursor: 'pointer' }}>
                            <a href={item.update_url} target="_blank">Edit Submission</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          
                          </Typography>
                        </Grid> */}
                      </Grid>
                      {/** <Grid item>
                        <Typography variant="subtitle1">$19.00</Typography>
                      </Grid>*/}
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
                     <Grid  item xs={3}>
                {(item.type==="Video")?<Paper className={classes.paper}>
                  <YouTube
  video="7rFhkWRzD_U"
  
/>
                 {/** <a href={item.submission} target="_blank"><img src={logo}/></a> */}</Paper>:(item.type==="Image")? 
                 <MyModal key={item.submission} src={src1} />
                  :(item.type=="Audio")?<ReactAudioPlayer key={item.submission} src={item.submission} controls/>:""
                  }
                
              </Grid>
       
            </React.Fragment>
          )
        })
        }

      </Grid>
    </div>
  );
}
