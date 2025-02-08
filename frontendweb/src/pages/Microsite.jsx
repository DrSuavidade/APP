import React from 'react';
import '../CSS/DownloadPage.css'; // Importe o arquivo CSS para estilização

function DownloadPage() {
  return (
    <div className="container">
      <div className="content">
        <a 
          href="https://drive.google.com/file/d/1GKVUhhQeYd-KFf1UJaL_iM9rPWJ1yXA6/view?usp=sharing" 
          target="_blank" 
          rel="noopener noreferrer"
          className="download-button"
        >
          Download App
        </a>
      </div>
    </div>
  );
}

export default DownloadPage;