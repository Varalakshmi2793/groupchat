document.addEventListener('DOMContentLoaded', () => {
    loadUsersAndGroups();
    if (localStorage.getItem('token')) {
        loadMessages();
    }
});

async function loadUsersAndGroups() {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/users-and-groups', {
            headers: {
                'Authorization': token
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch users and groups');
        }

        const { users, groups } = await response.json();
        displayUsersAndGroups(users, groups);
    } catch (error) {
        console.error('Error loading users and groups:', error);
    }
}

function displayUsersAndGroups(users, groups) {
    const userList = document.getElementById('user-list');
    const groupList = document.getElementById('group-list');

    userList.innerHTML = '';
    groupList.innerHTML = '';

    users.forEach(user => {
        const userElement = document.createElement('div');
        userElement.textContent = user.username;
        userElement.onclick = () => {
            selectChat(user.username, 'user', user.id);
        };
        userList.appendChild(userElement);
    });

    groups.forEach(group => {
        const groupElement = document.createElement('div');
        groupElement.textContent = group.name;
        groupElement.onclick = () => {
            selectChat(group.name, 'group', group.id);
        };
        groupList.appendChild(groupElement);
    });
}

function selectChat(name, type, id) {
    const chatTitle = document.getElementById('chat-title');
    chatTitle.textContent = name;
    localStorage.setItem('chatType', type);
    localStorage.setItem('chatId', id);
    loadMessages();
}

async function sendMessage(content) {
    try {
        const token = localStorage.getItem('token');
        const chatType = localStorage.getItem('chatType');
        const chatId = localStorage.getItem('chatId');
        const groupId = chatType === 'group' ? chatId : null;
        const userId = chatType === 'user' ? chatId : null;

        if (!token) {
            throw new Error('Token is missing');
        }

        const response = await fetch('/api/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({ content, GroupId: groupId, UserId: userId })
        });

        if (!response.ok) {
            throw new Error('Failed to send message');
        }

        const result = await response.json();
        displayMessage(result.message);
    } catch (error) {
        console.error('Error sending message:', error);
    }
}

function displayMessage(message) {
    const messagesDiv = document.getElementById('messages');
    const messageElement = document.createElement('div');
    const username = message.User ? message.User.username : 'Unknown';
    messageElement.textContent = `${username}: ${message.content}`;
    messagesDiv.appendChild(messageElement);
}

async function loadMessages() {
    try {
        const token = localStorage.getItem('token');
        const chatType = localStorage.getItem('chatType');
        const chatId = localStorage.getItem('chatId');
        const groupId = chatType === 'group' ? chatId : null;
        const userId = chatType === 'user' ? chatId : null;

        if (!token) {
            throw new Error('Token is missing');
        }

        const response = await fetch('/api/messages', {
            headers: {
                'Authorization': token
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch messages');
        }

        const responseData = await response.json();
        console.log(responseData);

        if (!Array.isArray(responseData.messages)) {
            throw new Error('Invalid response format: messages array is missing');
        }

        const messagesDiv = document.getElementById('messages');
        messagesDiv.innerHTML = '';

        responseData.messages.forEach(message => {
            if ((groupId && message.GroupId === groupId) || (userId && message.UserId === userId)) {
                displayMessage(message);
            }
        });
    } catch (error) {
        console.error('Error loading messages:', error);
    }
}

// Event listener for form submission
document.getElementById('message-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const content = document.getElementById('message-content').value;
    if (content.trim() !== '') {
        await sendMessage(content);
        document.getElementById('message-content').value = '';
    }
});

// Function to create a new group
async function createGroup(name) {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Token is missing');
        }

        const response = await fetch('/groups', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({ name })
        });

        if (!response.ok) {
            throw new Error('Failed to create group');
        }

        const result = await response.json();
        console.log('Group created:', result.group);
        // Reload users and groups after creating a new group
        loadUsersAndGroups();
    } catch (error) {
        console.error('Error creating group:', error);
    }
}

// Function to add a user to a group
async function addUserToGroup(groupId, userId) {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Token is missing');
        }

        const response = await fetch(`/groups/${groupId}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({ userId })
        });

        if (!response.ok) {
            throw new Error('Failed to add user to group');
        }

        const result = await response.json();
        console.log('User added to group:', result.userGroup);
    } catch (error) {
        console.error('Error adding user to group:', error);
    }
}
