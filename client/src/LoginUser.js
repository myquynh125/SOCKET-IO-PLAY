import { useState } from "react";
import { socket } from "./socketIO";
import axios from "axios";
export default function LoginUser() {
  const [username, setUserName] = useState("");
  const [userpassword, setUserPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    try {
      axios
        .post(`http://localhost:8080/user/dangnhap`, {
          username: username,
          userpassword: userpassword,
        })
        .then((res) => {
          sessionStorage.setItem("userInfo", JSON.stringify(res.data[0]));
          window.location.href = "/";
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {}
  };

  return (
    <>
      <div
        className="container body-card card"
        style={{ paddingBottom: "400px", width: "400px", height: "100px" }}
      >
        <div></div>
        <div style={{ marginBottom: "10px", marginTop: "15px" }}>
          <label style={{ marginRight: "15px" }}></label>
          <input
            type={"text"}
            placeholder="Nhập tên tài khoản"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          ></input>
        </div>

        <div>
          <label style={{ marginRight: "5px" }}></label>
          <input
            type={"password"}
            onChange={(e) => {
              setUserPassword(e.target.value);
            }}
            placeholder="Nhập mật khẩu"
            required
            style={{ marginLeft: "10px" }}
          />
        </div>
        <div style={{ marginTop: "20px" }}>
          <button
            onClick={handleLogin}
            className="btn btn-primary"
            style={{ width: "290px" }}
          >
            Đăng nhập
          </button>
        </div>
      </div>
    </>
  );
}
