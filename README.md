# ✈️ TicketEasy — Smart AI Travel & Ticket Booking Platform

**TicketEasy** is a state-of-the-art, all-in-one travel reservation ecosystem designed with an **ultra-vibrant Glassmorphism design system**. TicketEasy enables travelers to seamlessly search, compare, and book **Flights**, **Buses**, **Trains**, and **Hotels**, generate AI-powered **3-Day Trip Itineraries**, and manage digital **PDF E-Tickets** with zero gateway fees.

![TicketEasy Banner](https://img.shields.io/badge/TicketEasy-v2.0-06b6d4?style=for-the-badge&logo=airbnb)
![Status](https://img.shields.io/badge/Status-Active-10b981?style=for-the-badge)
![License](https://img.shields.io/badge/License-Proprietary-f43f5e?style=for-the-badge)

---

## 🌟 Key Features

### 🤖 1. TicketEasy AI Copilot Assistant
- **Small Floating Widget**: Sleek 44px circular trigger fixed at the bottom-right corner (`bottom: 20px; right: 20px`).
- **4x3 Action Dashboard Window**: Opens in a 4:3 aspect ratio popup (`520px × 390px`) featuring 12 interactive quick-action cards:
  - ✈️ Flights | 🚌 Buses | 🚆 Trains | 🏨 Hotels
  - 🏷️ Promo Coupons | 🌴 3-Day Itineraries | 🧳 Baggage Rules | 🌤️ Weather Forecasts
  - 🎟️ My Tickets Wallet | 📲 Instant UPI QR | 👤 Profile | 💬 Conversational AI Chat Parser

### ✈️ 2. Domestic & International Flight Booking
- **Trip Type Selector**: One-Way, Round-Trip (with conditional return date picker), and Multi-City modes.
- **Airport Hubs**: Hyderabad (HYD), Delhi (DEL), Mumbai (BOM), Bengaluru (BLR), Chennai (MAA), Dubai (DXB), London (LHR), Singapore (SIN).
- **Airline Partners**: Emirates, Air India, IndiGo, British Airways, Singapore Airlines, and Vistara.
- **Interactive Seat Map**: Aircraft seat selector modal with window/aisle options and seat status.

### 🚌 3. Intercity Bus Ticket Reservation
- **Bus Operators**: APSRTC Garuda Plus, KSRTC Airavat, VRL Travels, Orange Travels, and Morning Star.
- **Bus Classes**: AC Sleeper, Volvo Multi-Axle, and Non-AC Seater.
- **Visual Bus Layout**: Interactive bus seat map generator.

### 🚆 4. Express & Rajdhani Train Bookings
- **Train Operators**: Krishna Express, Godavari Express, Coromandel Express, and Rajdhani Express.
- **Quota & Classes**: General, Tatkal, Senior Citizen, Ladies quota; Sleeper (SL), 3AC (3A), 2AC (2A), 1AC (1A).

### 🏨 5. Luxury Hotels & Beach Resorts
- **Destinations**: Goa, Hyderabad, Delhi, Mumbai, Dubai, Singapore, Bangkok.
- **Resorts**: Taj Exotica Goa, Taj Krishna Hyderabad, Atlantis The Palm Dubai, Marina Bay Sands Singapore.

### 🗺️ 6. AI Trip & Itinerary Planner
- Generates custom 3-day travel itineraries based on budget tier (Budget, Standard, Luxury) for Goa, Manali, Kerala, Kashmir, Ladakh, and Rishikesh.

### 💳 7. Universal Payment Gateway & Checkout
- **Promo Code Engine**:
  - `EASYAI20`: Flat 20% OFF on all bookings.
  - `FESTIVE500`: Instant ₹500 discount.
- **Payment Methods**:
  - 📲 **UPI QR Code**: Auto-generates dynamic payment QR codes.
  - 💳 **Credit / Debit Cards**: Includes a **3D Secure OTP Verification Modal** simulation.
  - 🏦 **Net Banking**: HDFC, ICICI, SBI, Axis, Kotak.
  - 👛 **Mobile Wallets & EMI**: PayTM, PhonePe, Amazon Pay.

### 🎟️ 8. Digital E-Ticket Wallet
- **Ticket PNR Generator**: Generates unique PNRs (e.g., `TE-891234`).
- **SVG QR Codes**: Scannable boarding pass QR codes.
- **PDF E-Ticket Printer**: 1-click printable e-ticket with `@media print` CSS optimized layout.

---

## 🎨 Design System (Ultra-Vibrant Glassmorphism)

- **Color Palette**:
  - Deep Cyber Background: `#030712` with radial gradient `radial-gradient(ellipse at 20% 10%, #1e1b4b 0%, #0f172a 50%, #030712 100%)`.
  - Ambient Glowing Orbs: Electric Cyan (`#06b6d4`) & Indigo Glow (`#6366f1`).
  - Accent Colors: Emerald Success (`#10b981`), Sunset Orange (`#f97316`), Rose (`#f43f5e`).
- **Glassmorphism Effects**:
  - Translucent Cards: `background: rgba(15, 23, 42, 0.65)` with `backdrop-filter: blur(20px)`.
  - Neon Borders: Soft glowing highlights on hover (`border-color: rgba(6, 182, 212, 0.6)`).
- **Typography**: Google Fonts [`Outfit`](https://fonts.google.com/specimen/Outfit) (Headings) & [`Plus Jakarta Sans`](https://fonts.google.com/specimen/Plus+Jakarta+Sans) (Body).

---

## 📂 Project Architecture

```
TicketEasy/
├── index.html            # Main parent shell (Header, Nav, AI Copilot & iFrame container)
├── home.html             # Homepage with Hero Slideshow, Quick Search & Featured Deals
├── flight.html           # Flight Booking Search & Airline Partners Showcase
├── flightticket.html     # Flight Search Results & Booking Triggers
├── bus.html              # Bus Reservation Search & Popular Routes
├── busticket.html        # Bus Search Results & Seat Selection
├── trains.html           # Train Reservation Search (Tatkal & General Quota)
├── traintickets.html     # Train Search Results & Berth Selection
├── hotel.html            # Luxury Hotels & Resort Stays
├── trips.html            # AI Trip & Itinerary Generator
├── mt.html               # Digital E-Ticket Wallet & PDF Printer
├── profile.html          # User Profile Dashboard & Booking History
├── login.html            # Secure Authentication Login
├── signup.html           # User Account Registration
├── style.css             # Glassmorphism Design System Tokens & Animations
├── booking-modal.js      # Seat Map Selector, Promo Engine & Payment Gateway Modal
├── ai-assistant.js       # AI Copilot Floating Widget & 4x3 Action Grid
├── flight.jpeg           # Flight Hero Banner Asset
├── bus.jpeg              # Bus Hero Banner Asset
├── train.jpeg            # Train Hero Banner Asset
├── hotel.jpeg            # Hotel Hero Banner Asset
└── README.md             # Project Documentation
```

---

## 🚀 Quick Start & Local Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Yogender-verma/TicketEasy.git
cd TicketEasy
```

### 2. Run Local Development Server
Launch a local server (disabling HTTP browser caching headers):
```bash
npx -y http-server . -p 3000 -c-1
```

### 3. Open in Browser
Visit **[http://127.0.0.1:3000](http://127.0.0.1:3000)** in your browser!

---

## 🎟️ Active Promo Codes

| Promo Code | Discount | Description |
| :--- | :--- | :--- |
| **`EASYAI20`** | **20% OFF** | Applicable on Flights, Buses, Trains, and Hotels |
| **`FESTIVE500`** | **Flat ₹500 OFF** | Minimum booking value ₹1,000 |

---

## 🔒 Copyright & Ownership

© 2026 **TicketEasy**. All rights reserved. Developed by **[Yogendar Verma](https://github.com/Yogender-verma)**. Proprietary travel booking platform software.
