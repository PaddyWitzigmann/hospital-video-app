import React from 'react'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const buttonStyling = {fontSize: 20, color: '#FFFFFF', background: '#0000FF', marginTop: 30}

export default function StartErstesVideoOverlay({ startErstesVideo }) {
    return (
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-end"
            style={{height: '100vh', width: '100vw', position: 'absolute', paddingBottom: 100, zIndex: 10}} 
            >
                <Paper style={{width: 700, padding: 50}}>
                    <Typography variant={'h3'}>Willkommen zu Ihrer Anamnese</Typography>
                    <Button onClick={startErstesVideo} style={buttonStyling}>Jetzt Starten</Button>
                </Paper> 
        </Grid> 
    )
}