import React from 'react';
import './landing.css'

const Landing = () => (
  <section className="landing">
    <h1 className="hero-title">Turn the music up!</h1>

    <section className="selling-point">
      <div className="point">
        <h2 className="point-title1">Choose your music</h2>
        <p className="point-description1">The world is full of music; why should you have to listen to music that someone else chose?</p>
      </div>
      <div className="point">
        <h2 className="point-title2">Unlimited, streaming, ad-free</h2>
        <p className="point-description2">No arbitrary limits. No distractions</p>
      </div>
      <div className="point">
        <h2 className="point-title3">Mobile enabled</h2>
        <p className="point-description3">Listen to your music on the go. This streaming service is available on all mobile platforms.</p>
      </div>
    </section>
  </section>
);

export default Landing; //allows this page to be exported into another component
