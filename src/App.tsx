import React, { useState, useEffect } from 'react';
import { simulateUpload, getStatus } from './api';
import './styles.css';

const App: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [taskId, setTaskId] = useState<string | null>(null);
  const [status, setStatus] = useState<string>('idle');
  const [error, setError] = useState<string | null>(null);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setError(null);
    }
  };

  // Handle file submission and start upload simulation
  const handleSubmit = async () => {
    if (!file) return;
    setStatus('uploading');
    try {
      const id = await simulateUpload(file);
      setTaskId(id);
      setStatus('processing');
    } catch (err) {
      setError('Upload failed');
      setStatus('error');
    }
  };

  // Poll the status endpoint every 2 seconds once a taskId is set
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (taskId && status === 'processing') {
      interval = setInterval(async () => {
        try {
          const res = await getStatus(taskId);
          if (res.status === 'completed' || res.status === 'failed') {
            setStatus(res.status);
            clearInterval(interval);
          }
        } catch (err) {
          setError('Status polling failed');
          setStatus('error');
          clearInterval(interval);
        }
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [taskId, status]);

  return (
    <div className="container">
      <h1>File Upload Simulator</h1>
      <div className="upload-section">
        <input type="file" onChange={handleFileChange} />
        <button
          onClick={handleSubmit}
          disabled={!file || status === 'uploading' || status === 'processing'}
        >
          Submit
        </button>
      </div>
      <div className="status">
        {status === 'uploading' && <p>Uploading file...</p>}
        {status === 'processing' && <p>Processing file...</p>}
        {status === 'completed' && <p>Upload completed successfully!</p>}
        {status === 'failed' && <p>Upload failed. Please try again.</p>}
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default App;
