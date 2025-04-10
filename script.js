const usernameInput = document.getElementById("user-input");
const searchBtn = document.getElementById("search-btn");
const statsContainer = document.querySelector(".stats-container");

const easyCard = document.getElementById("easy-label");
const mediumCard = document.getElementById("medium-label");
const hardCard = document.getElementById("hard-label");

function validateUsername(username) {
  if (username.trim() === "") {
    alert("Username should not be empty");
    return false;
  }
  return true;
}

async function fetchUserDetails(username) {
  try {
    searchBtn.textContent = "Searching...";
    searchBtn.disabled = true;

    const response = await fetch(
      `https://leetcode-stats-api.herokuapp.com/${username}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data. User not found or API issue.");
    }

    const data = await response.json();

    // Update inner text
    easyCard.innerHTML = `${data.easySolved} / ${data.totalEasy}<br><span>Easy</span>`;
    mediumCard.innerHTML = `${data.mediumSolved} / ${data.totalMedium}<br><span>Medium</span>`;
    hardCard.innerHTML = `${data.hardSolved} / ${data.totalHard}<br><span>Hard</span>`;

    // Apply border colors based on percentage
    updateBorder(easyCard, data.easySolved / data.totalEasy);
    updateBorder(mediumCard, data.mediumSolved / data.totalMedium);
    updateBorder(hardCard, data.hardSolved / data.totalHard);

    // Populate bottom cards
    document.getElementById("total-sub").textContent = data.totalSolved;
    document.getElementById("easy-sub").textContent = data.easySolved;
    document.getElementById("medium-sub").textContent = data.mediumSolved;
    document.getElementById("hard-sub").textContent = data.hardSolved;
  } catch (error) {
    statsContainer.innerHTML = `<p style="color: red;">${error.message}</p>`;
  } finally {
    searchBtn.textContent = "Search";
    searchBtn.disabled = false;
  }
}

function updateBorder(element, percent) {
  if (percent > 0.75) {
    element.style.borderColor = "#00ff00";
    element.style.boxShadow = "0 0 10px #00ff00";
  } else if (percent > 0.4) {
    element.style.borderColor = "#ffaa00";
    element.style.boxShadow = "0 0 10px #ffaa00";
  } else {
    element.style.borderColor = "#ff0000";
    element.style.boxShadow = "0 0 10px #ff0000";
  }
}

searchBtn.addEventListener("click", function () {
  const username = usernameInput.value;
  if (validateUsername(username)) {
    fetchUserDetails(username);
  }
});
