import arcjet, { shield, detectBot, tokenBucket } from "@arcjet/node";
import { ARCJET_KEY, NODE_ENV } from '../config/env.js';

// DRY_RUN in development = logs but doesn't block
// LIVE in production = actually blocks
const isDevelopment = NODE_ENV !== 'production';

const aj = arcjet({
  key: ARCJET_KEY,
  rules: [
    shield({ mode: isDevelopment ? "DRY_RUN" : "LIVE" }),
    detectBot({
      mode: isDevelopment ? "DRY_RUN" : "LIVE", 
      allow: ["CATEGORY:SEARCH_ENGINE"],
    }),
    tokenBucket({
      mode: isDevelopment ? "DRY_RUN" : "LIVE",
      refillRate: 5, 
      interval: 10, 
      capacity: 10, 
    }),
  ],
});

export default aj;