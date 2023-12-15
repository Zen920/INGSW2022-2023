const prod = {
  baseURL: "/api",
  socketURL: `ws://${window.location.host}:80/ratatouille-websockets`,
};
const dev = {
  baseURL: "http://localhost:8081/api/",
  socketURL: "ws://localhost:8081/ratatouille-websockets",
};
export const config = process.env.NODE_ENV === "development" ? dev : prod;
