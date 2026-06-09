-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 09, 2026 at 07:36 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `testpkl`
--

-- --------------------------------------------------------

--
-- Table structure for table `arsip`
--

CREATE TABLE `arsip` (
  `id` int(11) NOT NULL,
  `indeks_masalah` varchar(255) DEFAULT NULL,
  `kode_klasifikasi` varchar(255) DEFAULT NULL,
  `uraian_informasi` varchar(255) DEFAULT NULL,
  `tanggal` date DEFAULT NULL,
  `jumlah` int(11) DEFAULT NULL,
  `keterangan` varchar(255) DEFAULT NULL,
  `file_pdf` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `arsip`
--

INSERT INTO `arsip` (`id`, `indeks_masalah`, `kode_klasifikasi`, `uraian_informasi`, `tanggal`, `jumlah`, `keterangan`, `file_pdf`, `createdAt`, `updatedAt`) VALUES
(2, 'Kepegawaian', 'KP.01', 'Surat pengangkatan pegawai baru tahun 2026', '2026-06-02', 3, 'user1', 'KP.01_2026-06-02_165341.pdf', '2026-06-08 09:53:49', '2026-06-08 09:53:49'),
(3, 'Umum', 'TI.00.01', 'Surat Informasi ', '2026-06-03', 2, 'user1', 'TI.00.01_2026-06-03_165520.pdf', '2026-06-08 09:55:28', '2026-06-08 09:55:28'),
(4, 'Keuangan', 'KU.02.02', 'Laporan realisasi anggaran triwulan I tahun 2026', '2025-07-07', 25, 'user1', 'KU.02.02_2025-07-07_165632.pdf', '2026-06-08 09:56:39', '2026-06-08 09:56:39'),
(5, 'Pengadaan', 'KP.02', 'Dokumen kontrak pengadaan pegawai baru', '2026-06-05', 18, 'user1', 'KP.02_2026-06-05_165714.pdf', '2026-06-08 09:57:21', '2026-06-08 09:57:21');

-- --------------------------------------------------------

--
-- Table structure for table `indeks`
--

CREATE TABLE `indeks` (
  `id` int(11) NOT NULL,
  `indeks_masalah` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `indeks`
--

INSERT INTO `indeks` (`id`, `indeks_masalah`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'pengelolaan', 'sudah disetujui', '2026-01-06 03:42:41', '2026-01-06 03:44:54'),
(2, 'Kepegawaian', 'sudah disetujui', '2026-06-08 09:49:56', '2026-06-08 09:53:08'),
(3, 'Keuangan', 'sudah disetujui', '2026-06-08 09:50:00', '2026-06-08 09:53:07'),
(4, 'Umum', 'sudah disetujui', '2026-06-08 09:50:04', '2026-06-08 09:53:06'),
(5, 'Pengadaan', 'sudah disetujui', '2026-06-08 09:50:09', '2026-06-08 09:50:53'),
(6, 'Kearsipan', 'sudah disetujui', '2026-06-08 09:50:12', '2026-06-08 09:50:51');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `nama_lengkap` varchar(255) NOT NULL,
  `tahun_lahir` int(255) NOT NULL,
  `nomor_telepon` varchar(16) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `roles` int(11) NOT NULL,
  `refresh_token` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `nama_lengkap`, `tahun_lahir`, `nomor_telepon`, `username`, `password`, `roles`, `refresh_token`, `createdAt`, `updatedAt`) VALUES
(1, 'admin@gmail.com', 'aku adalah admin', 1967, '08767676767', 'admin', '$2b$10$jZNtKWnnIqBAxO3oIWA.O.g2DUhkyJRr1lq.0wK6zzUVpL2Qu8MgO', 1, NULL, '2026-01-06 02:27:05', '2026-06-09 15:10:25'),
(2, 'pengelola@gmail.com', 'pengelola kelolaan', 2000, '08676767', 'pengelola1', '$2b$10$6Mdk9KHuUHGwDFJib2EFCecZ.IiBcc/dmsa88qMhDUMO/w9YW.uvq', 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInVzZXJuYW1lIjoicGVuZ2Vsb2xhMSIsImVtYWlsIjoicGVuZ2Vsb2xhQGdtYWlsLmNvbSIsInJvbGUiOjIsImlhdCI6MTc4MTAxODQ3OSwiZXhwIjoxNzgxMTA0ODc5fQ.QKzvU5ET8fYbp3TQP8AiUHe5M-hfvlb5Vt9N5ojpC6c', '2026-01-06 03:41:08', '2026-06-09 15:21:19'),
(3, 'user@gmail.com', 'aku adalah user', 2067, '0876767', 'user1', '$2b$10$tSeHS6hiwbyvZycDZxBJCOUJmdB34EyL1jRpvLkcZ3tfEJBX46ZWm', 3, NULL, '2026-01-06 03:41:34', '2026-06-09 15:21:12');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `arsip`
--
ALTER TABLE `arsip`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `indeks`
--
ALTER TABLE `indeks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `arsip`
--
ALTER TABLE `arsip`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `indeks`
--
ALTER TABLE `indeks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
