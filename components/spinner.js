import React from 'react';

export default function Spinner() { 
    return (
        <div className="spinner-container">
          <div className="spinner"></div>

          <style global jsx>{`
            .spinner-container {
                display: flex;
                justify-content: center;
                align-items: center;
              }
              
              .spinner {
                border: 4px solid rgba(0, 0, 0, 0.1);
                border-left-color: #999;
                border-radius: 50%;
                width: 64px;
                height: 64px;
                animation: spin 0.8s linear infinite;
              }
              
              @keyframes spin {
                to {
                  transform: rotate(360deg);
                }
              }
          `}</style>
        
        </div>
      );
}