
// over here we are calculating the current date
const currentDate = new Date();



// Format the date as desired (e.g., YYYY-MM-DD)
const formattedDate = currentDate.toISOString().slice(0, 10);

// for scrolling messages
function scrollToBottom() {
    var div = document.getElementById("upperid");
    div.scrollTop = div.scrollHeight;
}
scrollToBottom();

document.getElementById("userinputform").addEventListener("submit", function (event) {
  event.preventDefault();
  formsubmitted();
});

// sending request to python server
const formsubmitted = async () => {
    let userinput1 = document.getElementById('userinput1').value;
    let userinput2 = document.getElementById('userinput2').value;
  


    let sendbtn = document.getElementById('sendbtn');
    let userinputarea1 = document.getElementById('userinput1');
    let userinputarea2 = document.getElementById('userinput2');
    let msgerchat = document.getElementById('msger-chat');

    msgerchat.innerHTML = msgerchat.innerHTML + `

    <div class="msg right-msg">
    <div
     class="msg-img"
        ><img style="border-radius:50%;" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCR_l8xKBB1Agql-QYEn9IrGvTfA-IBPw29nzmJJJ52D79F5pcVWBKtKE38MvmWNjVxUQ&usqp=CAU"></div>

    <div class="msg-bubble">
      <div class="msg-info">
        <div class="msg-info-name">User</div>
        <div class="msg-info-time">${formattedDate}</div>
      </div>

      <div class="msg-text">
      ${userinput1} and ${userinput2} – all right, my dear companion!
      </div>
    </div>
  </div>
   
    
  `;
  
  // sendbtn.disabled = true;
  // userinputarea1.disabled = true;
  // userinputarea2.disabled = true;
  scrollToBottom();
  document.getElementById('userinput1').value = ""
  document.getElementById('userinput2').value = ""
  document.getElementById('userinput1').placeholder = "Wait . . ."
  document.getElementById('userinput2').placeholder = "Wait . . ."
  


    const response = await fetch("http://127.0.0.1:5000/data", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data1: userinput1, data2: userinput2 })
    });

    

    let json = await response.json();

    if (json.response) {
        // here is the key to maintain indentation
        let message = json.message;
      

        message = message.toString();

        msgerchat.innerHTML = msgerchat.innerHTML + `

        <div class="msg left-msg">
        <div
         class="msg-img"
        ><img style="border-radius:50%;" src="https://previews.123rf.com/images/goodzone95/goodzone951803/goodzone95180300026/96725720-chatbot-icon.jpg"></div>
        <div class="msg-bubble">
          <div class="msg-info">
            <div class="msg-info-name">User</div>
            <div class="msg-info-time">${formattedDate}</div>
          </div>
          <div class="msg-text" id="temp">
          
          </div>
        </div>
      </div>
        
       `;
        let temp = document.getElementById('temp');
        let index = 0;

        function displayNextLetter() {
            scrollToBottom();
            if (index < message.length) {
                temp.innerHTML = temp.innerHTML + message[index];
                index++;
                setTimeout(displayNextLetter, 30);
            } else {
                temp.removeAttribute('id');
                sendbtn.disabled = false;
                userinputarea1.disabled = false;
                userinputarea2.disabled = false;
            }
        }
        displayNextLetter();
        scrollToBottom();
    } else {
        let message = json.message;
        msgerchat.innerHTML = msgerchat.innerHTML +
            `
            <div class="msg left-msg">
            <div
             class="msg-img"
            ><img style="border-radius:50%;" src="https://previews.123rf.com/images/goodzone95/goodzone951803/goodzone95180300026/96725720-chatbot-icon.jpg"></div>
            <div class="msg-bubble">
              <div class="msg-info">
                <div class="msg-info-name">CodeGPT</div>
                <div class="msg-info-time">${formattedDate}</div>
              </div>
              <div class="msg-text">
                 ${message}
              </div>
            </div>
          </div>
      
    
    `;
        sendbtn.disabled = false;
        userinputarea1.disabled = false;
        userinputarea2.disabled = false;
    }

    scrollToBottom();
    
};

var getSidebar = document.querySelector('nav');
var getToggle = document.getElementsByClassName('toggle');
for (var i = 0; i <= getToggle.length; i++) {
    getToggle[i].addEventListener('click', function () {
        getSidebar.classList.toggle('active');
    });
}