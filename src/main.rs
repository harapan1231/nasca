extern crate time;
extern crate hyper;
extern crate hyper_router;

use hyper::server::{Server, Request, Response};
use hyper::status::StatusCode;

mod router;
mod controller;

fn main() {
  init();
  
  Server::http("0.0.0.0:8080").unwrap()
    .handle(move |req: Request, res: Response| {
      trace(&req);

      match router::router().find_handler(&req) {
        Ok(handler) => handler(req, res),
        Err(StatusCode::NotFound) => res.send(b"not found").unwrap(),
        Err(_) => res.send(b"some error").unwrap()
      }
    }).unwrap();
}

fn init() {
  let start_tm = time::now();
  println!("--- {} Welcome to nasca ---\n", time::strftime("%Y-%m-%d", &start_tm).unwrap());
  println!("[{}] Build a server...", time::strftime("%H:%M:%S", &start_tm).unwrap());
  println!("[{}] Start listening...\n", time::strftime("%H:%M:%S", &time::now()).unwrap());
}

fn trace(req: &Request) {
  println!("[{}] accepted = {} :: {}", time::strftime("%H:%M:%S", &time::now()).unwrap(), req.method, req.uri);
}
