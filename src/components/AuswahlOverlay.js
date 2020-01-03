import React from 'react'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

export default function AuswahlOverlay({ felder, startNextVideo }) {

    return (
            <Grid container direction="row" justify="center" alignItems="flex-end" spacing={6} style={{height: '100vh', width: '100vw', position: 'absolute', paddingLeft: 100, paddingRight: 100}}>
                    {felder.map(feld =>  {
                        return (
                        <Grid item xs={6}>
                            <Paper onClick={() => startNextVideo(feld.nachfolgerVideoId)} style={{padding: 30}}>{feld.text}</Paper>
                        </Grid>
                    )})}
            </Grid>
            )
}
