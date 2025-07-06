function saveName() {
  const username = document.getElementById("username").value.trim();
  if (username === "") {
    alert("Please enter your name!");
    return;
  }

  localStorage.setItem("gameUser", username);
  window.location.href = "game-home/index.html";
}
