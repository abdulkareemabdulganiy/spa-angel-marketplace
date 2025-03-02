import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ContextStore } from './ContextStore';
import './index.css';
import App from './App';
import moment from 'moment';

// Configure moment globally
moment.locale('en');

console.log("main.jsx executing");

// Remove the div with "qweqw" text that might be interfering with rendering
const extraDiv = document.querySelector('#root').previousElementSibling;
if (extraDiv && extraDiv.tagName === 'DIV' && extraDiv.id !== 'notification' && extraDiv.id !== 'loader') {
  extraDiv.remove();
}

// Create a custom event to signal when the app is fully loaded
const appLoadedEvent = new CustomEvent('appLoaded');

// Render the app
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ContextStore>
      <App />
    </ContextStore>
  </BrowserRouter>
);

// Dispatch the custom event when the app is mounted
window.addEventListener('DOMContentLoaded', () => {
  // Small delay to ensure components are rendered
  setTimeout(() => {
    window.dispatchEvent(appLoadedEvent);
    console.log('App fully loaded and rendered');
  }, 100);
});