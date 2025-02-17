document.addEventListener("DOMContentLoaded", () => {
    loadHistory();
});

// Send message to backend
function sendMessage() {
    let userInput = document.getElementById("user-input").value;
    let chatBox = document.getElementById("chat-box");

    if (userInput.trim() === "") return;

    // Append user message
    chatBox.innerHTML += `<div class="user-message"><strong>You:</strong> ${userInput}</div>`;
    
    fetch("/get", {
        method: "POST",
        body: JSON.stringify({ message: userInput }),
        headers: { "Content-Type": "application/json" }
    })
    .then(response => response.json())
    .then(data => {
        chatBox.innerHTML += `<div class="bot-message"><strong>Bot:</strong> ${data.response}</div>`;
        chatBox.scrollTop = chatBox.scrollHeight;
        saveToHistory(userInput, data.response);
    });

    document.getElementById("user-input").value = "";
}

// Save chat history
function saveToHistory(user, bot) {
    let historyList = document.getElementById("history-list");
    let chatItem = document.createElement("li");
    chatItem.textContent = `You: ${user} | Bot: ${bot}`;
    historyList.appendChild(chatItem);
    
    let history = JSON.parse(localStorage.getItem("chatHistory")) || [];
    history.push({ user, bot });
    localStorage.setItem("chatHistory", JSON.stringify(history));
}

// Load chat history
function loadHistory() {
    let history = JSON.parse(localStorage.getItem("chatHistory")) || [];
    let historyList = document.getElementById("history-list");
    
    history.forEach(chat => {
        let chatItem = document.createElement("li");
        chatItem.textContent = `You: ${chat.user} | Bot: ${chat.bot}`;
        historyList.appendChild(chatItem);
    });
}

// Clear chat history
function clearHistory() {
    localStorage.removeItem("chatHistory");
    document.getElementById("history-list").innerHTML = "";
}

// Toggle Settings Modal
function toggleSettings() {
    let modal = document.getElementById("settings-modal");
    modal.style.display = (modal.style.display === "flex") ? "none" : "flex";
}
