'use client';

import React, { useState } from 'react';
import RTCMultiConnection from 'rtcmulticonnection';

function App() {
  const [idValue, setIdValue] = useState('');
  const [startDisabled, setStartDisabled] = useState(true);
  const [stopDisabled, setStopDisabled] = useState(true);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [localStream, setLocalStream] = useState(null);
  const [connection] = useState(new RTCMultiConnection());

  const segmentLengthInMs = 500;

  const constraints = {
    audio: true,
    video: true,
  };

  connection.socketURL = 'http://docketu.iutnc.univ-lorraine.fr:35303/';

  connection.session = {
    audio: true,
    video: true,
    oneway: true,
  };

  connection.sdpConstraints.mandatory = {
    OfferToReceiveAudio: false,
    OfferToReceiveVideo: false,
  };

  connection.onstream = function(event) {
    // Vérification que l'élément video est bien initialisé
    const videoElement = document.getElementById('localVideo');
    if (videoElement) {
      // Mettre à jour le flux de médias
      videoElement.srcObject = event.stream;
    }

    const recorder = new MediaRecorder(event.stream);

    recorder.addEventListener('dataavailable', (e) => {
      if (connection.socket) {
        connection.socket.emit('record', {
          video: e.data,
        });
      } else {
        recorder.stop();
      }
    });
    recorder.start(segmentLengthInMs);

    setMediaRecorder(recorder);
  };

  const handleIdChange = (e) => {
    const value = e.target.value;
    setIdValue(value);
    if (value === '') {
      setStartDisabled(true);
      setStopDisabled(true);
    } else {
      setStartDisabled(false);
    }
  };

  const handleStopRecord = () => {
    connection.closeSocket();
    setIdValue('');
    setStartDisabled(false);
    setStopDisabled(true);

    mediaRecorder.stop();
    setLocalStream(null);
  };

  const handleStartRecord = () => {
    setIdValue('');
    setStartDisabled(true);
    setStopDisabled(false);

    connection.getSocket();
    connection.socket.emit('init', {
      role: 'streamer',
      id: idValue,
    });
    connection.socket.emit('stream');
    connection.open(idValue);
  };

  return (
    <div>
      <h1>Record en temp rÃ©el</h1>
      <h2>Local Video</h2>
      <video id='localVideo' autoPlay muted playsInline src={localStream}></video>
      <div>
        <input
          type='text'
          name='idstream'
          placeholder='id'
          value={idValue}
          onChange={handleIdChange}
        />
        <button id='startRecord' onClick={handleStartRecord} disabled={startDisabled}>Record/Stream</button>
        <button id='stopRecord' onClick={handleStopRecord} disabled={stopDisabled}>Stop record/stream</button>
      </div>
    </div>
  );
}

export default App;