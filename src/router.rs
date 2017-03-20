extern crate hyper;
extern crate hyper_router;

use hyper_router::{Route, RouterBuilder};

use controller;

pub fn router() -> hyper_router::Router {
  RouterBuilder::new()
    .add(Route::get("/greet").using(controller::basic_handler))
    .build()
}
