/* ============================================================
   TicketEasy — booking-modal.js
   Universal Booking Modal, Interactive Seat Picker & Multi-Payment Gateway
   ============================================================ */

document.addEventListener("DOMContentLoaded", function () {
  injectBookingModal();
});

function injectBookingModal() {
  if (document.getElementById("bookingModal")) return;

  const modalHTML = `
  <div class="modal-overlay" id="bookingModal">
    <div class="modal-box">
      <span class="modal-close" onclick="closeModal()">✕</span>

      <!-- FORM & PAYMENT SCREEN -->
      <div id="modalFormScreen">
        <div class="modal-title" id="modalTitle">Book Ticket</div>
        <div class="modal-subtitle" id="modalSubtitle">Select your preferences and complete secure checkout</div>

        <!-- TRAVELLERS & SEATS -->
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
        </div>

        <!-- VISUAL SEAT / ROOM SELECTION -->
        <div class="modal-section" id="seatSelectionSection">
          <div class="modal-section-title">💺 Interactive Seat Selection</div>
          <div class="seat-map-box">
            <div class="seat-legend">
              <div class="legend-item"><div class="seat-sample available"></div> Available</div>
              <div class="legend-item"><div class="seat-sample selected"></div> Selected</div>
              <div class="legend-item"><div class="seat-sample booked"></div> Booked</div>
            </div>
            <div class="seat-grid" id="seatGrid">
              <!-- Dynamically generated seat buttons -->
            </div>
          </div>
          <div style="font-size:12px; color:#94a3b8; text-align:center;" id="selectedSeatLabel">Selected Seat: <b>1A</b></div>
        </div>

        <!-- DYNAMIC EXTRAS (Cabin class, baggage, meal) -->
        <div id="extrasSection"></div>

        <!-- PROMO CODE SECTION -->
        <div class="modal-section">
          <div class="modal-section-title">🏷️ Promo Code / Coupon</div>
          <div style="display:flex; gap:8px;">
            <input type="text" placeholder="Enter coupon (e.g. EASYAI20, FESTIVE500)" id="promoCodeInput" style="text-transform:uppercase;">
            <button type="button" onclick="applyPromoCode()" style="padding:0 18px; background:var(--accent); border:none; border-radius:10px; color:white; font-weight:700; cursor:pointer;">Apply</button>
          </div>
          <div id="promoResult" style="font-size:12px; margin-top:6px; font-weight:600;"></div>
        </div>

        <!-- PRICE SUMMARY -->
        <div class="price-summary">
          <div class="price-row"><span>Base Fare</span><span id="pBase">₹0</span></div>
          <div class="price-row"><span id="pExtrasLabel" style="display:none">Extras & Upgrades</span><span id="pExtras">₹0</span></div>
          <div class="price-row" id="pDiscountRow" style="display:none; color:var(--emerald);"><span>Promo Discount</span><span id="pDiscount">-₹0</span></div>
          <div class="price-row"><span>Taxes & GST (5%)</span><span id="pTax">₹0</span></div>
          <div class="price-row total"><span>Total Payable</span><span id="pTotal" style="color:var(--primary);">₹0</span></div>
        </div>

        <!-- MULTI-METHOD PAYMENT SELECTION -->
        <div class="modal-section">
          <div class="modal-section-title">💳 Select Payment Method</div>
          <div class="payment-grid">
            <div class="pay-option active" onclick="selectPayment(this,'upi')">
              <div class="pay-icon">📲</div>
              <div class="pay-label">UPI / QR</div>
            </div>
            <div class="pay-option" onclick="selectPayment(this,'card')">
              <div class="pay-icon">💳</div>
              <div class="pay-label">Card</div>
            </div>
            <div class="pay-option" onclick="selectPayment(this,'netbanking')">
              <div class="pay-icon">🏦</div>
              <div class="pay-label">Net Banking</div>
            </div>
            <div class="pay-option" onclick="selectPayment(this,'wallet')">
              <div class="pay-icon">👛</div>
              <div class="pay-label">Wallet</div>
            </div>
            <div class="pay-option" onclick="selectPayment(this,'emi')">
              <div class="pay-icon">📅</div>
              <div class="pay-label">EMI</div>
            </div>
            <div class="pay-option" onclick="selectPayment(this,'cash')">
              <div class="pay-icon">💵</div>
              <div class="pay-label">Pay Later</div>
            </div>
          </div>

          <!-- UPI Section -->
          <div class="upi-input-wrap" id="upiWrap" style="display:block; margin-top:14px; text-align:center;">
            <div style="background:white; padding:12px; border-radius:12px; display:inline-block; margin-bottom:10px;">
              <svg width="120" height="120" viewBox="0 0 100 100">
                <rect width="100" height="100" fill="white"/>
                <!-- Simulated QR Code SVG pattern -->
                <rect x="10" y="10" width="30" height="30" fill="black"/><rect x="15" y="15" width="20" height="20" fill="white"/><rect x="20" y="20" width="10" height="10" fill="black"/>
                <rect x="60" y="10" width="30" height="30" fill="black"/><rect x="65" y="15" width="20" height="20" fill="white"/><rect x="70" y="20" width="10" height="10" fill="black"/>
                <rect x="10" y="60" width="30" height="30" fill="black"/><rect x="15" y="65" width="20" height="20" fill="white"/><rect x="20" y="70" width="10" height="10" fill="black"/>
                <rect x="45" y="45" width="10" height="10" fill="black"/><rect x="55" y="55" width="15" height="15" fill="black"/>
                <rect x="70" y="70" width="20" height="20" fill="black"/>
              </svg>
            </div>
            <div style="font-size:12px; color:var(--text-muted); margin-bottom:8px;">Scan QR Code or enter UPI ID</div>
            <input type="text" placeholder="Enter UPI ID (e.g. user@paytm)" id="upiId" value="ticketuser@upi">
          </div>

          <!-- Card Section -->
          <div class="card-inputs" id="cardWrap" style="display:none; margin-top:14px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
              <span style="font-size:12px; color:var(--text-muted);">Card Details</span>
              <span id="cardBrandLogo" style="font-weight:700; font-size:12px; color:var(--primary);">VISA / MasterCard</span>
            </div>
            <input type="text" placeholder="Card Number (16 Digits)" maxlength="19" id="cardNum" value="4532 8912 7741 0923" oninput="formatCardNum(this)">
            <input type="text" placeholder="Cardholder Name" id="cardName" value="Yogendar Verma">
            <div class="card-row">
              <input type="text" placeholder="MM/YY" maxlength="5" id="cardExpiry" value="08/28">
              <input type="text" placeholder="CVV" maxlength="3" id="cardCvv" value="882">
            </div>
          </div>

          <!-- Net Banking -->
          <div class="upi-input-wrap" id="netbankWrap" style="display:none; margin-top:14px;">
            <label>Select Bank</label>
            <select class="modal-select" id="bankSelect">
              <option>HDFC Bank</option>
              <option>State Bank of India (SBI)</option>
              <option>ICICI Bank</option>
              <option>Axis Bank</option>
              <option>Kotak Mahindra Bank</option>
              <option>Bank of Baroda</option>
              <option>Punjab National Bank</option>
            </select>
          </div>

          <!-- Wallet -->
          <div class="upi-input-wrap" id="walletWrap" style="display:none; margin-top:14px;">
            <label>Select Wallet Provider</label>
            <select class="modal-select" id="walletSelect">
              <option>Paytm Wallet (Balance: ₹4,500)</option>
              <option>PhonePe Wallet</option>
              <option>Amazon Pay Balance</option>
              <option>MobiKwik Wallet</option>
            </select>
          </div>

          <!-- EMI -->
          <div class="upi-input-wrap" id="emiWrap" style="display:none; margin-top:14px;">
            <label>Choose EMI Plan</label>
            <select class="modal-select" id="emiSelect">
              <option>3 Months (No Cost EMI)</option>
              <option>6 Months @ 1.2% Interest</option>
              <option>12 Months @ 2.0% Interest</option>
            </select>
          </div>
        </div>

        <button class="confirm-btn" id="paySubmitBtn" onclick="initiatePaymentProcess()">🔒 PAY & SECURE TICKET</button>
      </div>

      <!-- 3D SECURE OTP SIMULATION SCREEN -->
      <div id="otpModalScreen" style="display:none; text-align:center; padding:20px 0;">
        <div style="font-size:40px; margin-bottom:10px;">🔐</div>
        <h3>3D Secure Bank Verification</h3>
        <p style="font-size:13px; color:var(--text-muted); margin:8px 0 20px 0;">An OTP has been sent to your registered mobile number ending in <b>*9842</b></p>
        <input type="text" placeholder="Enter 6-digit OTP (Default: 123456)" id="otpInput" style="width:200px; text-align:center; font-size:20px; letter-spacing:4px;" value="123456">
        <br><br>
        <button class="confirm-btn" onclick="verifyOTPAndComplete()">VERIFY & COMPLETE PAYMENT</button>
      </div>

      <!-- SUCCESS SCREEN -->
      <div class="success-screen" id="modalSuccessScreen" style="display:none; text-align:center; padding:20px 0;">
        <div style="font-size:64px; margin-bottom:12px;">✅</div>
        <h3 style="color:var(--emerald); font-size:24px;">Booking Confirmed!</h3>
        <div style="font-size:14px; color:var(--primary); margin-bottom:6px; font-weight:700;" id="successPNR">PNR: TE-894215</div>
        <p id="successMsg" style="font-size:13px; color:var(--text-muted); margin-bottom:20px;">Your ticket has been booked successfully.</p>
        
        <div style="display:flex; gap:10px; justify-content:center;">
          <button class="confirm-btn" style="width:auto; padding:12px 24px;" onclick="goToTickets()">View My Tickets</button>
          <button class="action-btn" style="width:auto; padding:12px 24px; background:rgba(255,255,255,0.1);" onclick="closeModal()">Close</button>
        </div>
      </div>

    </div>
  </div>`;

  document.body.insertAdjacentHTML("beforeend", modalHTML);
}

/* Modal State */
let _currentBooking = null;
let _counts = { adults: 1, kids: 0 };
let _selectedSeat = "1A";
let _selectedPayment = "upi";
let _appliedDiscount = 0;

window.openBookingModal = function (bookingData) {
  _currentBooking = bookingData;
  _counts = { adults: 1, kids: 0 };
  _selectedSeat = "1A";
  _selectedPayment = "upi";
  _appliedDiscount = 0;

  document.getElementById("modalTitle").textContent = bookingData.title || bookingData.name || "Book Ticket";
  document.getElementById("modalSubtitle").textContent = bookingData.route || bookingData.subtitle || "Complete details below";
  
  document.getElementById("countAdults").textContent = 1;
  document.getElementById("countKids").textContent = 0;
  document.getElementById("promoResult").textContent = "";
  document.getElementById("promoCodeInput").value = "";

  // Render Seats Grid
  renderSeatGrid(bookingData.type);

  // Render Extras
  renderExtras(bookingData.type);

  // Reset payment selection UI
  document.querySelectorAll(".pay-option").forEach(p => p.classList.remove("active"));
  document.querySelector(".pay-option")?.classList.add("active");
  hidePayInputs();
  document.getElementById("upiWrap").style.display = "block";

  // Screens toggle
  document.getElementById("modalFormScreen").style.display = "block";
  document.getElementById("otpModalScreen").style.display = "none";
  document.getElementById("modalSuccessScreen").style.display = "none";

  updatePrice();

  document.getElementById("bookingModal").classList.add("active");
  document.body.style.overflow = "hidden";
};

window.closeModal = function () {
  const modal = document.getElementById("bookingModal");
  if (modal) modal.classList.remove("active");
  document.body.style.overflow = "";
};

function renderSeatGrid(type) {
  const grid = document.getElementById("seatGrid");
  if (!grid) return;
  grid.innerHTML = "";

  const seats = ["1A", "1B", "1C", "1D", "2A", "2B", "2C", "2D", "3A", "3B", "3C", "3D"];
  const bookedSeats = ["1C", "2B", "3D"];

  seats.forEach(seat => {
    const isBooked = bookedSeats.includes(seat);
    const btn = document.createElement("button");
    btn.className = `seat-btn ${isBooked ? "booked" : (seat === _selectedSeat ? "selected" : "")}`;
    btn.textContent = seat;
    if (!isBooked) {
      btn.onclick = () => {
        document.querySelectorAll(".seat-btn").forEach(s => s.classList.remove("selected"));
        btn.classList.add("selected");
        _selectedSeat = seat;
        document.getElementById("selectedSeatLabel").innerHTML = `Selected Seat: <b>${seat}</b>`;
      };
    }
    grid.appendChild(btn);
  });
}

function renderExtras(type) {
  const sec = document.getElementById("extrasSection");
  if (!sec) return;

  if (type === "flight") {
    sec.innerHTML = `
      <div class="modal-section">
        <div class="modal-section-title">💺 Cabin Class</div>
        <div class="option-pills">
          <div class="pill active" onclick="selectPill(this)">Economy</div>
          <div class="pill" onclick="selectPill(this)">Business (+₹4,000)</div>
          <div class="pill" onclick="selectPill(this)">First Class (+₹8,000)</div>
        </div>
      </div>
      <div class="modal-section">
        <div class="modal-section-title">🍽️ In-Flight Meal</div>
        <div class="option-pills">
          <div class="pill active" onclick="selectPill(this)">Veg Meal</div>
          <div class="pill" onclick="selectPill(this)">Non-Veg (+₹350)</div>
          <div class="pill" onclick="selectPill(this)">Jain Meal</div>
        </div>
      </div>`;
  } else if (type === "bus") {
    sec.innerHTML = `
      <div class="modal-section">
        <div class="modal-section-title">🚌 Bus Class</div>
        <div class="option-pills">
          <div class="pill active" onclick="selectPill(this)">AC Sleeper</div>
          <div class="pill" onclick="selectPill(this)">Volvo Multi-Axle (+₹200)</div>
        </div>
      </div>`;
  } else {
    sec.innerHTML = "";
  }
}

window.selectPill = function (el) {
  el.closest(".option-pills").querySelectorAll(".pill").forEach(p => p.classList.remove("active"));
  el.classList.add("active");
  updatePrice();
};

window.changeCount = function (type, delta) {
  const min = type === "adults" ? 1 : 0;
  _counts[type] = Math.max(min, _counts[type] + delta);
  document.getElementById(type === "adults" ? "countAdults" : "countKids").textContent = _counts[type];
  updatePrice();
};

window.applyPromoCode = function () {
  const code = document.getElementById("promoCodeInput").value.trim().toUpperCase();
  const res = document.getElementById("promoResult");

  if (code === "EASYAI20") {
    _appliedDiscount = 0.20;
    res.style.color = "var(--emerald)";
    res.textContent = "✓ Coupon EASYAI20 applied! 20% discount added.";
  } else if (code === "FESTIVE500") {
    _appliedDiscount = 500;
    res.style.color = "var(--emerald)";
    res.textContent = "✓ Coupon FESTIVE500 applied! ₹500 discount added.";
  } else {
    _appliedDiscount = 0;
    res.style.color = "var(--rose)";
    res.textContent = "✕ Invalid promo code. Try EASYAI20 or FESTIVE500.";
  }
  updatePrice();
};

function updatePrice() {
  if (!_currentBooking) return;

  const basePrice = _currentBooking.price || 1200;
  const adults = _counts.adults || 1;
  const kids = _counts.kids || 0;

  let subtotal = (basePrice * adults) + (basePrice * 0.6 * kids);

  // Check extra pill uplifts
  document.querySelectorAll(".pill.active").forEach(p => {
    if (p.textContent.includes("+₹4,000")) subtotal += 4000;
    if (p.textContent.includes("+₹8,000")) subtotal += 8000;
    if (p.textContent.includes("+₹350")) subtotal += 350;
    if (p.textContent.includes("+₹200")) subtotal += 200;
  });

  let discount = 0;
  if (_appliedDiscount > 0 && _appliedDiscount < 1) {
    discount = Math.round(subtotal * _appliedDiscount);
  } else if (_appliedDiscount >= 1) {
    discount = _appliedDiscount;
  }

  const taxable = Math.max(0, subtotal - discount);
  const tax = Math.round(taxable * 0.05);
  const total = taxable + tax;

  document.getElementById("pBase").textContent = "₹" + Math.round(subtotal).toLocaleString("en-IN");
  document.getElementById("pTax").textContent = "₹" + tax.toLocaleString("en-IN");

  const discRow = document.getElementById("pDiscountRow");
  if (discount > 0) {
    discRow.style.display = "flex";
    document.getElementById("pDiscount").textContent = "-₹" + discount.toLocaleString("en-IN");
  } else {
    discRow.style.display = "none";
  }

  document.getElementById("pTotal").textContent = "₹" + total.toLocaleString("en-IN");
}

window.selectPayment = function (el, method) {
  document.querySelectorAll(".pay-option").forEach(p => p.classList.remove("active"));
  el.classList.add("active");
  _selectedPayment = method;
  hidePayInputs();

  if (method === "upi") document.getElementById("upiWrap").style.display = "block";
  if (method === "card") document.getElementById("cardWrap").style.display = "block";
  if (method === "netbanking") document.getElementById("netbankWrap").style.display = "block";
  if (method === "wallet") document.getElementById("walletWrap").style.display = "block";
  if (method === "emi") document.getElementById("emiWrap").style.display = "block";
};

function hidePayInputs() {
  ["upiWrap", "cardWrap", "netbankWrap", "walletWrap", "emiWrap"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = "none";
  });
}

window.formatCardNum = function (input) {
  let val = input.value.replace(/\D/g, '');
  input.value = val.replace(/(.{4})/g, '$1 ').trim();
};

window.initiatePaymentProcess = function () {
  if (_selectedPayment === "card") {
    // Show 3D Secure OTP verification for Card
    document.getElementById("modalFormScreen").style.display = "none";
    document.getElementById("otpModalScreen").style.display = "block";
  } else {
    completeBooking();
  }
};

window.verifyOTPAndComplete = function () {
  completeBooking();
};

function completeBooking() {
  const pnr = "TE-" + Math.floor(100000 + Math.random() * 900000);
  const totalPaid = document.getElementById("pTotal").textContent;

  const newTicket = {
    pnr: pnr,
    name: _currentBooking.name || _currentBooking.title || "Ticket",
    type: _currentBooking.type || "Travel",
    route: _currentBooking.route || "Destination",
    seat: _selectedSeat,
    travellers: `${_counts.adults} Adult(s)` + (_counts.kids > 0 ? `, ${_counts.kids} Child(ren)` : ""),
    paymentMethod: _selectedPayment.toUpperCase(),
    price: totalPaid,
    date: _currentBooking.date || new Date().toLocaleDateString(),
    bookedAt: new Date().toLocaleString()
  };

  const tickets = JSON.parse(localStorage.getItem("tickets")) || [];
  tickets.unshift(newTicket);
  localStorage.setItem("tickets", JSON.stringify(tickets));

  document.getElementById("modalFormScreen").style.display = "none";
  document.getElementById("otpModalScreen").style.display = "none";
  document.getElementById("modalSuccessScreen").style.display = "block";
  document.getElementById("successPNR").textContent = "PNR: " + pnr;
  document.getElementById("successMsg").textContent = `Booked for ${newTicket.travellers} (Seat ${_selectedSeat}). Total paid: ${totalPaid} via ${_selectedPayment.toUpperCase()}.`;
}

window.goToTickets = function () {
  closeModal();
  window.location.href = "MT.html";
};