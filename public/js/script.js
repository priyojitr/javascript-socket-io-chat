function sendMessage(event, socket) {
	event.preventDefault();
	// get username, channel & messages from UI
	const channel =  document.getElementById('channel').value;
	const message =  document.getElementById('message').value;
	const username = document.getElementById('username').value;
	// sending user data to client
	socket.emit('message', {
		channel,
		message,
		username
	});
	// updating UI client container element with the user data
	let innerhtml= '';
 	const chatContainer = document.getElementById('chatContainer');
 	const msgElm = document.createElement('div');
 	msgElm.innerHTML = innerhtml +
		`<div class="card sent-message">
			<div class="card-body">
				<p class="card-text">Me : ${message}</p>
			</div>
		
		</div>`;
		msgElm.className = 'col-12';
	chatContainer.insertBefore(msgElm,chatContainer.childNodes[0]);
}

function joinChannel(event, socket) {
	event.preventDefault();
	// get the channel name user provided
	const channel =  document.getElementById('newchannel').value;
	let joinChannels = channel.split(',');
	// send the channel name list to be added
	joinChannels.forEach(channel => {
		socket.emit('joinChannel', {
			channel: channel
		});
	});
}

function leaveChannel(event, socket) {
	event.preventDefault();
	// get the channel name user provided
	const channel =  document.getElementById('newchannel').value;
	let joinChannels = channel.split(',');
	// send the channel name list to be removed
	joinChannels.forEach(channel => {
		socket.emit('leaveChannel', {
			channel: channel
		});
	});
}

function onWelcomeMessageReceived(data) {
	// display default welcome message to the user
	let innerhtml= '';
	const chatContainer = document.getElementById('chatContainer');
	const messageElement = document.createElement('div');
	messageElement.innerHTML = innerhtml +
		`<div class="col-12">
			<div class="card received-message">
				<div class="card-body">
					<p class="card-text">System : ${data}</p>
				</div>
			</div>
		</div>`;
	chatContainer.appendChild(messageElement);
}

function addToChannelList(channel){
	// adding user to channels
	var dropdown = document.getElementById('channelsList');
	let options = document.createElement('option');
	options.value = channel.channel;
	dropdown.appendChild(options);
}

function onNewMessageReceived(message) {
	
	let innerhtml= '';
	const chatContainer = document.getElementById('chatContainer');
	const msgElm = document.createElement('div');
	msgElm.innerHTML = innerhtml +
	`<div class="card sent-message">
		<div class="card-body">
			<p class="card-text">${message.username} : ${message.message}</p>
		</div>
	</div>`;
	msgElm.className = 'col-12';
	chatContainer.insertBefore(msgElm,chatContainer.childNodes[0]);
}

function onRemovedFromChannelReceived(channel) {
	// removing user from channel
	const alertContainer = document.getElementById('alertContainer');
	let innerhtml='';
	const alertElement = document.createElement('div');
	alertElement.innerHTML= innerhtml +
		`<div class="alert alert-success alert-dismissible fade show" role="alert">
			You are removed from <strong>${channel.Channel}</strong> successfully!
			<button type="button" class="close" data-dismiss="alert" aria-label="Close">
				<span aria-hidden="true">&times;</span>
			</button>
		</div>`;
	// updating container to remove channel
	alertContainer.appendChild(alertElement);
	let chname = channel.Channel;
	var dropdown = document.getElementById('channelsList');
	let options = dropdown.getElementsByTagName('option');
	for(var i=0; i<options.length; i = i + 1){
		if(options[i].value == chname){
			dropdown.removeChild(options[i]);
		}
	}
	options.value = '';
	dropdown.appendChild(options);
}

function alertMessage(channel){
	const alertContainer = document.getElementById('alertContainer');
	const alertElement = document.createElement('div');
	alertElement.innerHTML =
		`<div class="alert alert-success alert-dismissible fade show" role="alert">
			You are added to <strong>${channel.channel}</strong> successfully!
			<button type="button" class="close" data-dismiss="alert" aria-label="Close">
				<span aria-hidden="true">&times;</span>
			</button>
		</div>`;
	alertContainer.appendChild(alertElement);
}

function onAddedToNewChannelReceived(channel) {
	alertMessage(channel);
	addToChannelList(channel);
}

module.exports = {
	sendMessage,
	joinChannel,
	leaveChannel,
	onWelcomeMessageReceived,
	onNewMessageReceived,
	onAddedToNewChannelReceived,
	onRemovedFromChannelReceived
};

// You will get error - Uncaught ReferenceError: module is not defined
// while running this script on browser which you shall ignore
// as this is required for testing purposes and shall not hinder
// it's normal execution

