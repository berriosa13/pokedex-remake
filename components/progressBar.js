import React from "react";

export default function ProgressBar({ value, min, max, color, width }) {
  const progress = Math.round(((value - min) / (max - min)) * 100);
  return (
    <div className="progress-bar-container" style={{ width }}>
      <div
        className="progress-bar"
        style={{ width: "100%", backgroundColor: "antiquewhite" }}
      >
        <div
          className="progress"
          style={{ width: `${progress}%`, backgroundColor: color }}
        ></div>
      </div>
      <style global jsx>{`
        .progress-bar-container {
            position: relative;
            height: 24px;
          }
          
          .progress-bar {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 100%;
            height: 14px;
            border-radius: 5px;
          }
          
          .progress {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            height: 14px;
            border-radius: 5px;
          }
          
          .progress-text {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            right: 0;
            margin-left: 8px;
            font-size: 12px;
            color: #666;
          }
          
      `}</style>
    </div>
  );
}
