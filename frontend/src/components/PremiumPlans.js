// src/components/PremiumPopup.js
import React, { useState } from "react";
import { FaCrown } from "react-icons/fa";
import "../styles/CareerDetail.css";
import QrPopup from './QrPopup';

export default function PremiumPopup({ onClose, onUpgrade }) {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showQrPopup, setShowQrPopup] = useState(false);

  return (
    <div className="premium-overlay">
      <div className="premium-modal">
        <button className="close-btn" onClick={onClose}>&times;</button>

        <div className="premium-header">
          <FaCrown size={40} color="#ffcc00" className="premium-icon" />
          <h2>Unlock Full Access</h2>
          <p className="premium-subtitle">
            Get detailed roadmaps, expert tips, and downloadable guides for every career.
          </p>
        </div>

        {/* Subscription Plan Options */}
        <div className="plan-cards">
          {["1 Month", "3 Months", "1 Year"].map((plan) => (
            <div
              key={plan}
              className={`plan-card ${selectedPlan === plan ? "selected" : ""} ${plan === "3 Months" ? "popular" : ""}`}
              onClick={() => setSelectedPlan(plan)}
            >
              <h3>{plan}</h3>
              <p>{plan === "1 Month" ? "₹1999" : plan === "3 Months" ? "₹2999" : "₹3999"}</p>
              <span>
                {plan === "1 Month"
                  ? "Ideal for quick exploration"
                  : plan === "3 Months"
                    ? "Most Popular – Save 33%"
                    : "Best value for serious planning"}
              </span>
            </div>
          ))}
        </div>

        <button
          className="subscribe-btn"
          disabled={!selectedPlan}
          onClick={() => setShowQrPopup(true)} // Show QR popup
        >
          Upgrade Now
        </button>

        <p className="secure-text">🔒 100% secure payment • Cancel anytime</p>
      </div>

      {/* QR Popup */}
      {showQrPopup && (
        <QrPopup
          selectedPlan={selectedPlan}
          onClose={() => setShowQrPopup(false)}
          onConfirm={() => {
            const currentUser = JSON.parse(localStorage.getItem("user")) || {};
            currentUser.isPremium = true;
            localStorage.setItem("user", JSON.stringify(currentUser));

            alert("✅ Payment successful! You now have premium access.");
            onClose(); // close main popup
            onUpgrade?.();
            window.location.reload();
          }}
        />

      )}
    </div>
  );
}
