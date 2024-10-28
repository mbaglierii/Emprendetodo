document.addEventListener("DOMContentLoaded", function () {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const navButtons = document.getElementById("navButtons");
    const userInfo = document.getElementById("user-info");

    if (isLoggedIn) {
        navButtons.style.display = "none"; 

        const userInfoData = JSON.parse(localStorage.getItem("userInfo")); 
        
        if (userInfoData) {
            userInfo.classList.remove("hidden"); 
            userInfo.querySelector(".greeting").textContent = "Hola, " + userInfoData.username; 
            userInfo.querySelector(".profile-pic").src = "/user_ProfilePicture/"+ userInfoData.imagen_dir; 
        }
    } else {
        if (userInfo) {
            userInfo.classList.add("hidden"); 
        }
    }
});
