const DB = https://chat-app-2261c-default-rtdb.firebaseio.com/ ;

function decodeBase64(str) {
    return atob(str);
}

async function load() {
    const res = await fetch(DB);
    const data = await res.json();

    const chat = document.getElementById("chat");
    chat.innerHTML = "";

    for (let id in data) {
        const msg = data[id];
        const decoded = decodeBase64(msg.msg);

        chat.innerHTML += `<p>[${msg.user}] ${decoded}</p>`;
    }
}

setInterval(load, 2000);
