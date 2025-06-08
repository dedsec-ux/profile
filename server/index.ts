import express from "express";
import { registerRoutes } from "./routes";

const app = express();

// Add your middlewares here, e.g., JSON body parser
app.use(express.json());

(async () => {
  await registerRoutes(app);

  app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    // In a serverless environment, re-throwing the error might cause issues
    // You might want to log it and return without throwing, depending on desired error handling.
    // throw err; 
  });
})();

// Export the configured app for Netlify Functions or other environments
export { app };
