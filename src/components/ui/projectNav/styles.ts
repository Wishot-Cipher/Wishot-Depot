export const nav: React.CSSProperties = {
  width: "99%",
  position: "fixed",
  top: 0,
  paddingTop: 4,
  left: 0,
  zIndex: 50,
  pointerEvents: "none",
//   outline: "none"
};

export const background: React.CSSProperties = {
  background: "linear-gradient(135deg, #0A0A0A 0%, #1a1a2e 50%, #16213e 100%)",
  position: "absolute",
  top: 0,
  height: "100vh",
  left: 0,
  bottom: 0,
  width: "80%",
  maxWidth: "400px",
};

export const list: React.CSSProperties = {
  listStyle: "none",
  padding: 25,
  margin: 0,
  position: "absolute",
  top: 120,
  width: "100%",
  maxWidth: "350px",
};

export const listItem: React.CSSProperties = {
  display: "flex",
  maxWidth: "88%",
  alignItems: "center",
  justifyContent: "flex-start",
  marginBottom: 25,
  cursor: "pointer",
};
