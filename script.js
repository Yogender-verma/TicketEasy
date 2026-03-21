/* ============================================================
   TicketEasy — scripts.js
   ============================================================ */

/* ── 1. SLIDESHOW ── */
(function initSlideshow() {
  const slidesEl = document.getElementById("slides");
  if (!slidesEl) return;
  const dots = document.querySelectorAll(".dot");
  const total = slidesEl.children.length;
  let index = 0;

  function showSlide() {
    slidesEl.style.transform = "translateX(-" + index * 100 + "%)";
    dots.forEach(d => d.classList.remove("active"));
    dots[index].classList.add("active");
  }

  window.nextSlide = function () { index = (index + 1) % total; showSlide(); };
  window.prevSlide = function () { index = (index - 1 + total) % total; showSlide(); };
  window.goToSlide = function (i) { index = i; showSlide(); };

  setInterval(window.nextSlide, 3000);
  showSlide();
})();


/* ── 2. BUS SEARCH ── */
window.searchBuses = function () {
  const from = document.getElementById("fromCity")?.value;
  const to   = document.getElementById("toCity")?.value;
  const date = document.getElementById("journeyDate")?.value;
  window.location.href = "busticket.html?from=" + encodeURIComponent(from) + "&to=" + encodeURIComponent(to) + "&date=" + date;
};
window.openRoute = function (from, to) {
  window.location.href = "busticket.html?from=" + encodeURIComponent(from) + "&to=" + encodeURIComponent(to);
};


/* ── 3. FLIGHT SEARCH ── */
window.searchFlights = function () {
  const from   = document.getElementById("fromCity")?.value;
  const to     = document.getElementById("toCity")?.value;
  const depart = document.getElementById("departDate")?.value;
  const ret    = document.getElementById("returnDate")?.value;
  const people = document.getElementById("travellers")?.value;
  window.location.href = "flightticket.html?from=" + encodeURIComponent(from) + "&to=" + encodeURIComponent(to) + "&depart=" + depart + "&return=" + ret + "&travellers=" + encodeURIComponent(people);
};
window.goRoute = function (from, to) {
  window.location.href = "flightticket.html?from=" + encodeURIComponent(from) + "&to=" + encodeURIComponent(to);
};


/* ── 4. TRAIN SEARCH ── */
window.searchTrains = function () {
  const from  = document.getElementById("fromStation")?.value;
  const to    = document.getElementById("toStation")?.value;
  const date  = document.getElementById("journeyDate")?.value;
  const cls   = document.getElementById("trainClass")?.value;
  const quota = document.getElementById("quota")?.value;
  window.location.href = "trainticket.html?from=" + encodeURIComponent(from) + "&to=" + encodeURIComponent(to) + "&date=" + date + "&class=" + encodeURIComponent(cls) + "&quota=" + encodeURIComponent(quota);
};
window.bookTrain = function (from, to) {
  window.location.href = "trainticket.html?from=" + encodeURIComponent(from) + "&to=" + encodeURIComponent(to);
};


/* ── 5. HOTEL SEARCH ── */
window.searchHotels = function () {
  const dest     = document.getElementById("destination")?.value;
  const checkin  = document.getElementById("checkin")?.value;
  const checkout = document.getElementById("checkout")?.value;
  const guests   = document.getElementById("guests")?.value;
  const rooms    = document.getElementById("rooms")?.value;
  window.location.href = "hotelticket.html?destination=" + encodeURIComponent(dest) + "&checkin=" + checkin + "&checkout=" + checkout + "&guests=" + encodeURIComponent(guests) + "&rooms=" + encodeURIComponent(rooms);
};
window.bookHotel = function (city) {
  window.location.href = "hotelticket.html?destination=" + encodeURIComponent(city);
};


/* ── 6. BUS TICKET RESULTS ── */
(function initBusTickets() {
  const container = document.getElementById("busContainer");
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  let from = params.get("from") || "Hyderabad";
  let to   = params.get("to")   || "Vijayawada";
  let date = params.get("date") || "Today";
  if (from === "Select Source City")      from = "Hyderabad";
  if (to   === "Select Destination City") to   = "Vijayawada";

  const titleEl = document.getElementById("routeTitle");
  if (titleEl) titleEl.innerHTML = "Buses : " + from + " → " + to + " | Date : " + date;

  const buses = [
    {route:"Hyderabad_Vijayawada",name:"APSRTC Garuda Plus",type:"AC Sleeper",time:"05:30 AM",price:799},
    {route:"Hyderabad_Vijayawada",name:"APSRTC Super Luxury",type:"Non AC Sleeper",time:"06:30 AM",price:650},
    {route:"Hyderabad_Vijayawada",name:"APSRTC Double Decker",type:"AC Seater",time:"07:30 AM",price:720},
    {route:"Hyderabad_Vijayawada",name:"VRL Travels",type:"AC Sleeper",time:"09:30 AM",price:950},
    {route:"Hyderabad_Vijayawada",name:"Orange Travels",type:"AC Sleeper",time:"12:30 PM",price:980},
    {route:"Hyderabad_Vijayawada",name:"SRS Volvo",type:"AC Sleeper",time:"02:30 PM",price:1100},
    {route:"Hyderabad_Vijayawada",name:"Morning Star",type:"AC Sleeper",time:"04:30 PM",price:1050},
    {route:"Hyderabad_Vijayawada",name:"SVR Travels",type:"Non AC Sleeper",time:"06:30 PM",price:720},
    {route:"Hyderabad_Vijayawada",name:"Kaveri Travels",type:"AC Sleeper",time:"09:30 PM",price:900},
    {route:"Hyderabad_Vijayawada",name:"GreenLine Travels",type:"AC Sleeper",time:"11:30 PM",price:950},
    {route:"Vijayawada_Hyderabad",name:"APSRTC Garuda Plus",type:"AC Sleeper",time:"05:30 AM",price:799},
    {route:"Vijayawada_Hyderabad",name:"APSRTC Super Luxury",type:"Non AC Sleeper",time:"06:30 AM",price:650},
    {route:"Vijayawada_Hyderabad",name:"APSRTC Double Decker",type:"AC Seater",time:"07:30 AM",price:720},
    {route:"Vijayawada_Hyderabad",name:"VRL Travels",type:"AC Sleeper",time:"09:30 AM",price:950},
    {route:"Vijayawada_Hyderabad",name:"Orange Travels",type:"AC Sleeper",time:"12:30 PM",price:980},
    {route:"Vijayawada_Hyderabad",name:"SRS Volvo",type:"AC Sleeper",time:"02:30 PM",price:1100},
    {route:"Vijayawada_Hyderabad",name:"Morning Star",type:"AC Sleeper",time:"04:30 PM",price:1050},
    {route:"Vijayawada_Hyderabad",name:"SVR Travels",type:"Non AC Sleeper",time:"06:30 PM",price:720},
    {route:"Vijayawada_Hyderabad",name:"Kaveri Travels",type:"AC Sleeper",time:"09:30 PM",price:900},
    {route:"Vijayawada_Hyderabad",name:"GreenLine Travels",type:"AC Sleeper",time:"11:30 PM",price:950},
    {route:"Bengaluru_Mysore",name:"KSRTC Airavat",type:"Volvo AC",time:"05:30 AM",price:450},
    {route:"Bengaluru_Mysore",name:"KSRTC Rajahamsa",type:"Non AC",time:"07:00 AM",price:350},
    {route:"Bengaluru_Mysore",name:"KSRTC Double Decker",type:"AC Seater",time:"08:30 AM",price:500},
    {route:"Bengaluru_Mysore",name:"VRL Travels",type:"AC Sleeper",time:"10:30 AM",price:650},
    {route:"Bengaluru_Mysore",name:"Orange Travels",type:"AC Sleeper",time:"12:30 PM",price:720},
    {route:"Bengaluru_Mysore",name:"SRS Volvo",type:"AC Sleeper",time:"02:30 PM",price:700},
    {route:"Bengaluru_Mysore",name:"Morning Star",type:"AC Sleeper",time:"04:30 PM",price:750},
    {route:"Bengaluru_Mysore",name:"SVR Travels",type:"Non AC Sleeper",time:"06:30 PM",price:620},
    {route:"Bengaluru_Mysore",name:"Kaveri Travels",type:"AC Sleeper",time:"08:30 PM",price:680},
    {route:"Bengaluru_Mysore",name:"GreenLine Travels",type:"AC Sleeper",time:"10:30 PM",price:720},
    {route:"Mysore_Bengaluru",name:"KSRTC Airavat",type:"Volvo AC",time:"05:30 AM",price:450},
    {route:"Mysore_Bengaluru",name:"KSRTC Rajahamsa",type:"Non AC",time:"07:00 AM",price:350},
    {route:"Mysore_Bengaluru",name:"KSRTC Double Decker",type:"AC Seater",time:"08:30 AM",price:500},
    {route:"Mysore_Bengaluru",name:"VRL Travels",type:"AC Sleeper",time:"10:30 AM",price:650},
    {route:"Mysore_Bengaluru",name:"Orange Travels",type:"AC Sleeper",time:"12:30 PM",price:720},
    {route:"Mysore_Bengaluru",name:"SRS Volvo",type:"AC Sleeper",time:"02:30 PM",price:700},
    {route:"Mysore_Bengaluru",name:"Morning Star",type:"AC Sleeper",time:"04:30 PM",price:750},
    {route:"Mysore_Bengaluru",name:"SVR Travels",type:"Non AC Sleeper",time:"06:30 PM",price:620},
    {route:"Mysore_Bengaluru",name:"Kaveri Travels",type:"AC Sleeper",time:"08:30 PM",price:680},
    {route:"Mysore_Bengaluru",name:"GreenLine Travels",type:"AC Sleeper",time:"10:30 PM",price:720},
    {route:"Chennai_Coimbatore",name:"TNSTC Sleeper",type:"Non AC Sleeper",time:"05:30 AM",price:700},
    {route:"Chennai_Coimbatore",name:"TNSTC AC Sleeper",type:"AC Sleeper",time:"07:00 AM",price:820},
    {route:"Chennai_Coimbatore",name:"TNSTC Deluxe",type:"AC Seater",time:"08:30 AM",price:760},
    {route:"Chennai_Coimbatore",name:"KPN Travels",type:"AC Sleeper",time:"10:30 AM",price:950},
    {route:"Chennai_Coimbatore",name:"Parveen Travels",type:"Volvo AC",time:"12:30 PM",price:1000},
    {route:"Chennai_Coimbatore",name:"SRS Volvo",type:"AC Sleeper",time:"02:30 PM",price:1050},
    {route:"Chennai_Coimbatore",name:"YBM Travels",type:"AC Sleeper",time:"04:30 PM",price:990},
    {route:"Chennai_Coimbatore",name:"SMS Travels",type:"Non AC Sleeper",time:"06:30 PM",price:850},
    {route:"Chennai_Coimbatore",name:"Kaveri Travels",type:"AC Sleeper",time:"08:30 PM",price:900},
    {route:"Chennai_Coimbatore",name:"GreenLine Travels",type:"AC Sleeper",time:"10:30 PM",price:950},
    {route:"Coimbatore_Chennai",name:"TNSTC Sleeper",type:"Non AC Sleeper",time:"05:30 AM",price:700},
    {route:"Coimbatore_Chennai",name:"TNSTC AC Sleeper",type:"AC Sleeper",time:"07:00 AM",price:820},
    {route:"Coimbatore_Chennai",name:"TNSTC Deluxe",type:"AC Seater",time:"08:30 AM",price:760},
    {route:"Coimbatore_Chennai",name:"KPN Travels",type:"AC Sleeper",time:"10:30 AM",price:950},
    {route:"Coimbatore_Chennai",name:"Parveen Travels",type:"Volvo AC",time:"12:30 PM",price:1000},
    {route:"Coimbatore_Chennai",name:"SRS Volvo",type:"AC Sleeper",time:"02:30 PM",price:1050},
    {route:"Coimbatore_Chennai",name:"YBM Travels",type:"AC Sleeper",time:"04:30 PM",price:990},
    {route:"Coimbatore_Chennai",name:"SMS Travels",type:"Non AC Sleeper",time:"06:30 PM",price:850},
    {route:"Coimbatore_Chennai",name:"Kaveri Travels",type:"AC Sleeper",time:"08:30 PM",price:900},
    {route:"Coimbatore_Chennai",name:"GreenLine Travels",type:"AC Sleeper",time:"10:30 PM",price:950},
    {route:"Hyderabad_Mumbai",name:"SRS Volvo",type:"AC Sleeper",time:"06:00 PM",price:550},
    {route:"Mumbai_Hyderabad",name:"SRS Volvo",type:"AC Sleeper",time:"06:00 PM",price:550},
    {route:"Hyderabad_Bengaluru",name:"VRL Travels",type:"AC Sleeper",time:"08:00 PM",price:650},
    {route:"Bengaluru_Hyderabad",name:"VRL Travels",type:"AC Sleeper",time:"08:00 PM",price:650},
    {route:"Mumbai_Pune",name:"RSRTC Deluxe",type:"Deluxe",time:"07:00 AM",price:550},
    {route:"Pune_Mumbai",name:"RSRTC Deluxe",type:"Deluxe",time:"07:00 AM",price:550},
    {route:"Ahmedabad_Vadodara",name:"GSRTC Express",type:"Non AC",time:"06:00 AM",price:180},
    {route:"Vadodara_Ahmedabad",name:"GSRTC Express",type:"Non AC",time:"06:00 AM",price:180}
  ];

  const available = buses.filter(b => b.route === from + "_" + to);
  if (available.length === 0) {
    container.innerHTML = "<p style='text-align:center;margin-top:30px'>No buses found for this route.</p>";
    return;
  }

  available.forEach(bus => {
    const card = document.createElement("div");
    card.className = "bus-card";
    card.innerHTML = `
      <div class="bus-info">
        <div class="bus-name">${bus.name}</div>
        ${bus.type}<br>Departure : ${bus.time}
      </div>
      <div>
        <div class="bus-price">₹${bus.price}</div>
        <button class="book-btn" onclick='bookBusTicket(${JSON.stringify(bus)})'>Book Ticket</button>
      </div>`;
    container.appendChild(card);
  });

  window.bookBusTicket = function (bus) {
    const tickets = JSON.parse(localStorage.getItem("tickets")) || [];
    tickets.push({ type:"Bus Ticket", name:bus.name, route:from+" → "+to, busType:bus.type, departure:bus.time, date:date, price:bus.price, booked:new Date().toLocaleString() });
    localStorage.setItem("tickets", JSON.stringify(tickets));
    window.location.href = "MT.html";
  };
})();


/* ── 7. FLIGHT TICKET RESULTS ── */
(function initFlightTickets() {
  const goingDiv  = document.getElementById("goingFlights");
  const returnDiv = document.getElementById("returnFlights");
  if (!goingDiv) return;

  const params   = new URLSearchParams(window.location.search);
  let from       = params.get("from")       || "Hyderabad";
  let to         = params.get("to")         || "Dubai";
  let depart     = params.get("depart")     || "Today";
  let travellers = params.get("travellers") || "1 Adult";

  const headerEl = document.getElementById("routeHeader");
  if (headerEl) headerEl.innerHTML = "Route : " + from + " → " + to + " | Departure : " + depart + " | Travellers : " + travellers;

  const flights = [
    {route:"Hyderabad_Dubai",name:"Emirates",number:"EK525",departure:"05:30 AM",arrival:"08:15 AM",price:18500},
    {route:"Hyderabad_Dubai",name:"Air India",number:"AI951",departure:"09:45 AM",arrival:"12:30 PM",price:16500},
    {route:"Hyderabad_Dubai",name:"IndiGo",number:"6E1403",departure:"02:30 PM",arrival:"05:20 PM",price:15000},
    {route:"Hyderabad_Dubai",name:"SpiceJet",number:"SG107",departure:"08:00 PM",arrival:"10:45 PM",price:14800},
    {route:"Dubai_Hyderabad",name:"Emirates",number:"EK524",departure:"06:00 AM",arrival:"11:30 AM",price:18500},
    {route:"Dubai_Hyderabad",name:"Air India",number:"AI952",departure:"10:00 AM",arrival:"03:20 PM",price:16500},
    {route:"Dubai_Hyderabad",name:"IndiGo",number:"6E1404",departure:"03:30 PM",arrival:"08:40 PM",price:15000},
    {route:"Dubai_Hyderabad",name:"SpiceJet",number:"SG108",departure:"09:30 PM",arrival:"02:50 AM",price:14800},
    {route:"Delhi_London",name:"British Airways",number:"BA256",departure:"04:30 AM",arrival:"09:00 AM",price:48000},
    {route:"Delhi_London",name:"Air India",number:"AI111",departure:"08:30 AM",arrival:"01:30 PM",price:45000},
    {route:"Delhi_London",name:"Virgin Atlantic",number:"VS301",departure:"01:30 PM",arrival:"06:30 PM",price:47000},
    {route:"Delhi_London",name:"Emirates",number:"EK004",departure:"10:00 PM",arrival:"04:30 AM",price:49000},
    {route:"London_Delhi",name:"British Airways",number:"BA257",departure:"10:00 AM",arrival:"11:30 PM",price:48000},
    {route:"London_Delhi",name:"Air India",number:"AI112",departure:"02:30 PM",arrival:"04:00 AM",price:45000},
    {route:"London_Delhi",name:"Virgin Atlantic",number:"VS302",departure:"07:00 PM",arrival:"08:30 AM",price:47000},
    {route:"London_Delhi",name:"Emirates",number:"EK005",departure:"11:30 PM",arrival:"12:30 PM",price:49000},
    {route:"Mumbai_Singapore",name:"Singapore Airlines",number:"SQ421",departure:"06:30 AM",arrival:"02:00 PM",price:28000},
    {route:"Mumbai_Singapore",name:"Air India",number:"AI342",departure:"09:30 AM",arrival:"05:00 PM",price:25000},
    {route:"Mumbai_Singapore",name:"IndiGo",number:"6E1001",departure:"02:30 PM",arrival:"10:00 PM",price:23000},
    {route:"Mumbai_Singapore",name:"Vistara",number:"UK101",departure:"09:30 PM",arrival:"05:30 AM",price:26000},
    {route:"Singapore_Mumbai",name:"Singapore Airlines",number:"SQ422",departure:"07:30 AM",arrival:"01:30 PM",price:28000},
    {route:"Singapore_Mumbai",name:"Air India",number:"AI343",departure:"11:00 AM",arrival:"05:30 PM",price:25000},
    {route:"Singapore_Mumbai",name:"IndiGo",number:"6E1002",departure:"04:00 PM",arrival:"10:30 PM",price:23000},
    {route:"Singapore_Mumbai",name:"Vistara",number:"UK102",departure:"10:30 PM",arrival:"04:30 AM",price:26000}
  ];

  const going     = flights.filter(f => f.route === from + "_" + to);
  const returning = flights.filter(f => f.route === to + "_" + from);

  window.bookFlightTicket = function (flight) {
    const tickets = JSON.parse(localStorage.getItem("tickets")) || [];
    tickets.push({ name:flight.name, number:flight.number, route:from+" → "+to, departure:flight.departure, arrival:flight.arrival, travellers, price:flight.price, date:new Date().toLocaleString() });
    localStorage.setItem("tickets", JSON.stringify(tickets));
    alert("Ticket Booked Successfully!");
  };

  function renderFlights(list, el) {
    if (list.length === 0) { el.innerHTML = "<p style='text-align:center'>No flights found</p>"; return; }
    list.forEach(f => {
      const card = document.createElement("div");
      card.className = "flight-card";
      card.innerHTML = `
        <div class="flight-info">
          <div class="flight-name">${f.name} (${f.number})</div>
          Departure : ${f.departure}<br>Arrival : ${f.arrival}<br>Travellers : ${travellers}
        </div>
        <div>
          <div class="price">₹${f.price}</div>
          <button class="book-btn" onclick='bookFlightTicket(${JSON.stringify(f)})'>Book Ticket</button>
        </div>`;
      el.appendChild(card);
    });
  }

  renderFlights(going, goingDiv);
  renderFlights(returning, returnDiv);
})();


/* ── 8. TRAIN TICKET RESULTS ── */
(function initTrainTickets() {
  const goingDiv  = document.getElementById("goingTrains");
  const returnDiv = document.getElementById("returnTrains");
  if (!goingDiv) return;

  const params   = new URLSearchParams(window.location.search);
  let from       = params.get("from")   || "Secunderabad (SC)";
  let to         = params.get("to")     || "Vijayawada (BZA)";
  let date       = params.get("date")   || "Today";
  let trainClass = params.get("class")  || "All Classes";
  let quota      = params.get("quota")  || "General";

  const headerEl = document.getElementById("routeHeader");
  if (headerEl) headerEl.innerHTML = "Route : " + from + " → " + to + " | Date : " + date + " | Class : " + trainClass + " | Quota : " + quota;

  const trains = [
    {route:"Secunderabad (SC)_Vijayawada (BZA)",name:"Krishna Express",number:"17405",departure:"06:00 AM",arrival:"11:30 AM"},
    {route:"Secunderabad (SC)_Vijayawada (BZA)",name:"Godavari Express",number:"12727",departure:"07:45 AM",arrival:"12:40 PM"},
    {route:"Secunderabad (SC)_Vijayawada (BZA)",name:"Satavahana Express",number:"12713",departure:"09:30 AM",arrival:"02:45 PM"},
    {route:"Secunderabad (SC)_Vijayawada (BZA)",name:"Falaknuma Express",number:"12703",departure:"12:15 PM",arrival:"05:20 PM"},
    {route:"Vijayawada (BZA)_Secunderabad (SC)",name:"Krishna Express",number:"17406",departure:"05:30 AM",arrival:"11:00 AM"},
    {route:"Vijayawada (BZA)_Secunderabad (SC)",name:"Godavari Express",number:"12728",departure:"08:00 AM",arrival:"01:00 PM"},
    {route:"Vijayawada (BZA)_Secunderabad (SC)",name:"Satavahana Express",number:"12714",departure:"10:30 AM",arrival:"03:30 PM"},
    {route:"Vijayawada (BZA)_Secunderabad (SC)",name:"Falaknuma Express",number:"12704",departure:"01:15 PM",arrival:"06:20 PM"},
    {route:"Chennai Central (MAS)_Visakhapatnam (VSKP)",name:"Coromandel Express",number:"12841",departure:"07:00 AM",arrival:"07:30 PM"},
    {route:"Chennai Central (MAS)_Visakhapatnam (VSKP)",name:"Howrah Mail",number:"12840",departure:"10:00 AM",arrival:"10:30 PM"},
    {route:"Chennai Central (MAS)_Visakhapatnam (VSKP)",name:"East Coast Express",number:"18645",departure:"02:30 PM",arrival:"03:00 AM"},
    {route:"Chennai Central (MAS)_Visakhapatnam (VSKP)",name:"Visakha Express",number:"17015",departure:"05:30 PM",arrival:"07:30 AM"},
    {route:"Visakhapatnam (VSKP)_Chennai Central (MAS)",name:"Coromandel Express",number:"12842",departure:"05:30 AM",arrival:"06:00 PM"},
    {route:"Visakhapatnam (VSKP)_Chennai Central (MAS)",name:"Howrah Mail",number:"12839",departure:"09:30 AM",arrival:"09:30 PM"},
    {route:"Visakhapatnam (VSKP)_Chennai Central (MAS)",name:"East Coast Express",number:"18646",departure:"01:00 PM",arrival:"02:00 AM"},
    {route:"Visakhapatnam (VSKP)_Chennai Central (MAS)",name:"Visakha Express",number:"17016",departure:"06:00 PM",arrival:"08:00 AM"},
    {route:"Bengaluru (SBC)_Mumbai Central (BCT)",name:"Udyan Express",number:"11301",departure:"07:30 AM",arrival:"09:30 PM"},
    {route:"Bengaluru (SBC)_Mumbai Central (BCT)",name:"Mumbai Express",number:"11014",departure:"10:00 AM",arrival:"11:45 PM"},
    {route:"Bengaluru (SBC)_Mumbai Central (BCT)",name:"Duronto Express",number:"12220",departure:"03:30 PM",arrival:"05:30 AM"},
    {route:"Bengaluru (SBC)_Mumbai Central (BCT)",name:"Garib Rath",number:"12708",departure:"08:30 PM",arrival:"10:00 AM"},
    {route:"Mumbai Central (BCT)_Bengaluru (SBC)",name:"Udyan Express",number:"11302",departure:"06:00 AM",arrival:"08:00 PM"},
    {route:"Mumbai Central (BCT)_Bengaluru (SBC)",name:"Mumbai Express",number:"11013",departure:"09:00 AM",arrival:"10:30 PM"},
    {route:"Mumbai Central (BCT)_Bengaluru (SBC)",name:"Duronto Express",number:"12219",departure:"02:30 PM",arrival:"04:30 AM"},
    {route:"Mumbai Central (BCT)_Bengaluru (SBC)",name:"Garib Rath",number:"12707",departure:"07:30 PM",arrival:"09:30 AM"},
    {route:"New Delhi (NDLS)_Kolkata (HWH)",name:"Rajdhani Express",number:"12302",departure:"04:55 PM",arrival:"10:00 AM"},
    {route:"New Delhi (NDLS)_Kolkata (HWH)",name:"Duronto Express",number:"12274",departure:"06:30 PM",arrival:"11:00 AM"},
    {route:"New Delhi (NDLS)_Kolkata (HWH)",name:"Poorva Express",number:"12304",departure:"08:00 PM",arrival:"01:30 PM"},
    {route:"New Delhi (NDLS)_Kolkata (HWH)",name:"Sealdah Express",number:"12314",departure:"10:30 PM",arrival:"03:30 PM"},
    {route:"Kolkata (HWH)_New Delhi (NDLS)",name:"Rajdhani Express",number:"12301",departure:"04:45 PM",arrival:"10:30 AM"},
    {route:"Kolkata (HWH)_New Delhi (NDLS)",name:"Duronto Express",number:"12273",departure:"06:15 PM",arrival:"11:15 AM"},
    {route:"Kolkata (HWH)_New Delhi (NDLS)",name:"Poorva Express",number:"12303",departure:"08:30 PM",arrival:"02:00 PM"},
    {route:"Kolkata (HWH)_New Delhi (NDLS)",name:"Sealdah Express",number:"12313",departure:"10:00 PM",arrival:"04:00 PM"}
  ];

  const going     = trains.filter(t => t.route === from + "_" + to);
  const returning = trains.filter(t => t.route === to + "_" + from);

  window.bookTrainTicket = function (train) {
    const tickets = JSON.parse(localStorage.getItem("tickets")) || [];
    tickets.push({ type:"Train Ticket", name:train.name, number:train.number, route:from+" → "+to, departure:train.departure, arrival:train.arrival, date, class:trainClass, quota, booked:new Date().toLocaleString() });
    localStorage.setItem("tickets", JSON.stringify(tickets));
    window.location.href = "MT.html";
  };

  function renderTrains(list, el) {
    if (list.length === 0) { el.innerHTML = "<p style='text-align:center'>No trains found</p>"; return; }
    list.forEach(t => {
      const card = document.createElement("div");
      card.className = "train-card";
      card.innerHTML = `
        <div class="train-info">
          <div class="train-name">${t.name} (${t.number})</div>
          Departure : ${t.departure}<br>Arrival : ${t.arrival}<br>
          Class : ${trainClass}<br>Quota : ${quota}
        </div>
        <div>
          <div class="price">Available</div>
          <button class="book-btn" onclick='bookTrainTicket(${JSON.stringify(t)})'>Book Ticket</button>
        </div>`;
      el.appendChild(card);
    });
  }

  renderTrains(going, goingDiv);
  renderTrains(returning, returnDiv);
})();


/* ── 9. MY TICKETS ── */
(function initMyTickets() {
  const container = document.getElementById("ticketContainer");
  if (!container) return;

  let tickets = JSON.parse(localStorage.getItem("tickets")) || [];

  function showTickets() {
    container.innerHTML = "";
    const emptyEl = document.getElementById("emptyMessage");
    if (tickets.length === 0) { if (emptyEl) emptyEl.style.display = "block"; return; }
    if (emptyEl) emptyEl.style.display = "none";
    tickets.forEach((t, i) => {
      container.innerHTML += `
        <div class="ticket-card">
          <h3>${t.name}</h3>
          <p><b>Route:</b> ${t.route}</p>
          <p><b>Price:</b> ₹${t.price}</p>
          <p><b>Date:</b> ${t.date || t.booked}</p>
          <button onclick="cancelTicket(${i})">Cancel Ticket</button>
        </div>`;
    });
  }

  window.cancelTicket = function (index) {
    tickets.splice(index, 1);
    localStorage.setItem("tickets", JSON.stringify(tickets));
    showTickets();
  };

  showTickets();
})();


/* ── 10. SIGNUP ── */
window.checkStrength = function () {
  const pw = document.getElementById("password")?.value || "";
  const el = document.getElementById("strength");
  if (!el) return;
  const ok = pw.length >= 8 && /[A-Z]/.test(pw) && /[!@#$%^&*]/.test(pw) && (pw.match(/[0-9]/g) || []).length >= 4;
  el.innerHTML   = ok ? "Strong Password" : "Password must contain 1 Capital, 1 Symbol, and 4 Numbers";
  el.style.color = ok ? "green" : "red";
};

window.signup = function (e) {
  e && e.preventDefault();
  const phone    = document.getElementById("number")?.value;
  const email    = document.getElementById("Email")?.value;
  const password = document.getElementById("password")?.value;
  if (!password) return;
  const ok = password.length >= 8 && /[A-Z]/.test(password) && /[!@#$%^&*]/.test(password) && (password.match(/[0-9]/g) || []).length >= 4;
  if (ok && typeof firebase !== "undefined") {
    firebase.database().ref("users").push({ phone, email, password });
    window.location.href = "Profile.html";
  }
};


/* ── 11. LOGIN ── */
window.login = function () {
  const user     = document.getElementById("user")?.value;
  const password = document.getElementById("password")?.value;
  if (typeof firebase === "undefined") return;
  firebase.database().ref("users").once("value", function (snapshot) {
    let found = false;
    snapshot.forEach(function (child) {
      const data = child.val();
      if ((data.email === user || data.phone === user) && data.password === password) found = true;
    });
    const resultEl = document.getElementById("result");
    if (found) { window.location.href = "Profile.html"; }
    else if (resultEl) { resultEl.innerText = "Invalid login details"; }
  });
};
/* ── 12. PROFILE ── */
(function initProfile() {
  const phoneEl  = document.getElementById("phone");
  const emailEl  = document.getElementById("email");
  const ticketEl = document.getElementById("tickets");
  if (!phoneEl && !ticketEl) return;

  if (typeof firebase !== "undefined") {
    firebase.database().ref("users").limitToLast(1).once("value", function (snapshot) {
      snapshot.forEach(function (child) {
        const d = child.val();
        if (phoneEl) phoneEl.innerText = d.phone;
        if (emailEl) emailEl.innerText = d.email;
      });
    });
    if (ticketEl) {
      firebase.database().ref("tickets").limitToLast(5).once("value", function (snapshot) {
        snapshot.forEach(function (child) {
          const t = child.val();
          ticketEl.innerHTML += `<div class="profile-ticket"><b>Bus:</b> ${t.bus||"-"}<br><b>Seat:</b> ${t.seat||"-"}<br><b>Date:</b> ${t.date||"-"}</div>`;
        });
      });
    }
  }
})();

window.logout = function () { window.location.href = "login.html"; };