import express, { type Request, Response, NextFunction } from "express";
import { app } from "./index"; // Import the Express app
import { setupVite, serveStatic, log } from "./vite";
import open from 'open';

(async () => {
  const server = await app.listen(5001, () => {
    log(`serving on port 5001`);
    if (process.env.NODE_ENV !== 'production') {
      open(`http://localhost:5001`);
    }
  });

  // Importantly, only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // Add your log and error handling middleware here if needed, but it should be part of the app.js
})(); 