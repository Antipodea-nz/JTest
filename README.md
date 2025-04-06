# JTest
Test
# File Upload Simulator

This project simulates a file upload and status tracking flow using React and TypeScript.

## Features
- **File Selection & Submission:** Users can select a file and submit it.
- **API Simulation:** Uses `setTimeout` to simulate an API call returning a task ID and to poll a mocked `/status/{task_id}` endpoint.
- **Status Updates:** Displays various statuses (uploading, processing, completed, failed) along with error handling.
- **Mobile-Friendly Layout:** Basic responsive CSS ensures usability on mobile devices.

## API Mocking Choice
I used plain `setTimeout` functions to simulate API delays. This approach was chosen because it is lightweight, easy to implement, and well-suited for simulating asynchronous behavior in a demo or take-home test environment.

## Reflection
- **Mocking:** I used `setTimeout` for both the initial upload simulation and the status polling. This keeps dependencies minimal while effectively simulating asynchronous API responses.
- **AI Assistance:** An AI tool helped generate the initial project structure and code snippets, which I then customized to meet the assignment requirements.
- **Tradeoffs/Shortcuts:** I used randomized logic in the status endpoint simulation. In a production scenario, more deterministic behavior and robust error handling would be implemented.
- **Improvements:** With more time, I would add unit and integration tests (e.g., using Jest and React Testing Library), utilize a dedicated polling mechanism (such as React Query), and enhance error handling and retry logic.
- **Debugging:** The trickiest part was ensuring the polling mechanism cleaned up properly when the task completed or an error occurred. I debugged this by checking state transitions and ensuring that intervals were cleared to avoid memory leaks.

## Optional Bonus Enhancements
- **Testing:** Integration tests could be added to simulate the full upload flow.
- **Custom Hook / React Query:** I could refactor the polling logic into a custom hook or use React Query to manage the polling and caching of status updates.
- **Polling Cancellation & Retries:** Further improvements would include handling polling cancellations gracefully and adding retry logic for failed requests.
