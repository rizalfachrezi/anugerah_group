<!DOCTYPE html>
<html>
<head>
    <title>ANUGERAH GROUP</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.2/css/bootstrap.min.css">
</head>
<body>
<div class="container mt-5">
    <div id="app">
        <h1>Data Penjualan</h1>
        <button class="btn btn-primary mb-3" onclick="showCreateForm()">Tambah Data</button>
        <table class="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nama Produk</th>
                    <th>Jumlah</th>
                    <th>Harga</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody id="sales-table">
                <!-- Data akan dimuat di sini menggunakan AJAX -->
            </tbody>
        </table>
    </div>
</div>

<!-- jQuery dan Bootstrap JS -->
<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.bundle.min.js"></script>
<!-- Link ke file JavaScript baru -->
<script src="{{ asset('js/sales.js') }}"></script>
</body>
</html>
