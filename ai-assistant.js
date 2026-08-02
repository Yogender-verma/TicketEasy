/* ============================================================
   TicketEasy — ai-assistant.js
   Small Floating AI Icon (Bottom-Right) & 4x3 Order Dashboard
   ============================================================ */

document.addEventListener("DOMContentLoaded", function () {
  // Prevent duplicate floating buttons inside iframes
  if (window.self !== window.top) return;
  injectAICopilotWidget();
});

function injectAICopilotWidget() {
  if (document.getElementById("aiCopilotDrawer")) return;

  const widgetHTML = `
  <!-- Small Bottom-Right Floating Icon -->
  <button class="ai-float-btn" id="aiFloatBtn" onclick="toggleAIChat()" title="AI Copilot">
    🤖
  </button>

  <!-- 4x3 Order AI Copilot Window (520px x 390px = 4:3 Ratio) -->
  <div class="ai-chat-drawer" id="aiCopilotDrawer">
    
    <!-- Top Header Bar -->
    <div class="ai-chat-header">
      <div style="display:flex; align-items:center; gap:8px;">
        <span style="font-size:18px;">🤖</span>
        <div>
          <h4 style="font-size:14px; font-weight:800; margin:0;">TicketEasy AI Copilot</h4>
          <div style="font-size:10px; opacity:0.85;">4x3 Smart Action Dashboard</div>
        </div>
      </div>

      <div style="display:flex; align-items:center; gap:8px;">
        <div style="background:rgba(255,255,255,0.15); padding:2px 8px; border-radius:12px; font-size:11px; display:flex; gap:6px;">
          <span style="cursor:pointer; font-weight:700; color:white;" id="tabBtnGrid" onclick="switchAIView('grid')">4x3 Grid</span>
          <span>|</span>
          <span style="cursor:pointer; font-weight:700; color:rgba(255,255,255,0.7);" id="tabBtnChat" onclick="switchAIView('chat')">Live Chat</span>
        </div>
        <span style="cursor:pointer; font-weight:bold; font-size:18px; margin-left:6px;" onclick="toggleAIChat()">✕</span>
      </div>
    </div>

    <!-- 4x3 ORDER GRID (4 Columns x 3 Rows = 12 Interactive Cards) -->
    <div class="ai-grid-4x3" id="aiGridView">
      <div class="ai-grid-card" onclick="triggerGridAction('flight')">
        <div class="icon">✈️</div>
        <div class="title">Flights</div>
      </div>
      <div class="ai-grid-card" onclick="triggerGridAction('bus')">
        <div class="icon">🚌</div>
        <div class="title">Buses</div>
      </div>
      <div class="ai-grid-card" onclick="triggerGridAction('train')">
        <div class="icon">🚆</div>
        <div class="title">Trains</div>
      </div>
      <div class="ai-grid-card" onclick="triggerGridAction('hotel')">
        <div class="icon">🏨</div>
        <div class="title">Hotels</div>
      </div>

      <div class="ai-grid-card" onclick="triggerGridAction('coupon')">
        <div class="icon">🏷️</div>
        <div class="title">Coupons</div>
      </div>
      <div class="ai-grid-card" onclick="triggerGridAction('itinerary')">
        <div class="icon">🌴</div>
        <div class="title">Itinerary</div>
      </div>
      <div class="ai-grid-card" onclick="triggerGridAction('baggage')">
        <div class="icon">🧳</div>
        <div class="title">Baggage</div>
      </div>
      <div class="ai-grid-card" onclick="triggerGridAction('weather')">
        <div class="icon">🌤️</div>
        <div class="title">Weather</div>
      </div>

      <div class="ai-grid-card" onclick="triggerGridAction('tickets')">
        <div class="icon">🎟️</div>
        <div class="title">My Tickets</div>
      </div>
      <div class="ai-grid-card" onclick="triggerGridAction('upi')">
        <div class="icon">📲</div>
        <div class="title">UPI QR</div>
      </div>
      <div class="ai-grid-card" onclick="triggerGridAction('profile')">
        <div class="icon">👤</div>
        <div class="title">Profile</div>
      </div>
      <div class="ai-grid-card" onclick="switchAIView('chat')">
        <div class="icon">💬</div>
        <div class="title">Ask AI</div>
      </div>
    </div>

    <!-- LIVE CHAT MESSAGES VIEW -->
    <div class="ai-chat-messages" id="aiChatView" style="display:none;">
      <div class="chat-msg bot">
        👋 Hi! I'm your <b>TicketEasy AI Copilot</b>. Use the 4x3 action grid above or ask me any question below!
      </div>
    </div>

    <!-- INPUT BAR -->
    <div class="ai-chat-input-wrap">
      <input type="text" id="aiUserInput" placeholder="Ask AI (e.g. 'Plan Goa trip' or 'Coupons')..." onkeypress="handleAIKeyPress(event)">
      <button class="ai-send-btn" onclick="sendAIMessage()">Send</button>
    </div>
  </div>`;

  document.body.insertAdjacentHTML("beforeend", widgetHTML);
}

window.toggleAIChat = function () {
  // If running inside iframe, delegate to top window
  if (window.self !== window.top && window.top.toggleAIChat) {
    window.top.toggleAIChat();
    return;
  }

  const drawer = document.getElementById("aiCopilotDrawer");
  if (drawer) {
    const isActive = drawer.classList.contains("active");
    if (!isActive) {
      // Always open directly into 4x3 grid view
      switchAIView("grid");
      drawer.classList.add("active");
    } else {
      drawer.classList.remove("active");
    }
  }
};

window.switchAIView = function (view) {
  const gridView = document.getElementById("aiGridView");
  const chatView = document.getElementById("aiChatView");
  const tabGrid = document.getElementById("tabBtnGrid");
  const tabChat = document.getElementById("tabBtnChat");

  if (!gridView || !chatView) return;

  if (view === "grid") {
    gridView.style.display = "grid";
    chatView.style.display = "none";
    if (tabGrid) tabGrid.style.color = "white";
    if (tabChat) tabChat.style.color = "rgba(255,255,255,0.7)";
  } else {
    gridView.style.display = "none";
    chatView.style.display = "flex";
    if (tabChat) tabChat.style.color = "white";
    if (tabGrid) tabGrid.style.color = "rgba(255,255,255,0.7)";
  }
};

window.triggerGridAction = function (type) {
  const iframe = document.getElementById("mainIframe") || document.querySelector("iframe");

  if (type === "flight") {
    if (iframe) iframe.src = "flight.html";
    else window.location.href = "flight.html";
    toggleAIChat();
  } else if (type === "bus") {
    if (iframe) iframe.src = "bus.html";
    else window.location.href = "bus.html";
    toggleAIChat();
  } else if (type === "train") {
    if (iframe) iframe.src = "trains.html";
    else window.location.href = "trains.html";
    toggleAIChat();
  } else if (type === "hotel") {
    if (iframe) iframe.src = "hotel.html";
    else window.location.href = "hotel.html";
    toggleAIChat();
  } else if (type === "tickets") {
    if (iframe) iframe.src = "MT.html";
    else window.location.href = "MT.html";
    toggleAIChat();
  } else if (type === "profile") {
    if (iframe) iframe.src = "Profile.html";
    else window.location.href = "Profile.html";
    toggleAIChat();
  } else if (type === "itinerary") {
    if (iframe) iframe.src = "trips.html";
    else window.location.href = "trips.html";
    toggleAIChat();
  } else {
    switchAIView("chat");
    let queryText = "";
    if (type === "coupon") queryText = "Show me active discount coupon codes";
    if (type === "baggage") queryText = "What is baggage allowance for flights?";
    if (type === "weather") queryText = "Check weather in Goa for my trip";
    if (type === "upi") queryText = "How to pay via UPI QR code?";
    
    document.getElementById("aiUserInput").value = queryText;
    sendAIMessage();
  }
};

window.handleAIKeyPress = function (e) {
  if (e.key === "Enter") sendAIMessage();
};

window.sendAIMessage = function () {
  switchAIView("chat");
  const input = document.getElementById("aiUserInput");
  const msgContainer = document.getElementById("aiChatView");
  if (!input || !msgContainer) return;

  const query = input.value.trim();
  if (!query) return;

  const userBubble = document.createElement("div");
  userBubble.className = "chat-msg user";
  userBubble.textContent = query;
  msgContainer.appendChild(userBubble);

  input.value = "";
  msgContainer.scrollTop = msgContainer.scrollHeight;

  const botTyping = document.createElement("div");
  botTyping.className = "chat-msg bot";
  botTyping.innerHTML = "<i>AI Copilot is thinking...</i>";
  msgContainer.appendChild(botTyping);
  msgContainer.scrollTop = msgContainer.scrollHeight;

  setTimeout(() => {
    botTyping.remove();
    const botReply = generateAIResponse(query);
    const botBubble = document.createElement("div");
    botBubble.className = "chat-msg bot";
    botBubble.innerHTML = botReply;
    msgContainer.appendChild(botBubble);
    msgContainer.scrollTop = msgContainer.scrollHeight;
  }, 400);
};

function generateAIResponse(q) {
  const query = q.toLowerCase();

  if (query.includes("coupon") || query.includes("code") || query.includes("offer") || query.includes("discount")) {
    return `🎉 <b>Active AI Promo Codes:</b><br><br>
    • <b>EASYAI20</b> — 20% OFF on all Flight & Bus bookings.<br>
    • <b>FESTIVE500</b> — Instant ₹500 discount on Train & Hotel tickets.<br><br>
    <i>Tip: Apply these directly during checkout!</i>`;
  }

  if (query.includes("goa") || query.includes("itinerary")) {
    return `🌴 <b>3-Day Goa AI Trip Itinerary (Budget ~₹12,500):</b><br><br>
    <b>Day 1:</b> Arrive in North Goa → Baga Beach Sunset Walk → Tito's Nightlife.<br>
    <b>Day 2:</b> Anjuna Beach Watersports → Mandovi River Dinner Cruise.<br>
    <b>Day 3:</b> Old Goa Churches → Spice Plantation tour & Departure.`;
  }

  if (query.includes("baggage") || query.includes("luggage")) {
    return `🧳 <b>Standard Baggage Policy:</b><br><br>
    • <b>Domestic Flights:</b> 15 kg Check-in + 7 kg Cabin allowance.<br>
    • <b>International Flights:</b> 25 kg to 30 kg Check-in.<br>
    • <b>Extra Baggage:</b> You can select extra baggage during seat booking!`;
  }

  if (query.includes("upi") || query.includes("qr") || query.includes("pay")) {
    return `📲 <b>UPI & Dynamic QR Payments:</b><br><br>
    • Select <b>UPI / QR</b> during ticket booking.<br>
    • Scan the dynamic QR Code using Paytm, PhonePe, Google Pay, or BHIM.<br>
    • Instant PNR confirmation & E-Ticket download!`;
  }

  return `🤖 I parsed your query: <i>"${q}"</i>.<br><br>
  I can assist with flight reservations, bus seats, train berths, hotel stays, or itinerary planning. Try asking:<br>
  • <i>"Show me promo codes"</i><br>
  • <i>"Book flight to Dubai"</i><br>
  • <i>"Plan 3-day Goa trip"</i>`;
}
