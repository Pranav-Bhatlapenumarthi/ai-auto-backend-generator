import http from 'k6/http';
import { check, sleep } from 'k6';

// Import the text summary helper from the k6 library
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.2/index.js';

export const options = {
  stages: [
    { duration: '2m', target: 50 },
    { duration: '5m', target: 50 },
    { duration: '2m', target: 150 },
    { duration: '3m', target: 150 },
    { duration: '2m', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<5000'],
    http_req_failed: ['rate<0.02'],
  },
};

export default function () {
  const url = 'http://backend-generator-ALB-263500370.us-east-1.elb.amazonaws.com/api/generate';

  const payload = JSON.stringify({
    prompt: "Load test generation request to trigger AWS ASG."
  });

  const params = {
    headers: { 'Content-Type': 'application/json' },
    timeout: '15s',
  };

  const res = http.post(url, payload, params);

  check(res, {
    'status is 200': (r) => r.status === 200,
    'status is not 502': (r) => r.status !== 502,
    'status is not 504': (r) => r.status !== 504,
  });

  sleep(1);
}

// This function runs automatically at the end of the test (or on a graceful stop)
export function handleSummary(data) {
  console.log('Test finished! Generating summary...');
  
  return {
    // 1. Print the standard summary to the console
    'stdout': textSummary(data, { indent: ' ', enableColors: true }),
    
    // 2. Save the raw data to a JSON file in your project folder
    'summary.json': JSON.stringify(data, null, 2), 
  };
}