extern crate hyper;
extern crate hyper_router;

use hyper::server::{Request, Response};

pub fn root(_: Request, res: Response) {
  res.send(b"Hello World!").unwrap();
}

pub fn serve_static(_: Request, res: Response) {
  res.send(b"Hello World!").unwrap();
}

pub fn greet(req: Request, res: Response) {
  println!("{}", req.uri);
  res.send(b"aaa").unwrap();
}
