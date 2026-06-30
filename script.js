const emoji = document.getElementById("emoji");
const title = document.getElementById("title");
const subtitle = document.getElementById("subtitle");
const content = document.getElementById("content");
const buttons = document.getElementById("buttons");

let noCount = 0;
let selectedDay = "";
let selectedTime = "";
let selectedPlace = "";

const noMessages = [
  {
    emoji: "🥺",
    title: "Are you sure?",
    subtitle: "Maybe give it one more thought...",
  },
  {
    emoji: "👉👈",
    title: "Think again...",
    subtitle: "It'll only be a few hours.",
  },
  {
    emoji: "🍛",
    title: "Free food though...",
    subtitle: "Come on, that's a good deal.",
  },
];

const times = ["4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM"];

const places = [
  "Rabindra Sarobar",
  "Botanical Garden",
  "Uttara",
  "Ramna Park",
  "DU Campus Rickshaw Tour",
];

function setScreen(
  newEmoji,
  newTitle,
  newSubtitle,
  newContent = "",
  newButtons = ""
) {
  emoji.textContent = newEmoji;
  title.textContent = newTitle;
  subtitle.textContent = newSubtitle;
  content.innerHTML = newContent;
  buttons.innerHTML = newButtons;
}

function sayNo() {
  if (noCount < noMessages.length) {
    const msg = noMessages[noCount];

    setScreen(
      msg.emoji,
      msg.title,
      msg.subtitle,
      "",
      `
        <button class="btn yes" onclick="sayYes()">Yes 💕</button>
        <button class="btn no" onclick="sayNo()">No 🙈</button>
      `
    );

    noCount++;
    return;
  }

  setScreen(
    "🥹",
    "Pretty please?",
    "Only one answer is left now.",
    "",
    `<button class="btn yes big-yes" onclick="sayYes()">Yes 💕</button>`
  );
}

function sayYes() {
  setScreen("🎉", "YAY!!", "I knew you'd say yes. ❤️");

  setTimeout(showDaySelection, 800);
}

function showDaySelection() {
  setScreen(
    "📅",
    "Pick a Day",
    "Pick the day that works best for you.",
    `
      <div class="option-grid fade">
        <button class="option" onclick="selectDay('Friday', this)">🌅 Friday</button>
        <button class="option" onclick="selectDay('Saturday', this)">🌙 Saturday</button>
      </div>
    `
  );
}

function selectDay(day, btn) {
  selectedDay = day;
  markSelected(btn);

  buttons.innerHTML = `
    <button class="btn yes" onclick="showTimeSelection()">Next →</button>
  `;
}

function showTimeSelection() {
  const timeButtons = times
    .map(
      time => `
        <button class="option" onclick="selectTime('${time}', this)">⏰ ${time}</button>
      `
    )
    .join("");

  setScreen(
    "🕒",
    "Pick a Time",
    "What time feels perfect?",
    `<div class="option-grid fade">${timeButtons}</div>`
  );
}

function selectTime(time, btn) {
  selectedTime = time;
  markSelected(btn);

  if (time === "6:00 PM" || time === "7:00 PM" || time === "8:00 PM") {
    emoji.textContent = "🥺";
    title.textContent = "Can we meet earlier?";
    subtitle.textContent = "Maybe 4:00 PM or 5:00 PM would be sweeter.";

    buttons.innerHTML = "";
    return;
  }

  buttons.innerHTML = `
    <button class="btn yes" onclick="showPlaceSelection()">Next →</button>
  `;
}

function showPlaceSelection() {
  const placeButtons = places
    .map(
      place => `
        <button class="option" onclick="selectPlace('${place}', this)">📍 ${place}</button>
      `
    )
    .join("");

  setScreen(
    "📍",
    "Pick a Place",
    "Where should we spend the evening?",
    `<div class="option-grid fade">${placeButtons}</div>`
  );
}

function selectPlace(place, btn) {
  selectedPlace = place;
  markSelected(btn);

  buttons.innerHTML = `
    <button class="btn yes" onclick="showFinal()">Finish 💖</button>
  `;
}

function showFinal() {
  setScreen(
    "💌",
    "It's a Date!",
    "Save this little memory.",
    `
      <div class="final-card" id="invitation-card">
        <h2>💌 It's a Date!</h2>

        <p>📅 ${selectedDay}</p>
        <p>🕒 ${selectedTime}</p>
        <p>📍 ${selectedPlace}</p>

        <p>💖 Your Evening Belongs to Me. I can't wait to spend the evening with you. 💖</p>
      </div>
    `,
    `
      <button class="btn download" onclick="downloadCard()">Download Picture</button>
      <button class="btn no" onclick="restartApp()">Start Again</button>
    `
  );
}

function downloadCard() {
  const card = document.getElementById("invitation-card");

  html2canvas(card, {
    scale: 4,
    useCORS: true,
    backgroundColor: "#4b1e87", // Match your card background
    logging: false,
    allowTaint: true,
  }).then(canvas => {
    const link = document.createElement("a");
    link.download = "our-date.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  });
}

function restartApp() {
  location.reload();
}

function markSelected(selectedBtn) {
  document.querySelectorAll(".option").forEach(btn => {
    btn.classList.remove("selected");
  });

  selectedBtn.classList.add("selected");
}

function createHeart() {
  const heart = document.createElement("div");

  heart.className = "heart";
  heart.textContent = "♡";

  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = Math.random() * 12 + 14 + "px";
  heart.style.animationDuration = Math.random() * 4 + 6 + "s";

  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 10000);
}

setInterval(createHeart, 700);
