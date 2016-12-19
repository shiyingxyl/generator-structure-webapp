const context = require.context('./app', true, /\.(js|ts|tsx)$/);
context.keys().forEach(context);

// // require all `test/components/**/index.js`
// const testsContext = require.context('./src/components/', true, /index\.js$/);

// testsContext.keys().forEach(testsContext);

// // require all `src/components/**/index.js`
// const componentsContext = require.context('../src/components/', true, /index\.js$/);

// componentsContext.keys().forEach(componentsContext);
