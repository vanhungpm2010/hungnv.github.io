'use strict';

const Route = use('Route');
Route.on('/index').render('page/index');
Route.on('/guide').render('page/guide');
Route.on('/scan').render('page/scan');
Route.on('/success').render('page/success');
Route.on('/error').render('page/error');
Route.on('/takephoto').render('page/take-photo');

Route.any('/', 'DashboardController.dashboard')
  .middleware(['authsess']);


Route.on('/table').render('page/data-table');
Route.on('/form').render('page/form');

// Login
Route.any('login', 'AuthController.login').as('login');
Route.any('logout', 'AuthController.logout');

// Authentication
Route.group(() => {
  // Dashboard
  Route.any('/dashboard', 'DashboardController.dashboard').as('dashboard');

  // Managment
  Route.post('change-password', 'AuthController.changePassword');

  // User
  Route.post('users', 'UserController.index');

  // Survey
  Route.get('survey', 'SurveyController.survey').as('survey');
  Route.post('survey', 'SurveyController.survey');
})
  .prefix('admin')
  .middleware(['authsess']);
