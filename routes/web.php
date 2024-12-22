<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\GalleriesController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Home');
});

Route::get('/company-introduction', function () {
    return Inertia::render('Company/Company');
});

Route::get('/business-introduction', function () {
    return Inertia::render('Business/Business');
});

Route::get('/portofolio', function () {
    return Inertia::render('Portofolio/Portofolio');
});

Route::get('/contact-us', function () {
    return Inertia::render('Contact/Contact');
});

Route::get('/graphic-design', function () {
    return Inertia::render('Homepage/Homepage');
});

// Route::get('/admin', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/admin', function () {
    return Inertia::render('Dashboard'); // Passwords "olldesignadmin"
})->middleware(['auth', 'verified'])->name('admin');

Route::get('/imaging', function () {
    return Inertia::render('Panel/Imaging/ImagingPanel');
})->middleware(['auth', 'verified'])->name('imaging');

Route::get('/tags', function () {
    return Inertia::render('Panel/Tags/ListTags');
})->middleware(['auth', 'verified'])->name('tags');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
