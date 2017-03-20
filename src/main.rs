extern crate hyper;
extern crate hyper_router;

use hyper::server::{Server, Request, Response};
use hyper::status::StatusCode;

mod router;
mod controller;

fn main() {
  Server::http("0.0.0.0:8080").unwrap()
    .handle(move |request: Request, response: Response| {
      match router::router().find_handler(&request) {
        Ok(handler) => handler(request, response),
        Err(StatusCode::NotFound) => response.send(b"not found").unwrap(),
        Err(_) => response.send(b"some error").unwrap()
      }
    }).unwrap();
}
