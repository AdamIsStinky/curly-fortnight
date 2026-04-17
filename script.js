const BASE_URL = "https://chat-app-2261c-default-rtdb.firebaseio.com/messages";

let lobby = "";
let key = "";

function xor(data, key) {
    let result = "";
    for (let i = 0; i < data.length; i++) {
        result += String.fromCharCode(
            data.charCodeAt(i) ^ key.charCodeAt(i % key.length)
        );
    }
    return result;
}

function decode(msg) {
    try {
        const raw = atob(msg);
        return xor(raw, key);
    } catch {
        return "(decode failed)";
    }
}

function start() {
    lobby = document.getElementById("lobby").value;
    key = document.getElementById("key").value;

    setInterval(loadMessages, 2000);
}

async function loadMessages() {
    const res = await fetch(`${BASE_URL}/${lobby}.json`);
    const data = await res.json();

    const chat = document.getElementById("chat");
    chat.innerHTML = "";

    if (!data) return;

    for (let id in data) {
        const msg = data[id];
        const text = decode(msg.msg);

        chat.innerHTML += `<p>[${msg.user}] - ${text}</p>`;
    }
}
