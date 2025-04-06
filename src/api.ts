export const simulateUpload = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    // Simulate a 1-second delay to mimic an API upload call.
    setTimeout(() => {
      // For this demo, we always resolve with a task id.
      resolve('task-123');
    }, 1000);
  });
};

interface StatusResponse {
  status: 'processing' | 'completed' | 'failed';
}

export const getStatus = (taskId: string): Promise<StatusResponse> => {
  return new Promise((resolve) => {
    // Simulate a 500ms delay for each status check.
    setTimeout(() => {
      // Randomly determine task status.
      const random = Math.random();
      if (random < 0.7) {
        resolve({ status: 'processing' });
      } else if (random < 0.85) {
        resolve({ status: 'completed' });
      } else {
        resolve({ status: 'failed' });
      }
    }, 500);
  });
};
