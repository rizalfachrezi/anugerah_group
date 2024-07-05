<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SaleController extends Controller
{
    public function index()
    {
        $sales = Sale::all();
        return response()->json($sales);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'barang' => 'required|string|max:255',
            'jumlah' => 'required|integer',
            'harga' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $sale = Sale::create($request->all());
        return response()->json($sale, 201);
    }

    public function show($id)
    {
        $sale = Sale::find($id);
        if (is_null($sale)) {
            return response()->json(['error' => 'Data tidak ditemukan'], 404);
        }
        return response()->json($sale);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'barang' => 'required|string|max:255',
            'jumlah' => 'required|integer',
            'harga' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $sale = Sale::find($id);
        if (is_null($sale)) {
            return response()->json(['error' => 'Data tidak ditemukan'], 404);
        }

        $sale->update($request->all());
        return response()->json($sale, 200);
    }

    public function destroy($id)
    {
        $sale = Sale::find($id);
        if (is_null($sale)) {
            return response()->json(['error' => 'Data tidak ditemukan'], 404);
        }

        $sale->delete();
        return response()->json(null, 204);
    }
}
