import session from 'express-session';
var MemoryStore = require('memorystore')(session)
export default session({
  secret: process.env.SESSION_SECRET ,
  store: new MemoryStore({
    checkPeriod: 86400000 // prune expired entries every 24h
  }),
  resave: true,
  saveUninitialized: false,
  name: process.env.SESSION_NAME ,
});
