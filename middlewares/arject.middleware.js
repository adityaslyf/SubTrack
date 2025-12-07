import aj from '../config/arject.js';
import { NODE_ENV } from '../config/env.js';

const arjectMiddleware = async (req, res, next) => {
  try {
    const result = await aj.protect(req, {requested: 1});
    
    // DRY_RUN in development = logs but doesn't block
    const isDevelopment = NODE_ENV !== 'production';
    
    if(result.isDenied && !isDevelopment){
      if(result.reason.isRateLimited){
        const retryAfter = result.reason.retryAfter;
        return res.status(429).json({ message: 'Too many requests', retryAfter });
      }
      if(result.reason.isBot){
        return res.status(403).json({ message: 'Bot detected' });
      }
      return res.status(403).json({ message: 'Access denied' });
    }
    
    // Log in development if would be denied
    if(result.isDenied && isDevelopment){
      console.log('🛡️  Arcjet would have blocked:', result.reason);
    }
    
    next();

  } catch (error) {
    next(error);
  }
};

export default arjectMiddleware;