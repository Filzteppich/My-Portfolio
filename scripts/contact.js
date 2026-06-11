function sendNewMessage(){
    event.preventDefault();
    const message = collectMessageData();

    if (message.name && message.email && message.message) {
        console.log(message);
        
    }
}

function collectMessageData(){
    const form = document.getElementById('formContainer');
    const fd = new FormData(form);
    const message = {
        name : fd.get('user_name'),
        email : fd.get('user_mail'),
        message : fd.get('user_message')
    };
    return message;

}

function textAreaAdjust(element) {
  element.style.height = "1px";
  element.style.height = (element.scrollHeight)+"px";
}