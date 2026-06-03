

function init(){
   
}

function changeIcon(){
   let iconRef = document.getElementById('githubIcon');
   let radioIconRef = document.getElementById('radioIcon');
      iconRef.src = "./assets/icons/social-icons/GitHub-Hover.svg"
      radioIconRef.style.display = "flex";   
   };

function resetIcon(){
   let iconRef = document.getElementById('githubIcon');
   let radioIconRef = document.getElementById('radioIcon');
   iconRef.src = "./assets/icons/social-icons/GitHub.svg"
   radioIconRef.style.display = "none";
}


   