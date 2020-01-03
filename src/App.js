import React, { Component } from 'react';
import './App.css';
import StartErstesVideoOverlay from './components/StartErstesVideoOverlay';
import AuswahlOverlay from './components/AuswahlOverlay';
import Video from './components/Videos';
import apiState from './API'; 

export default class App extends Component {
  state = {
    videos: [
      {id: 1, 
      src: 'VideoFile1.mov',
      auswahlfelderEinblendezeitpunkt: 2,
      auswahlfelder: [
        {text: 'seit heute', nachfolgerVideoId: 2},
        {text: 'seit 5 Tagen', nachfolgerVideoId: 3} 
        ]
      },
    {id: 2, 
    src: 'VideoFile2.mov',
    auswahlfelderEinblendezeitpunkt: 4,
    auswahlfelder: [
      {text: 'Ich habe Bauchweh', nachfolgerVideoId: 4},
      {text: 'Ich habe Brustschmerzen', nachfolgerVideoId: 5}
      ]
    },
    {id: 3, 
      src: 'VideoFile3.mov',
      auswahlfelderEinblendezeitpunkt: 3,
      auswahlfelder: [
        {text: 'Ich habe Bauchweh', nachfolgerVideoId: 6},
        {text: 'Ich habe Brustschmerzen', nachfolgerVideoId: 7}
        ]
      }
  ],
    showStartOverlay: true,
    showAuswahlOverlay: false
  }

  render() { 
      const startErstesVideo = () => {
          let idStartvideo = this.state.videos[0].id;
          document.getElementById(idStartvideo).play();
          this.setState({
            showStartOverlay: false
          });
          overlayEinblenden(1);
      }
      
      const startNextVideo = (nachfolgerVideoId) => {
      //Diese Funktion bekommt beim Buttonclick auf das Auswahlvideo die Id des Nachfolgers übergeben
      //-> Sie setzt den Nachfolger an die erste Stelle des Arrays in this.state.videos
      //-> Sie hängt die Nachfolgervideos dieses Videos an hinten im this.state.videos an
        const nachfolgersNachfolgerVideoIdsArray = [];
        const nachfolgerObject = this.state.videos.filter(i => i.id === nachfolgerVideoId)
        nachfolgerObject[0].auswahlfelder.map(i =>{
          nachfolgersNachfolgerVideoIdsArray.push(i.nachfolgerVideoId)
        })
        const neueVideos= apiState.filter(i => filterHilfsFunktion(i, nachfolgersNachfolgerVideoIdsArray))
        this.setState({
          showAuswahlOverlay: false, //Hier muss man wieder entkommentieren, um die Einblendefunktion für die anderen Videos zu implementieren
          videos: [...this.state.videos.filter(i => i.id === nachfolgerVideoId), ...neueVideos]
        })
        document.getElementById(nachfolgerVideoId).play();
        overlayEinblenden(nachfolgerVideoId)
      }
      const filterHilfsFunktion = (i, array) => {
          for(let j=0; j<array.length; j++){
            if(i.id === array[j]) return true;
          }
          return false;
      } 

      const overlayEinblenden = (currentVideoId) => { 
        const currentVideoTime = document.getElementById(currentVideoId).currentTime;
        let einbelendeZeitpunkt = this.state.videos[0].auswahlfelderEinblendezeitpunkt;
        if(currentVideoTime <= einbelendeZeitpunkt){
          setTimeout(() => overlayEinblenden(currentVideoId), 30);
        }
        if(currentVideoTime > einbelendeZeitpunkt){
          this.setState({ 
            showAuswahlOverlay: true
          })
        }
      }

    return (
      <div className="App" style={{height: '100vh'}}>
        {this.state.showStartOverlay && <StartErstesVideoOverlay startErstesVideo={startErstesVideo} />}
        {this.state.showAuswahlOverlay && <AuswahlOverlay felder={this.state.videos[0].auswahlfelder} startNextVideo={startNextVideo}/>}
        {this.state.videos.map((i, index) => { 
          if(index === 0) return <Video key={i.id} id={i.id} VideoPath={i.src} /> 
          if(index !== 0) return <Video key={i.id} style={{visibility: 'hidden', position: 'absolute', marginTop: 0, height: 1}} id={i.id} VideoPath={i.src} /> 
        })}

      {/*TODOOOS:
      6) Verschiedene Overlay Arten implementieren (Inputfeld, Multiselect, 2-6 Auswahlfelder, Fullscreen, Unten Im Screen)
      7) Overlay nach Overlay implementieren
      8) Weiterschaltpunkte für Video definieren
      (9) Wartezeit Loop implementieren)
        */}
       </div> 
    )
  }
}