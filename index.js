const server = require('server');
const { get, socket } = server.router;
const { render } = server.reply;

// Update everyone with the current user count
const updateCounter = ctx => {
  ctx.io.emit('count', Object.keys(ctx.io.sockets.sockets).length);
};

// Send the new message to everyone
const sendMessage = ctx => {
  ctx.io.emit('message', ctx.data);
};

// Send the new message when new user join to everyone
const sendJoinMessage = ctx => {
  ctx.io.emit('join', ctx.data);
};

server([
  get('/', ctx => render('index.html')),
  get('/favicon.ico', ()=>{return ''}),
  socket('connect', updateCounter),
  socket('join', sendJoinMessage),
  socket('disconnect', updateCounter),
  socket('message', sendMessage)
]);