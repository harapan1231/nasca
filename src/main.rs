extern crate time;
extern crate regex;
extern crate hyper;

use regex::Regex;
use hyper::server::{Server, Request, Response};
use hyper::uri::RequestUri::AbsolutePath;

mod controller;

fn main() {
    init();
  
    Server::http("0.0.0.0:8080").unwrap()
        .handle(|req: Request, res: Response| {
            trace(&req);
  
            let path = match req.uri {
                AbsolutePath(ref path) => {
                    path.clone()
                },
                _ => {
                    println!("{:#?}", req.uri);
                    panic!("Missing path");
                }
            };
  
            match &path[..] {
                "/" => {
                    controller::root(req, res)
                },
                "/greet" => {
                    controller::greet(req, res)
                },
                _ => {
                    if Regex::new(r"^/www/.*\.(html|js|css|ico|png|jpg)$").unwrap().is_match(&path[..]) {
                        controller::serve_static(req, res)
                    } else {
                        println!("{}", path);
                        panic!("Invalid path");
                    }
                }
            };

//  RouterBuilder::new()
//    .add(Route::get("/").using(controller::root))
//    .add(Route::get(r"/www/.*\.(html|js|css|ico|png|jpg)$").using(controller::serve_static))
//    .add(Route::get("/greet").using(controller::greet))
//    .build()
//      match router::router().find_handler(&req) {
//        Ok(handler) => handler(req, res),
//        Err(StatusCode::NotFound) => res.send(b"not found").unwrap(),
//        Err(_) => res.send(b"some error").unwrap()
//      }
    }).unwrap();
}

fn init() {
  let start_tm = time::now();
  println!("--- {} Welcome to nasca ---\n", time::strftime("%Y-%m-%d", &start_tm).unwrap());
  println!("[{}] Build a server...", time::strftime("%H:%M:%S", &start_tm).unwrap());
  println!("[{}] Start listening...\n", time::strftime("%H:%M:%S", &time::now()).unwrap());
}

fn trace(req: &Request) {
  println!("[{}] {} :: {}", time::strftime("%H:%M:%S", &time::now()).unwrap(), req.method, req.uri);
}
