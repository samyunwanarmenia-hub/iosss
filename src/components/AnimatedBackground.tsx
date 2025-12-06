const AnimatedBackground = () => {
  return (
    <div className="ambient-background" aria-hidden="true">
      <div className="background-grid" />
      <div className="background-beams">
        <span className="background-beam background-beam--primary" />
        <span className="background-beam background-beam--secondary" />
        <span className="background-beam background-beam--accent" />
      </div>
      <span className="ambient-orb ambient-orb--one" />
      <span className="ambient-orb ambient-orb--two" />
      <span className="ambient-orb ambient-orb--three" />
      <div className="background-dust" />
      <div className="background-noise" />
    </div>
  );
};

export default AnimatedBackground;
