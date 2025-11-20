console.log("Loaded!")

//Extra vulnerabilities for detector to detect
const hash = location.hash.substring(1);
document.body.innerHTML += `<p>User data: ${hash}</p>`;


// Redirects user to ANY URL provided 
const redirect = new URLSearchParams(location.search).get("redirect");
if (redirect) {
    window.location = redirect; 
}


function login(username, password) {
    const query = "SELECT * FROM users WHERE username = '" + username +
                  "' AND password = '" + password + "';"; 
    console.log("Running query:", query); 
}
login("admin' OR '1'='1", "test");


// CodeQL will flag this as dangerous
const userInput = location.search.replace("?cmd=", "");
eval(userInput); 


const testCredentials = {
    user: "admin",
    pass: "password123" 
};


const iframe = document.createElement("iframe");
iframe.src = "http://example.com";
iframe.style.width = "1px";
iframe.style.height = "1px";
document.body.appendChild(iframe);


function printMessage() {
    const msg = document.getElementById("user-message").value;
    document.body.innerHTML += msg;
}
console.log("Still alive?");