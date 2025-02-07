import React from 'react';
import '../CSS/DownloadPage.css'; // Importe o arquivo CSS para estilização

function DownloadPage() {
  return (
    <div className="container">
      <div className="content">
        <a 
          href="https://drive.google.com/file/d/1Ar5repOz4BY1R60apxXnd-S18lo3MsFp/view?usp=sharing" 
          target="_blank" 
          rel="noopener noreferrer"
          className="download-button"
        >
          Baixar Arquivo
        </a>
      </div>
    </div>
  );
}

export default DownloadPage;