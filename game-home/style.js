// Set username from localStorage
window.onload = () => {
    const username = localStorage.getItem("gameUser");
    document.getElementById("usernameDisplay").textContent = 
      username ? `Welcome, ${username}` : "Welcome!";
  };
  
  // Logout button functionality
  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("gameUser");
    window.location.href = "../setup.html"; // <-- Adjust the path based on your folder structure
  });
  
  // Coming soon alerts
  document.getElementById("articlesBtn").addEventListener("click", () => {
    alert("📚 Articles section coming soon!");
  });
  document.getElementById("photosBtn").addEventListener("click", () => {
    alert("📸 Photos section coming soon!");
  });
  
  // Sliding news
  let slideIndex = 0;
const slides = document.getElementById("slides");
const totalSlides = document.querySelectorAll(".news-slide").length;

function showNextSlide() {
  slideIndex = (slideIndex + 1) % totalSlides;
  slides.style.transform = `translateX(-${slideIndex * 100}vw)`;
}
  setInterval(showNextSlide, 5000);
  