'use client';

import React, {useState} from 'react';
import RTCMultiConnection from 'rtcmulticonnection';
import Image from 'next/image';

function StreamerHost(id) {
  const idValue = id.id;
  const [startDisabled, setStartDisabled] = useState(false);
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
    console.log(id);
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
    <div className={'flex flex-col justify-center'}>
      <div className={'px-6 bg-[#D9D9D9] min-h-[40vw] mb-4 flex justify-center'}>
        <video id='localVideo' autoPlay muted playsInline src={localStream}></video>
      </div>
      <div>
        <button className={'flex self-center'} onClick={handleStartRecord} disabled={startDisabled}>
          <Image src={'/../img/FlecheDouble.png'} width={30} height={30}
                 className={'max-w-[30px] max-h-[30px] self-center'} alt={'fleche'} />
          <p className={'bg-[#19AFFB] py-1 px-2 rounded-lg text-white'}>Lancer la diffusion en direct</p>
        </button>
        <button onClick={handleStopRecord} disabled={stopDisabled}>Stop record/stream</button>
      </div>
    </div>
  );
}

export default StreamerHost;