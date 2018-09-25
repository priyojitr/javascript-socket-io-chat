function bootstrapSocketServer(io) {
	io.on('connection', (socket) => {
		socket.on('register', (data) => {
			if(data.username !== null && data.channels !== null) {
				const username = data.username;
				const channels = data.channels;
				socket.emit('welcomeMessage', `Welcome ${username}`);
				channels.forEach(channel => {
					socket.join(channel);
					socket.emit('addedToChannel', {
						channel: channel
					});
				});
			}
			socket.on('joinChannel',(joinChannelData) => {
				socket.join(joinChannelData.channel);
				socket.emit('addedToChannel', {
					channel: joinChannelData.channel
				});
			});
			socket.on('leaveChannel',(removeChannelData) => {
				socket.leave(removeChannelData.channel);
				socket.emit('removedFromChannel', {
					channel: removeChannelData.channel
				});
			});
		});
		socket.on('message',(data) => {
			socket.broadcast.emit('newMessage',data);
		});
	});
}

module.exports = bootstrapSocketServer;
