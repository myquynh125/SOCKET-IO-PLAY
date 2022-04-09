import React, { useEffect, useState } from "react";
import axios from "axios";
export default function Home() {
  const [phim, setPhim] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/media/")
      .then((res) => {
        console.log(res);
        setPhim(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return(
      <div>Kết nối client thành công </div>
  )
}
