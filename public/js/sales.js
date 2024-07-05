$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

$(document).ready(function() {
    loadSales();

    function loadSales() {
        $.ajax({
            url: "http://localhost:8888/ANUGERAH_GROUP/public/sales",
            type: "GET",
            success: function(data) {
                let rows = '';
                data.forEach(sale => {
                    rows += `
                        <tr>
                            <td>${sale.id}</td>
                            <td>${sale.barang}</td>
                            <td>${sale.jumlah}</td>
                            <td>${sale.harga}</td>
                            <td>
                                <button class="btn btn-info" onclick="showEditForm(${sale.id})">Edit</button>
                                <button class="btn btn-danger" onclick="deleteSale(${sale.id})">Delete</button>
                            </td>
                        </tr>
                    `;
                });
                $('#sales-table').html(rows);
            }
        });
    }

    window.showCreateForm = function() {
        $('#sales-table').after(`
            <div id="create-form">
                <h2>Tambah Data Penjualan</h2>
                <form id="form-create">
                    <div class="form-group">
                        <label>Nama Produk</label>
                        <input type="text" class="form-control" name="barang" required>
                    </div>
                    <div class="form-group">
                        <label>Jumlah</label>
                        <input type="number" class="form-control" name="jumlah" required>
                    </div>
                    <div class="form-group">
                        <label>Harga</label>
                        <input type="number" step="0.01" class="form-control" name="harga" required>
                    </div>
                    <button type="submit" class="btn btn-success">Simpan</button>
                    <button type="button" class="btn btn-secondary" onclick="hideCreateForm()">Batal</button>
                </form>
            </div>
        `);

        $('#form-create').on('submit', function(e) {
            e.preventDefault();
            $.ajax({
                url: "http://localhost:8888/ANUGERAH_GROUP/public/sales",
                type: "POST",
                data: $(this).serialize(),

                success: function(data) {
                    alert('Data berhasil disimpan.');
                    loadSales();
                    hideCreateForm();
                },
                error: function(e) {
                    console.log(e);
                    alert('Gagal menyimpan data.');
                }
            });
        });
    };

    window.hideCreateForm = function() {
        $('#create-form').remove();
    };

    window.showEditForm = function(id) {
        $.ajax({
            url: `http://localhost:8888/ANUGERAH_GROUP/public/sales/${id}`,
            type: "GET",
            success: function(data) {
                $('#sales-table').after(`
                    <div id="edit-form">
                        <h2>Edit Data Penjualan</h2>
                        <form id="form-edit">
                            <div class="form-group">
                                <label>Nama Produk</label>
                                <input type="text" class="form-control" name="barang" value="${data.barang}" required>
                            </div>
                            <div class="form-group">
                                <label>Jumlah</label>
                                <input type="number" class="form-control" name="jumlah" value="${data.jumlah}" required>
                            </div>
                            <div class="form-group">
                                <label>Harga</label>
                                <input type="number" step="0.01" class="form-control" name="harga" value="${data.harga}" required>
                            </div>
                            <button type="submit" class="btn btn-success">Simpan</button>
                            <button type="button" class="btn btn-secondary" onclick="hideEditForm()">Batal</button>
                        </form>
                    </div>
                `);

                $('#form-edit').on('submit', function(e) {
                    e.preventDefault();
                    var data = {};
                    var formDataUpdate = $(this).serializeArray();
                
                    // Konversi form data yang diserialisasi menjadi objek JSON
                    formDataUpdate.forEach(function(item) {
                        data[item.name] = item.value;
                    });
                
                    console.log(data);
                
                    $.ajax({
                        url: `http://localhost:8888/ANUGERAH_GROUP/public/sales/${id}`,
                        type: "POST",
                        data: {
                            ...data,
                            _method: "PUT"
                        },
                        success: function(response) {
                            alert('Data berhasil diperbarui.');
                            loadSales();
                            hideEditForm();
                        },
                        error: function(response) {
                            console.log(response);
                            alert('Gagal memperbarui data.');
                        }
                    });
                });
                
            }
        });
    };

    window.hideEditForm = function() {
        $('#edit-form').remove();
    };

    window.deleteSale = function(id) {
        if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
            $.ajax({
                url: `http://localhost:8888/ANUGERAH_GROUP/public/sales/${id}`,
                type: "POST",
                data:{
                    _method:"DELETE"
                },
                success: function(data) {
                    alert('Data berhasil dihapus.');
                    loadSales();
                },
                error: function() {
                    alert('Gagal menghapus data.');
                }
            });
        }
    };
});
