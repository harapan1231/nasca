extern crate time;
extern crate regex;
extern crate hyper;
#[macro_use]
extern crate serde_derive;
extern crate toml;

use regex::Regex;
use hyper::server::{Server, Request, Response};
use hyper::uri::RequestUri::AbsolutePath;
use std::fs::File;
use std::io::prelude::*;

mod controller;

#[derive(Deserialize, Debug)]
struct Config {
    ip: String,
    port: Option<u16>,
}

fn main() {
    let config: Config = init();
    Server::http(format!("{}:{}", config.ip, config.port.unwrap())).unwrap()
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
    }).unwrap();
}

fn init() -> Config {

    let mut file = File::open("nasca.toml").unwrap();
    let mut contents = String::new();
    file.read_to_string(&mut contents).unwrap();
    let config: Config = toml::from_str(&contents).unwrap();

    let start_tm = time::now();
    println!("--- {} Welcome to nasca ---", time::strftime("%Y-%m-%d", &start_tm).unwrap());
    println!("[{}] Build a server...", time::strftime("%H:%M:%S", &start_tm).unwrap());
    println!("[{}] Start listening on {}:{}...", time::strftime("%H:%M:%S", &time::now()).unwrap(), config.ip, config.port.unwrap());

    config
}

fn trace(req: &Request) {
    println!("[{}] {} :: {}", time::strftime("%H:%M:%S", &time::now()).unwrap(), req.method, req.uri);
}
