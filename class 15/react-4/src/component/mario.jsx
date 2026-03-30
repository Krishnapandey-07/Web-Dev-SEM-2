import { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [coins, setCoins] = useState(0);
  const [isSuper, setIsSuper] = useState(false);
  const [coinAnim, setCoinAnim] = useState(false);
  const [ghostAnim, setGhostAnim] = useState(false);
  const [mushroomAnim, setMushroomAnim] = useState(false);

  // useEffect 1: whenever isSuper changes, trigger mushroom slide animation
  useEffect(() => {
    if (isSuper) {
      setMushroomAnim(true);
    }
  }, [isSuper]);

  // useEffect 2: whenever coins change, flash the coin counter
  useEffect(() => {
    if (coins > 0) {
      setCoinAnim(true);
      const t = setTimeout(() => setCoinAnim(false), 400);
      return () => clearTimeout(t);
    }
  }, [coins]);

  // +1 coin on question button click
  function handleQuestion() {
    setCoins((prev) => prev + 1);
  }

  // mushroom clicked → go super
  function handleMushroom() {
    setIsSuper(true);
  }

  // ghost clicked → full reset
  function handleGhost() {
    setGhostAnim(true);
    setTimeout(() => {
      setCoins(0);
      setIsSuper(false);
      setMushroomAnim(false);
      setGhostAnim(false);
    }, 500);
  }

  return (
    <div className="sky">
      {/* Clouds */}
      <div className="cloud cloud1" />
      <div className="cloud cloud2" />
      <div className="cloud cloud3" />

      <div className={`game-card ${ghostAnim ? "shake" : ""}`}>
        {/* Header */}
        <div className="header">
          <span className="title">MARIO'S ADVENTURE</span>
        </div>

        {/* Coin counter */}
        <div className={`coin-bar ${coinAnim ? "coin-pop" : ""}`}>
          <span className="coin-icon">🪙</span>
          <span className="coin-text">
            COIN ×{String(coins).padStart(2, "0")}
          </span>
        </div>

        {/* Character area */}
        <div className="character-row">
          <div className="face-wrap">
            {/* Mario face */}
            <div className={`mario-face ${isSuper ? "super-face" : ""}`}>
              <div className="mario-hat" />
              <div className="mario-eyes">
                <span className="eye" />
                <span className="eye" />
              </div>
              <div className="mario-mustache" />
            </div>

            {/* Mushroom slides beside face when isSuper */}
            {isSuper && (
              <div className={`mushroom-side ${mushroomAnim ? "slide-in" : ""}`}>
                🍄
              </div>
            )}
          </div>

          {/* Status label */}
          <div className="status-label">
            {isSuper ? (
              <span className="super-text">SUPER MARIO</span>
            ) : (
              <span className="regular-text">REGULAR MARIO</span>
            )}
          </div>
        </div>

        {/* Buttons row */}
        <div className="btn-row">
          {/* Question button 1 */}
          <button className="block-btn question-btn" onClick={handleQuestion}>
            <span className="block-face">?</span>
          </button>

          {/* Question button 2 */}
          <button className="block-btn question-btn" onClick={handleQuestion}>
            <span className="block-face">?</span>
          </button>

          {/* Mushroom button */}
          <button
            className={`block-btn mushroom-btn ${isSuper ? "used" : ""}`}
            onClick={handleMushroom}
            disabled={isSuper}
          >
            <span className="block-face">🍄</span>
          </button>

          {/* Ghost button */}
          <button className="block-btn ghost-btn" onClick={handleGhost}>
            <span className="block-face">👻</span>
          </button>
        </div>

        {/* Footer */}
        <div className="footer">
          <span className="world-text">WORLD 0-0</span>
          <div className="lives">
            <span>❤️</span><span>❤️</span><span>❤️</span>
          </div>
          <span className="time-text">TIME —</span>
        </div>
      </div>

      {/* Ground */}
      <div className="ground" />
    </div>
  );
}
