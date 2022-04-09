import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Home() {
  const [phim, setPhim] = useState([]);
  const [user, setUser] = useState([]);
  const getUser = () => {
    const item = JSON.parse(sessionStorage.getItem("userInfo"));
    if (item) {
      setUser(item);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8080/phim/phim/")
      .then((res) => {
        console.log(res.data);
        setPhim(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div
      className="App App-header"
      style={{
        backgroundImage:
          'url("https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569_960_720.jpg")',
      }}
    >
      <div className="container" style={{ marginTop: "10px" }}>
        <div>
          <h3>PHIM HAY TRONG TUẦN</h3>
          {user.username ? (
            <b>Xin chào: {user.username}</b>
          ) : (
            <h6 style={{ float: "right" }}>
              <Link to="/dangnhap">
                <b style={{ color: "yellow" }}> Đăng nhập</b>
              </Link>
            </h6>
          )}
        </div>
        <br></br>
        <div className="row">
          {phim.map((item, index) => (
            <div
              className="col-md-4"
              key={index}
              style={{ marginBottom: "10px" }}
            >
              <Link to={`/phim/${item.IdMovie}`}>
                <div className="card border-0">
                  <img
                    alt={item.tenphim}
                    src={item.hinhanh}
                    style={{ width: "350px", height: "200px" }}
                  ></img>
                  <div className="card-body">
                    <p>
                      <b style={{ color: "red" }}>{item.tenphim}</b>
                    </p>
                    <p>
                      <b style={{ color: "blue" }}>{item.duration}</b>
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
          <div className="container">
            <div className="row">
              <div className="col-md-3" style={{ textAlign: "center" }}>
                <br></br>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;
