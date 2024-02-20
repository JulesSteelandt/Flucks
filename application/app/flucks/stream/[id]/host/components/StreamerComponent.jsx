'use client';

import React, { useState } from 'react';
import RTCMultiConnection from 'rtcmulticonnection';

function StreamerHost(id) {
  const idValue = id;
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


  const handleStopRecord = () => {
    connection.closeSocket();
    setStartDisabled(false);
    setStopDisabled(true);

    mediaRecorder.stop();
    setLocalStream(null);
  };

  const handleStartRecord = () => {
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
        <button id='startRecord' onClick={handleStartRecord} >Record/Stream</button>
        <button id='stopRecord' onClick={handleStopRecord} disabled={stopDisabled}>Stop record/stream</button>
      </div>
    </div>
  );
}

export default StreamerHost;