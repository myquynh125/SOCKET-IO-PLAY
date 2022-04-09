-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 09, 2022 at 02:50 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `congcu`
--

-- --------------------------------------------------------

--
-- Table structure for table `movie`
--

CREATE TABLE `movie` (
  `IdMovie` int(11) NOT NULL,
  `hinhanh` varchar(150) DEFAULT NULL,
  `duration` varchar(100) DEFAULT NULL,
  `tenphim` varchar(100) DEFAULT NULL,
  `linkphim` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `movie`
--

INSERT INTO `movie` (`IdMovie`, `hinhanh`, `duration`, `tenphim`, `linkphim`) VALUES
(1, 'https://image.tmdb.org/t/p/w500/fev8UFNFFYsD5q7AcYS8LyTzqwl.jpg', '10 phút', 'Hoạt hình 1', 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'),
(2, 'https://image.tmdb.org/t/p/w500/kf456ZqeC45XTvo6W9pW5clYKfQ.jpg', '9 phút', 'Hoạt hình 2', 'https://mcorp.no/res/bigbuckbunny.webm'),
(3, 'https://i.ytimg.com/vi/A1XWEmtsy8g/maxresdefault.jpg', '0.15s', 'Cartoon 3', 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'),
(4, 'https://media.wired.com/photos/5d09594a62bcb0c9752779d9/16:9/w_2000,h_1125,c_limit/Transpo_G70_TA-518126.jpg', '9:30 phút', 'Car', 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4'),
(5, 'https://cdn.motor1.com/images/mgl/8e8Mo/s1/most-expensive-new-cars-ever.webp', '0:47 s', 'Cart 2', 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4'),
(6, 'https://cdn.mos.cms.futurecdn.net/3upZx2gxxLpW7MBbnKYQLH-1200-80.jpg', '9:30 phút', 'Earth', 'https://anthonygiretti.blob.core.windows.net/videos/nature1.mp4'),
(7, 'https://www.nih.gov/sites/default/files/news-events/research-matters/2009/20090413-coldvirus.jpg', '0:12s', 'Virus', 'https://media.istockphoto.com/videos/vaccine-antibodies-attack-and-destroy-coronavirus-video-id1289226667');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `idUser` int(11) NOT NULL,
  `username` varchar(50) DEFAULT NULL,
  `userpassword` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`idUser`, `username`, `userpassword`) VALUES
(1, 'admin', 'admin'),
(2, 'khach1', '123456789'),
(3, 'khach2', '123456789');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `movie`
--
ALTER TABLE `movie`
  ADD PRIMARY KEY (`IdMovie`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`idUser`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `movie`
--
ALTER TABLE `movie`
  MODIFY `IdMovie` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `idUser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
