extern crate hyper;

use std::io::prelude::*;
use std::io::BufReader;
use std::fs::File;

use hyper::server::{Request, Response};
use hyper::uri::RequestUri::AbsolutePath;

pub fn root(_: Request, res: Response) {
  serve("/www/index.html", res);
}

pub fn serve_static(req: Request, res: Response) {
  match req.uri {
    AbsolutePath(ref path) => {
      serve(path, res);
    }
    _ => {
      println!("{:#?}", req.uri);
      panic!("File not found");
    }
  };
}

pub fn greet(req: Request, res: Response) {
  println!("{}", req.uri);
  res.send(b"Hello, world.").unwrap();
}

fn serve(path: &str, res: Response) {
  let p = if path.starts_with("/") { [".", path].concat() } else { path.to_string() };
  let file = File::open(p).unwrap();
  let mut buf_reader = BufReader::new(file);
  let mut contents = Vec::new();
  buf_reader.read_to_end(&mut contents).unwrap();
  res.send(&contents).unwrap();
}
