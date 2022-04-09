import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { socket } from "./socketIO";

function VideoPlayer() {
  const { id } = useParams();
  const [phim, setPhim] = useState([]);
  const [room, setRoom] = useState("");
  const [checkRoom, setCheckRoom] = useState(false);
  const videoRef = useRef();
  const socketRef = useRef();
  const [user, setUser] = useState([]);
  const getUser = () => {
    const item = JSON.parse(sessionStorage.getItem("userInfo"));
    if (item) {
      setUser(item);
    }
  };

  useEffect(() => {
    getUser();
    socketRef.current = socket;
  }, []);

  useEffect(() => {
    const FetchData = async () => {
      await axios
        .get(`http://localhost:8080/phim/phim/${id}`)
        .then((res) => {
          console.log(res.data);
          setPhim(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    FetchData();
    console.log(id);

    socketRef.current.on("current", function (data) {
      videoRef.current.currentTime = data;
    });
    socketRef.current.on("playPause", function (data) {
      if (data === "play") {
        videoRef.current.play();
      } else if (data === "pause") {
        videoRef.current.pause();
      }
    });
    socketRef.current.on("reset", function () {
      videoRef.current.currentTime = 0;
    });
    socketRef.current.on("skip", function (value) {
      videoRef.current.currentTime += value;
    });
    socketRef.current.on("sound", function () {
      videoRef.current.muted = !videoRef.current.muted;
    });
    socketRef.current.on("fullscreen", function () {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    });
  }, [id, room]);

  const handlePlayVideo = () => {
    videoRef.current.play();
    socketRef.current.emit("playPause", "play");
    socketRef.current.emit("current", videoRef.current.currentTime);
    console.log("Play video");
  };

  const handlePauseVideo = () => {
    videoRef.current.pause();
    socketRef.current.emit("playPause", "pause");
    socketRef.current.emit("current", videoRef.current.currentTime);
    console.log("Pause Video");
  };
  const handleResetVideo = () => {
    videoRef.current.currentTime = 0;
    socketRef.current.emit("reset");
    console.log("Reset Video");
  };
  const handleSkipForw = (value) => () => {
    videoRef.current.currentTime += value;
    socketRef.current.emit("skip", value);
    socketRef.current.emit("current", videoRef.current.currentTime);
    console.log("Skip 5s");
  };

  const handleSkipBack = (value) => () => {
    videoRef.current.currentTime += value;
    socketRef.current.emit("skip", value);
    socketRef.current.emit("current", videoRef.current.currentTime);
    console.log("Skip -5s");
  };

  const toggleSound = () => {
    videoRef.current.muted = !videoRef.current.muted;
    socketRef.current.emit("sound");
    socketRef.current.emit("current", videoRef.current.currentTime);
  };

  const fullScreen = () => {
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
    socketRef.current.emit("fullscreen");
  };

  function formatDur(thoigian) {
    thoigian = Math.round(thoigian);
    var minute = Math.floor(thoigian / 60);
    var second = Math.floor(thoigian - minute * 60);
    second = second < 10 ? "0" + second : second;
    return minute + ":" + second;
  }

  function CurrentTimeFunction() {
    document.getElementById("currentTime").innerHTML = formatDur(
      videoRef.current.currentTime
    );
  }
  const joinRoom = (e) => {
    e.preventDefault();
    if (room !== "") {
      socketRef.current.emit("join-room", room);
      setCheckRoom(!checkRoom);
    }
  };

  return (
    <div>
      {user.username ? (
        <div>
          <Link to="/" style={{ color: "black", fontWeight: "bold" }}>
            Trang chủ
          </Link>
        </div>
      ) : null}

      <div className="container">
        {!checkRoom ? (
          <div>
            <input
              type={"text"}
              id="room"
              placeholder="Nhập mã phòng........"
              onChange={(e) => setRoom(e.target.value)}
            ></input>
            {user.username ? (
              <button onClick={joinRoom}>Tạo phòng</button>
            ) : (
              <>
                <button onClick={joinRoom}>Join phòng</button>
              </>
            )}
          </div>
        ) : (
          <>
            {phim.map((item, index) => (
              <div key={index}>
                <h1>
                  Tên Phim: {item.tenphim} - {item.duration}
                </h1>

                <video
                  controls
                  muted
                  style={{ height: "500px", width: "1000px" }}
                  id="movie"
                  name="movie"
                  ref={videoRef}
                  onTimeUpdate={CurrentTimeFunction}
                >
                  <source src={item.linkphim} type="video/mp4"></source>
                </video>

                <div className="columm" style={{ padding: "10px" }}>
                  <div>
                    <b id="currentTime">0:00</b>
                  </div>
                </div>
                {user.username ? (
                  <div style={{ marginBottom: "20px", padding: "10px" }}>
                    <button
                      id="play"
                      onClick={handlePlayVideo}
                      className="btn btn-primary"
                      style={{ margin: "10px" }}
                    >
                      <b> Phát</b>
                    </button>
                    <button
                      id="pause"
                      className="btn btn-light"
                      style={{ margin: "10px" }}
                      onClick={handlePauseVideo}
                    >
                      <b>Dừng</b>
                    </button>
                    <button
                      id="fastFwd"
                      className="btn btn-warning"
                      onClick={handleSkipForw(5)}
                      style={{ margin: "10px" }}
                    >
                      <b> Tua 5s</b>
                    </button>
                    <button
                      id="rew"
                      className="btn btn-info"
                      onClick={handleSkipBack(-5)}
                      style={{ margin: "10px" }}
                    >
                      <b>Về 5s</b>
                    </button>
                    <button
                      id="restart"
                      className="btn btn-danger "
                      onClick={handleResetVideo}
                      style={{ margin: "10px" }}
                    >
                      <b>Reset</b>
                    </button>

                    <button
                      id="muted"
                      className="btn btn-danger"
                      onClick={toggleSound}
                      style={{ margin: "10px" }}
                    >
                      <b>Âm thanh</b>
                    </button>
                    <button
                      id="fullscreen"
                      className="btn btn-dark"
                      onClick={fullScreen}
                      style={{ margin: "10px" }}
                    >
                      <b>Screen</b>
                    </button>
                  </div>
                ) : null}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
export default VideoPlayer;
