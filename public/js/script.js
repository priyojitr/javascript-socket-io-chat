function sendMessage(event, socket) {
	event.preventDefault();
	const channel =  document.getElementById('channel').value;
	const message =  document.getElementById('message').value;
	const username = document.getElementById('username').value;
	socket.emit('message', {
		channel,
		message,
		username
	});
	let innerhtml= '';
 	const chatContainer = document.getElementById('chatContainer');
 	const messageElement = document.createElement('div');
 	messageElement.innerHTML = innerhtml +
		`<div class="card sent-message">
			<div class="card-body">
				<p class="card-text">Me : ${message}</p>
			</div>
		
		</div>`;
	messageElement.className = 'col-12';
	chatContainer.insertBefore(messageElement,chatContainer.childNodes[0]);
}

function joinChannel(event, socket) {
	event.preventDefault();
	const channel =  document.getElementById('newchannel').value;
	let joinChannels = channel.split(',');
	joinChannels.forEach(channel => {
		socket.emit('joinChannel', {
			channel: channel
		});
	});
}

function leaveChannel(event, socket) {
	event.preventDefault();
	const channel =  document.getElementById('newchannel').value;
	let joinChannels = channel.split(',');
	joinChannels.forEach(channel => {
		socket.emit('leaveChannel', {
			channel: channel
		});
	});
}

function onWelcomeMessageReceived(data) {
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
	var dropdown = document.getElementById('channelsList');
	let options = document.createElement('option');
	options.value = channel.channel;
	dropdown.appendChild(options);
}

function onNewMessageReceived(message) {
	let innerhtml= '';
	const chatContainer = document.getElementById('chatContainer');
	const messageElement = document.createElement('div');
	messageElement.innerHTML = innerhtml +
		`<div class="card sent-message">
			<div class="card-body">
				<p class="card-text">${message.username}: ${message.message}</p>
			</div>
		</div>`;
	messageElement.className = 'col-12';
	chatContainer.insertBefore(messageElement, chatContainer.childNodes[0]);
}

function onRemovedFromChannelReceived(channel) {
	const alertContainer = document.getElementById('alertContainer');
	let innerhtml='';
	const alertElement = document.createElement('div');
	alertElement.innerHTML= innerhtml +
		`<div class="alert alert-success alert-dismissible fade show" role="alert">
			You are removed to <strong>${channel.Channel}</strong> successfully!
			<button type="button" class="close" data-dismiss="alert" aria-label="Close">
				<span aria-hidden="true">&times;</span>
			</button>
		</div>`;
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

