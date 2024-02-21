'use client';
import RTCMultiConnection from 'rtcmulticonnection';
import React, {useEffect, useRef, useState} from 'react';
import {API_WS_URL} from '@/app/utils/appGlobal';

function Viewer(id) {
  const idStream = id.id;
  const [alertMessage, setAlertMessage] = useState('');
  const videoRef = useRef(null);
  const connectionRef = useRef(null);

  useEffect(() => {
    const connection = new RTCMultiConnection();
    connectionRef.current = connection;

    connection.socketURL = API_WS_URL;

    connection.sdpConstraints.mandatory = {
      OfferToReceiveAudio: false,
      OfferToReceiveVideo: false,
    };

    connection.session = {
      audio: true,
      video: true,
      oneway: true,
    };

    connection.iceServers = [
      {
        urls: [
          'stun:stun.l.google.com:19302',
          'stun:stun1.l.google.com:19302',
          'stun:stun2.l.google.com:19302',
          'stun:stun.l.google.com:19302?transport=udp',
        ],
      },
    ];

    connection.onstream = function (event) {
      videoRef.current.srcObject = event.stream;
    };

    connection.onstreamended = function (event) {
      setAlertMessage('Broadcast is ended.');
      videoRef.current.srcObject = null;

      connection.sdpConstraints.mandatory = {
        OfferToReceiveAudio: false,
        OfferToReceiveVideo: false,
      };
    };

    connection.onMediaError = function (e) {
      if (e.message === 'Concurrent mic process limit.') {
        if (DetectRTC.audioInputDevices.length <= 1) {
          setAlertMessage('Please select external microphone. Check github issue number 483.');
          return;
        }

        const secondaryMic = DetectRTC.audioInputDevices[1].deviceId;
        connection.mediaConstraints.audio = {
          deviceId: secondaryMic,
        };

        connection.join(connection.sessionid);
      }
    };

    // Call handleSearch method automatically once component is loaded
    handleSearch();

    return () => {
      // Clean up RTCMultiConnection instance if needed
    };
  }, []);

  const handleSearch = () => {
    connectionRef.current.sdpConstraints.mandatory = {
      OfferToReceiveAudio: true,
      OfferToReceiveVideo: true,
    };

    connectionRef.current.getSocket();
    connectionRef.current.socket.emit('init', {
      role: 'viewer',
    });
    connectionRef.current.socket.emit('stream');
    connectionRef.current.join(id.id);
  };

  return (
    <div>
      <div id='list-streamer'>
        <p id='alerte'>{alertMessage}</p>
      </div>
      <video id='remoteStream' autoPlay muted playsInline ref={videoRef}></video>
      <div id='videos-container'></div>
    </div>
  );
}

export default Viewer;
