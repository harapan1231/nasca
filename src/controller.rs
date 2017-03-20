extern crate hyper;
extern crate hyper_router;

use hyper::server::{Request, Response};

pub fn basic_handler(_: Request, res: Response) {
  res.send(b"Hello World!").unwrap();
}
