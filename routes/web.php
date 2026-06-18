<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PublicController;
use Illuminate\Support\Facades\Route;

Route::get('/', [PublicController::class, 'home'])->name('home');
Route::get('/gouverneur', [PublicController::class, 'gouverneur'])->name('gouverneur');
Route::get('/cabinet', [PublicController::class, 'cabinet'])->name('cabinet');
Route::get('/communes', [PublicController::class, 'communes'])->name('communes');
Route::get('/communes/{slug}', [PublicController::class, 'commune'])->name('commune');
Route::get('/actualites', [PublicController::class, 'actualites'])->name('actualites');
Route::get('/actualites/{slug}', [PublicController::class, 'article'])->name('article');
Route::get('/mediatheque', [PublicController::class, 'mediatheque'])->name('mediatheque');
Route::get('/agenda', [PublicController::class, 'agenda'])->name('agenda');
Route::get('/contact', [PublicController::class, 'contact'])->name('contact');

Route::get('/dashboard', function () {
    return redirect('/admin');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
