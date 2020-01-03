import React, { Component } from 'react';
import './App.css';
import PlayOverlay from './components/PlayOverlay';
import AuswahlOverlay from './components/AuswahlOverlay';
import Video from './components/Videos';
import Grid from '@material-ui/core/Grid';
import apiState from './API';

console.log(apiState);

export default class App extends Component {
  state = { 
    video: [{id: 1, src: 'VideoFile1.mp4'}, {id: 2, src: 'VideoFile2.mp4'}, ],
    ShowPlayOverlay: true,
    renderVideos: [1,2],
    videos: [
        {   id: 1, //Firebase ID
            src: 'VideoFile1.mp4',
            Overlay:  {typ: '2 Auswahlfelder', 
                      ShowAuswahlOverlayEinblendeZeit: 2, 
                      Auswahlfelder: [
                          {text: 'seit heute', NachfolgerVideoId: 'Video2'},
                          {text: 'seit 5 Tagen', NachfolgerVideoId: 'Video3'}
                          ]
                } 
        },
        {   id: 2, //Firebase ID
            src: 'VideoFile2.mp4',
            Overlay: [
                {typ: '2 Auswahlfelder', 
                ShowAuswahlOverlayEinblendeZeit: 2, 
                Auswahlfelder: [
                    {text: 'Ich habe Bauchweh', NachfolgerVideoId: 'Video4'},
                    {text: 'Ich habe Brustschmerzen', NachfolgerVideoId: 'Video5'}
                    ]
                }
            ]
        },
        {   id: 3, //Firebase ID
            src: 'VideoFile3.mov',
            Overlay: [
                {typ: '2 Auswahlfelder', 
                ShowAuswahlOverlayEinblendeZeit: 2, 
                Auswahlfelder: [
                    {text: 'Mein Bein tut weh', NachfolgerVideoId: 'Video6'},
                    {text: 'Mein Rücken schmerzt', NachfolgerVideoId: 'Video7'}
                    ]
                }
            ]
        }

    ],
    ShowAuswahlOverlay: false,
    ShowAuswahlOverlayEinblendeZeit: 2
  }

  render() { 
    var currentVideoTime;
    const overlayEinblenden = (VideoId, einbelendeZeitpunkt) => {
      currentVideoTime = document.getElementById(VideoId).currentTime;
      if(currentVideoTime <= einbelendeZeitpunkt){
        setTimeout(() => overlayEinblenden(VideoId, einbelendeZeitpunkt), 30);
      }
      if(currentVideoTime > einbelendeZeitpunkt){ 
        this.state.ShowAuswahlOverlay = true; 
        this.forceUpdate();
      }
    }
    const startVideo = (VideoId) => {
      document.getElementById(VideoId).play(); 
      this.state.ShowPlayOverlay = false;
      overlayEinblenden(VideoId, this.state.videos[0].Overlay.ShowAuswahlOverlayEinblendeZeit);
      this.forceUpdate();
    }
    const naechstesVideoStarten = (videoId) => {
      this.state.DisplayVideo1 = false;
      this.state.DisplayVideo3 = false;
      this.state.ShowAuswahlOverlay = false;
      this.forceUpdate();
      document.getElementById('Video2').play();
    }
    const naechstesVideoStarten2 = (videoId) => {
      this.state.DisplayVideo1 = false;
      this.state.DisplayVideo2 = false;
      this.state.ShowAuswahlOverlay = false;
      this.forceUpdate();
      document.getElementById('Video3').play();
    }

  //Styling
    const buttonStyling = {fontSize: 20, color: '#FFFFFF', background: '#0000FF', marginTop: 30}
    const GridStyle = {position: 'absolute', zIndex: 100, top: 0, height: '100vh', width: '100vw', paddingBottom: 200}


     const renderHilfsfunktion = (id) => { 
       let array = this.state.renderVideos; 
       for(var i=0; i<array.length; i++){ 
         if(array[i] === id) return true;
        }
        return false;
      }

      //TODO: Zu implementiren: 1) mit zIndex das Element 
      const handleChange = () => {
        let x = this.state.renderVideos
        x.shift()
        x.push(3)
        document.getElementById(2).style.visibility = 'visible';
        this.setState({
          renderVideos: x
        })
        document.getElementById(2).play(); 
      }
      
      const test = () => {
        this.setState({
          video: [{id: 2, src: 'VideoFile2.mp4'}]
        })
        document.getElementById(2).play(); 
      }

      
    return (
      <div className="App">

      {this.state.video.map(i =>  <Video key={i.id} id={i.id} VideoPath={i.src} /> )}
      <button onClick={test}>TESTEN</button>

       

      {/*
      {//Testen, ob es funtkioniert wenn key gesetzt wird????!} 
      {this.state.videos.map(i => { 
        if(renderHilfsfunktion(i.id) && i.id === 1) return <Video id={i.id} VideoPath={i.src} /> 
        if(renderHilfsfunktion(i.id) && i.id !== 1) return <Video style={{visibility: 'hidden', position: 'absolute', top: 0, width: '100vw'}} id={i.id} VideoPath={i.src} /> 
      })}

        <button onClick={handleChange}>hide</button>
        <button>show manipulation</button>




        <div style={{position: 'absolute', zIndex: 2}}>
          {this.state.DisplayVideo1 && <Video id={this.state.videos[0].id} VideoPath={this.state.videos[0].src}/>}
        </div>

        {this.state.videos.map(video => <Video id={video.id} VideoPath={video.src} />)}
        
        <Grid style={GridStyle} container direction="row" justify="center" alignItems="flex-end">
            {this.state.ShowPlayOverlay && <PlayOverlay startVideo={() => startVideo(this.state.videos[0].id)} buttonStyling={buttonStyling}/>}
            {this.state.ShowAuswahlOverlay && <AuswahlOverlay felder={this.state.videos[0].Overlay.Auswahlfelder} naechstesVideoStarten={naechstesVideoStarten} naechstesVideoStarten2={naechstesVideoStarten2}/> }
        </Grid> 
        */}
       </div> 
    )
  }
}