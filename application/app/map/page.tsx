'use client';
import {useState} from 'react';
import Map from './components/Map';

export default function MapEvent() {

  const [testReact, setTestReact] = useState('ok');


  return (

    <div>

      <Map></Map>
      <h1 className={'text-2xl text-amber-400'}>Map</h1>
      <p>Test</p>
      <label>test react : {testReact} </label>

    </div>

  );
}
