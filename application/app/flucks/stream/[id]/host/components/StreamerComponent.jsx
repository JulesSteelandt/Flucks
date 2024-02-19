'use client';
import React from 'react';
import {API_WS_STREAM} from 'application/app/utils/appGlobal';
import RTCMultiConnection from 'rtcmulticonnection';


export default function StreamerComponent({idStream}) {


  const connection =  new RTCMultiConnection();
  connection.socketURL = API_WS_STREAM;

  connection.session = {
    audio: true,
    video: true,
    oneway: true
  }

  connection.sdpConstraints.mandatory = {
    OfferToReceiveAudio: false,
    OfferToReceiveVideo: false
  }

  connection.onstream = function(event) {
    localid = (event.stream);
  }



// function


    function stopStream(){
      connection.closeSocket();
      id.disabled = false;
      startRecordBtn.disabled = false;
      stopRecordBtn.disabled = true;

      mediaRecorder.stop();
      localVideo.srcObject = null;
    }

    function startStream(){
      id.disabled = true;
      startRecordBtn.disabled = true;
      stopRecordBtn.disabled = false;

      connection.getSocket();
      connection.socket.emit("init", {
        role: "streamer",
        id: id.value,
      });
      connection.socket.emit("stream");
      connection.open();
    }



**/
  return (<>
      <p>SI ça s'affiche alors ça fonctionne</p>
    </>
  );
}
