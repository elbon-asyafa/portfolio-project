import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// A conservative hint, not a GPU benchmark. Missing hardware data uses CSS defaults.
const device = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
if ((device.hardwareConcurrency > 0 && device.hardwareConcurrency <= 4) ||
    (device.deviceMemory !== undefined && device.deviceMemory <= 4) || device.connection?.saveData) {
  document.documentElement.dataset.glassQuality = 'light';
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
