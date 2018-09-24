function bootstrapSocketServer(io) {
	io.on('connection', (socket) => {
		socket.on('register', (data) => {
			socket.emit('welcomeMessage', `${data.username}`);
			data.channels.forEach(channel => {
				socket.join(channel);
				socket.emit('addedToChannel', {channel});
			});
			socket.on('joinChannel',(joinChannelData) => {
				socket.join(joinChannelData.channel);
				socket.emit('addedToChannel',{channel: joinChannelData.channel});
			});
			socket.on('leaveChannel',(removeChannelData) => {
				socket.leave(removeChannelData.channel);
				socket.emit('removedFromChannel',{channel: removeChannelData.channel});
			});
			socket.on('message',(data) => {
				socket.broadcast.emit('newMessage',data);
			});
		});
	});
}

module.exports = bootstrapSocketServer;
