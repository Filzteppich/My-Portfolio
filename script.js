

function init(){
   initSkills()
}

function changeIcon(){
   let iconRef = document.getElementById('githubIcon');
   let radioIconRef = document.getElementById('radioIcon');
      iconRef.src = "./imgs/icons/social-icons/GitHub-Hover.svg"
      radioIconRef.style.display = "flex";   
   };

function resetIcon(){
   let iconRef = document.getElementById('githubIcon');
   let radioIconRef = document.getElementById('radioIcon');
   iconRef.src = "./imgs/icons/social-icons/GitHub.svg"
   radioIconRef.style.display = "none";
}


   