/* ============================================================
   TicketEasy — booking-modal.js
   Universal booking modal with extras + payment
   ============================================================ */

/* ── Inject modal HTML into every page ── */
document.addEventListener("DOMContentLoaded", function () {
  const modalHTML = `
  <div class="modal-overlay" id="bookingModal">
    <div class="modal-box">
      <span class="modal-close" onclick="closeModal()">✕</span>

      <!-- FORM SCREEN -->
      <div id="modalFormScreen">
        <div class="modal-title" id="modalTitle">Book Ticket</div>
        <div class="modal-subtitle" id="modalSubtitle">Fill in your details</div>

        <!-- TRAVELLERS -->
        <div class="modal-section">
          <div class="modal-section-title">👥 Travellers</div>
          <div class="counter-row">
            <div class="counter-label">Adults <span>(12+ yrs)</span></div>
            <div class="counter-btns">
              <button onclick="changeCount('adults',-1)">−</button>
              <span class="counter-num" id="countAdults">1</span>
              <button onclick="changeCount('adults',1)">+</button>
            </div>
          </div>
          <div class="counter-row">
            <div class="counter-label">Children <span>(2–12 yrs)</span></div>
            <div class="counter-btns">
              <button onclick="changeCount('kids',-1)">−</button>
              <span class="counter-num" id="countKids">0</span>
              <button onclick="changeCount('kids',1)">+</button>
            </div>
          </div>
          <div class="counter-row">
            <div class="counter-label">Infants <span>(under 2)</span></div>
            <div class="counter-btns">
              <button onclick="changeCount('infants',-1)">−</button>
              <span class="counter-num" id="countInfants">0</span>
              <button onclick="changeCount('infants',1)">+</button>
            </div>
          </div>
        </div>

        <!-- DYNAMIC EXTRAS (injected per type) -->
        <div id="extrasSection"></div>

        <!-- MEAL PREFERENCE -->
        <div class="modal-section" id="mealSection" style="display:none">
          <div class="modal-section-title">🍽️ Meal Preference</div>
          <div class="option-pills">
            <div class="pill active" onclick="selectPill(this,'meal')">Veg</div>
            <div class="pill" onclick="selectPill(this,'meal')">Non-Veg</div>
            <div class="pill" onclick="selectPill(this,'meal')">Jain</div>
            <div class="pill" onclick="selectPill(this,'meal')">No Meal</div>
          </div>
        </div>

        <!-- PRICE SUMMARY -->
        <div class="price-summary">
          <div class="price-row"><span>Base Fare</span><span id="pBase">₹0</span></div>
          <div class="price-row"><span id="pExtrasLabel" style="display:none">Extras</span><span id="pExtras"></span></div>
          <div class="price-row"><span>Taxes & Fees (5%)</span><span id="pTax">₹0</span></div>
          <div class="price-row total"><span>Total</span><span id="pTotal">₹0</span></div>
        </div>

        <!-- PAYMENT METHOD -->
        <div class="modal-section">
          <div class="modal-section-title">💳 Payment Method</div>
          <div class="payment-grid">
            <div class="pay-option active" onclick="selectPayment(this,'upi')">
              <div class="pay-icon">📲</div>
              <div class="pay-label">UPI</div>
            </div>
            <div class="pay-option" onclick="selectPayment(this,'card')">
              <div class="pay-icon">💳</div>
              <div class="pay-label">Credit / Debit Card</div>
            </div>
            <div class="pay-option" onclick="selectPayment(this,'wallet')">
              <div class="pay-icon">👛</div>
              <div class="pay-label">Wallet</div>
            </div>
            <div class="pay-option" onclick="selectPayment(this,'netbanking')">
              <div class="pay-icon">🏦</div>
              <div class="pay-label">Net Banking</div>
            </div>
            <div class="pay-option" onclick="selectPayment(this,'emi')">
              <div class="pay-icon">📅</div>
              <div class="pay-label">EMI</div>
            </div>
            <div class="pay-option" onclick="selectPayment(this,'cash')">
              <div class="pay-icon">💵</div>
              <div class="pay-label">Cash on Counter</div>
            </div>
          </div>

          <!-- UPI input -->
          <div class="upi-input-wrap" id="upiWrap">
            <input type="text" placeholder="Enter UPI ID (e.g. name@upi)" id="upiId">
          </div>

          <!-- Card inputs -->
          <div class="card-inputs" id="cardWrap">
            <input type="text" placeholder="Card Number" maxlength="19" id="cardNum"
              oninput="this.value=this.value.replace(/\D/g,'').replace(/(.{4})/g,'$1 ').trim()">
            <input type="text" placeholder="Cardholder Name" id="cardName">
            <div class="card-row">
              <input type="text" placeholder="MM/YY" maxlength="5" id="cardExpiry">
              <input type="text" placeholder="CVV" maxlength="3" id="cardCvv">
            </div>
          </div>

          <!-- Wallet -->
          <div class="upi-input-wrap" id="walletWrap">
            <select class="modal-select" id="walletSelect">
              <option>Paytm Wallet</option>
              <option>PhonePe Wallet</option>
              <option>Amazon Pay</option>
              <option>MobiKwik</option>
              <option>Freecharge</option>
            </select>
          </div>

          <!-- Net Banking -->
          <div class="upi-input-wrap" id="netbankWrap">
            <select class="modal-select" id="bankSelect">
              <option>SBI</option>
              <option>HDFC Bank</option>
              <option>ICICI Bank</option>
              <option>Axis Bank</option>
              <option>Kotak Mahindra Bank</option>
              <option>Bank of Baroda</option>
              <option>PNB</option>
            </select>
          </div>

          <!-- EMI -->
          <div class="upi-input-wrap" id="emiWrap">
            <select class="modal-select" id="emiSelect">
              <option>3 Months (0% interest)</option>
              <option>6 Months (1.5% interest)</option>
              <option>9 Months (2% interest)</option>
              <option>12 Months (2.5% interest)</option>
            </select>
          </div>
        </div>

        <button class="confirm-btn" onclick="confirmBooking()">🔒 CONFIRM & PAY</button>
      </div>

      <!-- SUCCESS SCREEN -->
      <div class="success-screen" id="modalSuccessScreen">
        <div class="success-icon">✅</div>
        <h3>Booking Confirmed!</h3>
        <p id="successMsg">Your ticket has been booked successfully.</p>
        <button onclick="goToTickets()">View My Tickets</button>
      </div>

    </div>
  </div>`;

  document.body.insertAdjacentHTML("beforeend", modalHTML);
});


/* ── State ── */
let _currentBooking = null;
let _counts = { adults: 1, kids: 0, infants: 0 };
let _selectedPayment = "upi";


/* ── Open Modal ── */
window.openBookingModal = function (bookingData) {
  _currentBooking = bookingData;
  _counts = { adults: 1, kids: 0, infants: 0 };
  _selectedPayment = "upi";

  document.getElementById("modalTitle").textContent    = bookingData.title    || "Book Ticket";
  document.getElementById("modalSubtitle").textContent = bookingData.subtitle || bookingData.route || "";
  document.getElementById("countAdults").textContent   = 1;
  document.getElementById("countKids").textContent     = 0;
  document.getElementById("countInfants").textContent  = 0;

  /* reset payment UI */
  document.querySelectorAll(".pay-option").forEach(p => p.classList.remove("active"));
  document.querySelector(".pay-option").classList.add("active");
  hideAllPayInputs();
  document.getElementById("upiWrap").style.display = "block";

  /* reset screens */
  document.getElementById("modalFormScreen").style.display   = "block";
  document.getElementById("modalSuccessScreen").style.display = "none";

  /* inject extras based on type */
  injectExtras(bookingData.type);

  /* show/hide meal */
  document.getElementById("mealSection").style.display =
    ["flight","train"].includes(bookingData.type) ? "block" : "none";

  updatePrice();

  document.getElementById("bookingModal").classList.add("active");
  document.body.style.overflow = "hidden";
};

window.closeModal = function () {
  document.getElementById("bookingModal").classList.remove("active");
  document.body.style.overflow = "";
};

/* close on overlay click */
document.addEventListener("click", function (e) {
  if (e.target.id === "bookingModal") closeModal();
});


/* ── Inject Extras ── */
function injectExtras(type) {
  const sec = document.getElementById("extrasSection");

  if (type === "bus") {
    sec.innerHTML = `
      <div class="modal-section">
        <div class="modal-section-title">🚌 Seat Type</div>
        <div class="option-pills">
          <div class="pill active" onclick="selectPill(this,'seat')">Sleeper</div>
          <div class="pill" onclick="selectPill(this,'seat')">Semi-Sleeper</div>
          <div class="pill" onclick="selectPill(this,'seat')">Seater</div>
        </div>
      </div>
      <div class="modal-section">
        <div class="modal-section-title">❄️ AC Preference</div>
        <div class="option-pills">
          <div class="pill active" onclick="selectPill(this,'ac')">AC</div>
          <div class="pill" onclick="selectPill(this,'ac')">Non-AC</div>
        </div>
      </div>
      <div class="modal-section">
        <div class="modal-section-title">🪟 Seat Position</div>
        <div class="option-pills">
          <div class="pill active" onclick="selectPill(this,'pos')">Window</div>
          <div class="pill" onclick="selectPill(this,'pos')">Aisle</div>
          <div class="pill" onclick="selectPill(this,'pos')">Any</div>
        </div>
      </div>`;
  }

  else if (type === "flight") {
    sec.innerHTML = `
      <div class="modal-section">
        <div class="modal-section-title">💺 Cabin Class</div>
        <div class="option-pills">
          <div class="pill active" onclick="selectPill(this,'cabin')">Economy</div>
          <div class="pill" onclick="selectPill(this,'cabin')">Premium Economy</div>
          <div class="pill" onclick="selectPill(this,'cabin')">Business</div>
          <div class="pill" onclick="selectPill(this,'cabin')">First Class</div>
        </div>
      </div>
      <div class="modal-section">
        <div class="modal-section-title">🪟 Seat Preference</div>
        <div class="option-pills">
          <div class="pill active" onclick="selectPill(this,'fpos')">Window</div>
          <div class="pill" onclick="selectPill(this,'fpos')">Aisle</div>
          <div class="pill" onclick="selectPill(this,'fpos')">Middle</div>
          <div class="pill" onclick="selectPill(this,'fpos')">Any</div>
        </div>
      </div>
      <div class="modal-section">
        <div class="modal-section-title">🧳 Baggage</div>
        <div class="option-pills">
          <div class="pill active" onclick="selectPill(this,'bag')">15 kg</div>
          <div class="pill" onclick="selectPill(this,'bag')">20 kg (+₹500)</div>
          <div class="pill" onclick="selectPill(this,'bag')">25 kg (+₹1000)</div>
          <div class="pill" onclick="selectPill(this,'bag')">30 kg (+₹1500)</div>
        </div>
      </div>`;
  }

  else if (type === "train") {
    sec.innerHTML = `
      <div class="modal-section">
        <div class="modal-section-title">🚆 Coach Class</div>
        <div class="option-pills">
          <div class="pill active" onclick="selectPill(this,'tclass')">Sleeper (SL)</div>
          <div class="pill" onclick="selectPill(this,'tclass')">3AC</div>
          <div class="pill" onclick="selectPill(this,'tclass')">2AC</div>
          <div class="pill" onclick="selectPill(this,'tclass')">1AC</div>
          <div class="pill" onclick="selectPill(this,'tclass')">2S</div>
        </div>
      </div>
      <div class="modal-section">
        <div class="modal-section-title">🛏️ Berth Preference</div>
        <div class="option-pills">
          <div class="pill active" onclick="selectPill(this,'berth')">Lower</div>
          <div class="pill" onclick="selectPill(this,'berth')">Middle</div>
          <div class="pill" onclick="selectPill(this,'berth')">Upper</div>
          <div class="pill" onclick="selectPill(this,'berth')">Side Lower</div>
          <div class="pill" onclick="selectPill(this,'berth')">Side Upper</div>
        </div>
      </div>
      <div class="modal-section">
        <div class="modal-section-title">🎫 Quota</div>
        <div class="option-pills">
          <div class="pill active" onclick="selectPill(this,'quota')">General</div>
          <div class="pill" onclick="selectPill(this,'quota')">Tatkal</div>
          <div class="pill" onclick="selectPill(this,'quota')">Senior Citizen</div>
          <div class="pill" onclick="selectPill(this,'quota')">Ladies</div>
        </div>
      </div>`;
  }

  else if (type === "hotel") {
    sec.innerHTML = `
      <div class="modal-section">
        <div class="modal-section-title">🛏️ Room Type</div>
        <div class="option-pills">
          <div class="pill active" onclick="selectPill(this,'room')">Standard</div>
          <div class="pill" onclick="selectPill(this,'room')">Deluxe</div>
          <div class="pill" onclick="selectPill(this,'room')">Suite</div>
          <div class="pill" onclick="selectPill(this,'room')">Presidential</div>
        </div>
      </div>
      <div class="modal-section">
        <div class="modal-section-title">🏨 No. of Rooms</div>
        <div class="counter-row">
          <div class="counter-label">Rooms</div>
          <div class="counter-btns">
            <button onclick="changeCount('rooms',-1)">−</button>
            <span class="counter-num" id="countRooms">1</span>
            <button onclick="changeCount('rooms',1)">+</button>
          </div>
        </div>
      </div>
      <div class="modal-section">
        <div class="modal-section-title">❄️ AC Preference</div>
        <div class="option-pills">
          <div class="pill active" onclick="selectPill(this,'hac')">AC Room</div>
          <div class="pill" onclick="selectPill(this,'hac')">Non-AC Room</div>
        </div>
      </div>
      <div class="modal-section">
        <div class="modal-section-title">🍳 Meal Plan</div>
        <div class="option-pills">
          <div class="pill active" onclick="selectPill(this,'meal')">Room Only</div>
          <div class="pill" onclick="selectPill(this,'meal')">Breakfast</div>
          <div class="pill" onclick="selectPill(this,'meal')">Half Board</div>
          <div class="pill" onclick="selectPill(this,'meal')">Full Board</div>
        </div>
      </div>`;
    if (!_counts.rooms) _counts.rooms = 1;
  }

  else {
    sec.innerHTML = "";
  }
}


/* ── Pill Selection ── */
window.selectPill = function (el, group) {
  el.closest(".option-pills").querySelectorAll(".pill").forEach(p => p.classList.remove("active"));
  el.classList.add("active");
  updatePrice();
};


/* ── Counter ── */
window.changeCount = function (type, delta) {
  const min = (type === "adults" || type === "rooms") ? 1 : 0;
  _counts[type] = Math.max(min, (_counts[type] || (type === "rooms" ? 1 : 0)) + delta);
  const el = document.getElementById("count" + type.charAt(0).toUpperCase() + type.slice(1));
  if (el) el.textContent = _counts[type];
  updatePrice();
};


/* ── Price Calculator ── */
function updatePrice() {
  if (!_currentBooking) return;

  const base     = _currentBooking.price || 0;
  const adults   = _counts.adults   || 1;
  const kids     = _counts.kids     || 0;
  const rooms    = _counts.rooms    || 1;

  let perUnit = base;

  /* cabin class uplift for flights */
  const cabinPill = document.querySelector("[onclick*=\"'cabin'\"].active");
  if (cabinPill) {
    const cabin = cabinPill.textContent.trim();
    if      (cabin === "Premium Economy") perUnit = base * 1.4;
    else if (cabin === "Business")        perUnit = base * 2.2;
    else if (cabin === "First Class")     perUnit = base * 3.5;
  }

  /* baggage uplift */
  const bagPill = document.querySelector("[onclick*=\"'bag'\"].active");
  let bagExtra = 0;
  if (bagPill) {
    const b = bagPill.textContent;
    if      (b.includes("20 kg")) bagExtra = 500;
    else if (b.includes("25 kg")) bagExtra = 1000;
    else if (b.includes("30 kg")) bagExtra = 1500;
  }

  /* train class uplift */
  const tclassPill = document.querySelector("[onclick*=\"'tclass'\"].active");
  if (tclassPill) {
    const tc = tclassPill.textContent.trim();
    if      (tc === "3AC") perUnit = base * 1.5;
    else if (tc === "2AC") perUnit = base * 2;
    else if (tc === "1AC") perUnit = base * 3;
    else if (tc === "2S")  perUnit = base * 0.6;
  }

  /* tatkal uplift */
  const quotaPill = document.querySelector("[onclick*=\"'quota'\"].active");
  if (quotaPill && quotaPill.textContent.trim() === "Tatkal") perUnit *= 1.3;

  /* hotel: rooms */
  const isHotel = _currentBooking.type === "hotel";
  const unitCount = isHotel ? rooms : adults;
  let subtotal = Math.round(perUnit * unitCount);
  if (!isHotel) subtotal += Math.round(perUnit * 0.5 * kids);
  subtotal += bagExtra;

  const tax   = Math.round(subtotal * 0.05);
  const total = subtotal + tax;

  document.getElementById("pBase").textContent  = "₹" + subtotal.toLocaleString("en-IN");
  document.getElementById("pTax").textContent   = "₹" + tax.toLocaleString("en-IN");
  document.getElementById("pTotal").textContent = "₹" + total.toLocaleString("en-IN");

  if (bagExtra > 0) {
    document.getElementById("pExtrasLabel").style.display = "inline";
    document.getElementById("pExtras").textContent        = "+₹" + bagExtra;
  } else {
    document.getElementById("pExtrasLabel").style.display = "none";
    document.getElementById("pExtras").textContent        = "";
  }
}


/* ── Payment Selection ── */
window.selectPayment = function (el, method) {
  document.querySelectorAll(".pay-option").forEach(p => p.classList.remove("active"));
  el.classList.add("active");
  _selectedPayment = method;
  hideAllPayInputs();
  if (method === "upi")        document.getElementById("upiWrap").style.display    = "block";
  if (method === "card")       document.getElementById("cardWrap").style.display   = "block";
  if (method === "wallet")     document.getElementById("walletWrap").style.display = "block";
  if (method === "netbanking") document.getElementById("netbankWrap").style.display= "block";
  if (method === "emi")        document.getElementById("emiWrap").style.display    = "block";
};

function hideAllPayInputs() {
  ["upiWrap","cardWrap","walletWrap","netbankWrap","emiWrap"]
    .forEach(id => document.getElementById(id).style.display = "none");
}


/* ── Confirm Booking ── */
window.confirmBooking = function () {
  /* basic validation */
  if (_selectedPayment === "upi") {
    const upi = document.getElementById("upiId").value.trim();
    if (!upi) { alert("Please enter your UPI ID"); return; }
  }
  if (_selectedPayment === "card") {
    const num  = document.getElementById("cardNum").value.trim();
    const name = document.getElementById("cardName").value.trim();
    const exp  = document.getElementById("cardExpiry").value.trim();
    const cvv  = document.getElementById("cardCvv").value.trim();
    if (!num || !name || !exp || !cvv) { alert("Please fill all card details"); return; }
  }

  /* save to localStorage */
  const tickets = JSON.parse(localStorage.getItem("tickets")) || [];
  const total   = document.getElementById("pTotal").textContent;

  const extras = {
    adults:   _counts.adults,
    kids:     _counts.kids,
    infants:  _counts.infants,
    payment:  _selectedPayment,
    total:    total
  };

  /* grab active pills */
  document.querySelectorAll(".option-pills .pill.active").forEach(p => {
    extras[p.closest(".modal-section").querySelector(".modal-section-title").textContent.replace(/[^a-zA-Z]/g,"")] = p.textContent.trim();
  });

  tickets.push({
    ..._currentBooking,
    ...extras,
    price:  total,
    booked: new Date().toLocaleString()
  });

  localStorage.setItem("tickets", JSON.stringify(tickets));

  /* show success */
  document.getElementById("modalFormScreen").style.display    = "none";
  document.getElementById("modalSuccessScreen").style.display = "block";
  document.getElementById("successMsg").textContent =
    `${_currentBooking.title} booked for ${_counts.adults} adult(s)` +
    (_counts.kids > 0 ? `, ${_counts.kids} child(ren)` : "") +
    `. Total paid: ${total} via ${_selectedPayment.toUpperCase()}.`;
};

window.goToTickets = function () {
  closeModal();
  window.location.href = "MT.html";
};