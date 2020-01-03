DatenbankStruktur = {
    playVideo: {   id: 'Video1', //Firebase ID
                    src: 'VideoFile1.mp4',
                    Overlay: [
                        {typ: '2 Auswahlfelder', 
                        ShowAuswahlOverlayEinblendeZeit: 3, 
                        Auswahlfelder: [
                            {text: 'seit heute', NachfolgerVideoId: 'Video2'},
                            {text: 'seit 5 Tagen', NachfolgerVideoId: 'Video3'}
                            ]
                        }
                    ]
                },

    nachfolgerVideos: [
        {   id: 'Video2', //Firebase ID
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
        {   id: 'Video3', //Firebase ID
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

    ]
}