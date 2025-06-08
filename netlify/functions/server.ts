import serverless from 'serverless-http';
import { app } from '../../server/index'; // Adjust the path to your server/index.ts

// This is the handler that Netlify will use to run your Express app
export const handler = serverless(app); 