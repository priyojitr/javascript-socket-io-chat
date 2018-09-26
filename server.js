function bootstrapSocketServer(io) {
	io.on('connection', (socket) => {
		socket.on('register', (data) => {
			//const username = data.username;
			//const channels = data.channels;
			if(data.channels !== null && data.channels.length > 0) {
				// welcome message
				socket.emit('welcomeMessage', `Welcome ${data.username}`);
				// adding to respective channels
				data.channels.map(channel => {
					socket.join(channel);
					socket.emit('addedToChannel', {
						channel: channel
					});
				});
				// send message to channels
				socket.on('message', (data) => {
					socket.to(data.channel).emit('newMessage', data);
				});
			}
			else {
				// welcome message when user data is missing
				socket.emit('welcomeMessage', `Welcome ${username}`)
				// broadcase message
				socket.on('message', (data) => {
					socket.broadcast.emit('newMessage', data);
				});
			}
			// join channel
			socket.on('joinChannel', (data) => {
				socket.join(data.channel);
				socket.emit('addedToChannel', data);
			});
			// leave channel
			socket.on('leaveChannel', (data) => {
				socket.leave(data.channel);
				socket.emit('removedFromChannel', data);
			});
		});
	});
}

module.exports = bootstrapSocketServer;
