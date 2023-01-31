import Api from "./Api";
import { API_URL } from "./URLS";

describe("HTTP client", () => {
  it("sign in", (done) => {
    Api.post(`${API_URL}/auth/signin`, {
      withCredentials: true,
      data: JSON.stringify({ login: "tarakann", password: "!Q2w3e4r" }),
    })
      .then(() => {
        done();
      })
      .catch(() => {
        done(new Error("Request failed"));
      });
  });
});
