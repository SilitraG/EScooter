import React, { useState } from 'react'

function handleOrientation(event, setAlpha, setBeta, setGamma) {
    setAlpha(event.alpha);
    setBeta(event.beta);
    setGamma(event.gamma);
}

function handleMotion(setX, setY) {
    if (window.DeviceMotionEvent != undefined) {
        window.ondevicemotion = function(e) {
            setX(event.accelerationIncludingGravity.x * 5);
            setY(event.accelerationIncludingGravity.y * 5);
        }
    }
}



async function requestDeviceOrientation(setAlpha, setBeta, setGamma) {
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
      //iOS 13+ devices
      try {
        const permissionState = await DeviceOrientationEvent.requestPermission()
        if (permissionState === 'granted') {
          window.addEventListener('deviceorientation', (event) => handleOrientation(event, setAlpha, setBeta, setGamma))
        } else {
          alert('Permission was denied')
        }
      } catch (error) {
        alert(error)
      }
    } else if ('DeviceOrientationEvent' in window) {
      //non iOS 13+ devices
      console.log("not iOS");
      window.addEventListener('deviceorientation', (event) => handleOrientation(event, setAlpha, setBeta, setGamma))
    } else {
      //not supported
      alert('not supported')
    }
}


const Ride = () => {
    const [alpha, setAlpha] = useState(null);
    const [beta, setBeta] = useState(null);
    const [gamma, setGamma] = useState(null);

    const [X, setX] = useState(null);
    const [Y, setY] = useState(null);
    return (
        <div>
            <button onClick={() => requestDeviceOrientation(setAlpha, setBeta, setGamma)}>Gyroscope</button>
            <p>Alpha: {alpha !== null ? Math.floor(alpha) : ''}</p>
            <p>Beta: {beta !== null ? Math.floor(beta) : ''}</p>
            <p>Gamma: {gamma !== null ? Math.floor(gamma) : ''}</p>

            <button onClick={() => handleMotion(setX, setY)}>Accelerometer</button>
            <p>X: {X}</p>
            <p>Y: {Y}</p>

            
        </div>
    )
}

export default Ride
