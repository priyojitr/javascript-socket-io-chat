let channelList = [];
// send message
function sendMessage(event, socket) {
    event.preventDefault();
	const usernameInput = document.getElementById('username').value;
	const usernameValue = usernameInput === '' ? 'Anonymous' : usernameInput;
	const channelValue = document.getElementById('channel').value;
	const messageValue = document.getElementById('message').value;
	let divClass = document.createElement('div');
	divClass.className = 'col-12';
	let cardSentDiv = document.createElement('div');
	cardSentDiv.className = 'card sent-message text-left';
	divClass.appendChild(cardSentDiv);
	let cardBodyDiv = document.createElement('div');
	cardBodyDiv.className = 'card-body';
	cardSentDiv.appendChild(cardBodyDiv);
	let paragraphDiv = document.createElement('p');
	paragraphDiv.className = 'card-text';
	cardBodyDiv.appendChild(paragraphDiv);
	let messageContent = document.createTextNode(`Me : ${messageValue}`);
	paragraphDiv.appendChild(messageContent);
	let chatContainer = document.getElementById('chatContainer');
	chatContainer.appendChild(divClass);
    chatContainer.insertBefore(divClass,chatContainer.firstChild);
    let data = {
        username: usernameValue,
        channel: channelValue,
        message: messageValue
    };
    socket.emit('message', data);
}

// join channel
function joinChannel(event, socket) {
    event.preventDefault();
    const usernameInput = document.getElementById('username').value;
    const usernameValue = usernameInput === '' ? 'Anonymous' : usernameInput;
    const channelValue = document.getElementById('newchannel').value;
    let data = {
        username: usernameValue,
        channel: channelValue
    };
    socket.emit('joinChannel', data);
}

//leave channel
function leaveChannel(event, socket){
    event.preventDefault();
    const usernameInput = document.getElementById('username').value;
    const usernameValue = usernameInput === '' ? 'Anonymous' : usernameInput;
    const channelValue = document.getElementById('newchannel').value;
    let data = {
        username: usernameValue,
        channel: channelValue
    };
    socket.emit('leaveChannel', data);
}

// welcome message
function onWelcomeMessageReceived(data) {
	let divClass = document.createElement('div');
	divClass.className = 'col-12';
	let cardReceivedDiv = document.createElement('div');
	cardReceivedDiv.className = 'card received-message';
	divClass.appendChild(cardReceivedDiv);
	let cardBodyDiv = document.createElement('div');
	cardBodyDiv.className = 'card-body';
	cardReceivedDiv.appendChild(cardBodyDiv);
	let paragraphDiv = document.createElement('p');
	paragraphDiv.className = 'card-text';
	cardBodyDiv.appendChild(paragraphDiv);
	let messageContent = document.createTextNode(`System : ${data}`);
	paragraphDiv.appendChild(messageContent);
	document.getElementById('chatContainer').appendChild(divClass);
}

// when new message received
function onNewMessageReceived(data) {
	let divClass = document.createElement('div');
	divClass.className = 'col-12';
	let cardReceivedDiv = document.createElement('div');
	cardReceivedDiv.className = 'card received-message text-right';
	divClass.appendChild(cardReceivedDiv);
	let cardBodyDiv = document.createElement('div');
	cardBodyDiv.className = 'card-body';
	cardReceivedDiv.appendChild(cardBodyDiv);
	let paragraphDiv = document.createElement('p');
	paragraphDiv.className = 'card-text';
	cardBodyDiv.appendChild(paragraphDiv);
	let messageContent = document.createTextNode(`${data.username} : ${data.message}`);
	paragraphDiv.appendChild(messageContent);
	let chatContainer = document.getElementById('chatContainer');
	chatContainer.appendChild(divClass);
	chatContainer.insertBefore(divClass,chatContainer.firstChild);
}

// when added to new channel
function onAddedToNewChannelReceived(data) {
    const alertDiv = document.getElementById('alertContainer');
	let alertDivContent = '';
	alertDivContent = alertDivContent +
		`<div class="alert alert-success alert-dismissible fade show" role="alert">
			You are added to <strong>${data.channel}</strong> successfully!
			<button type="button" class="close" data-dismiss="alert" aria-label="Close">
				<span aria-hidden="true">&times;</span>
			</button>
		</div>`;
    alertDiv.innerHTML = alertDivContent;
    let channelDropDown = document.getElementById('channelsList');
	let channelContent = '';
	channelList.push(data.channel);
	channelList.map(channel => {
		channelContent = channelContent +
			`<option>${channel}</option>`;
	});
	channelDropDown.innerHTML = channelContent;
}

// when removed from channel
function onRemovedFromChannelReceived(data) {
    let alertDiv = document.getElementById('alertContainer');
	let alertDivContent = '';
	alertDivContent = alertDivContent +
		`<div class="alert alert-success alert-dismissible fade show" role="alert">
			You are removed to <strong>${data.channel}</strong> successfully!
			<button type="button" class="close" data-dismiss="alert" aria-label="Close">
				<span aria-hidden="true">&times;</span>
			</button>
		</div>`
    alertDiv.innerHTML = alertDivContent;
    let channelDropDown = document.getElementById('channelsList');
	let channelContent = '';
	channelList.splice(channelList.indexOf(data.channel), 1);
	channelList.map(channel => {
		channelContent = channelContent +
			`<option>${channel}</option>`;
	});
	channelDropDown.innerHTML = channelContent;
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