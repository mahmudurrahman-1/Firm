const fs = require("fs");
const http = require("http");
const url = require("url");
const replacePlaceholders = require("./modules/replace");
const slugify = require("slugify");
/*
All html files 
*/
const OverView = fs.readFileSync(
  `${__dirname}/templates/overview.html`,
  "utf-8"
);
const product = fs.readFileSync(`${__dirname}/templates/product.html`, "utf-8");
const Cards = fs.readFileSync(`${__dirname}/templates/Cards.html`, "utf-8");
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }));
console.log(slugs);
/********
 * Main
 */
const httpProtocol = http.createServer((req, res) => {
  //   console.log(Url.parser(req.url, true));
  const { query, pathname } = url.parse(req.url, true);
  if (pathname === "/overview" || pathname === "/") {
    res.writeHead(200, { "Content-type": "text/html" });
    const AllCard = dataObj
      .map((el) => replacePlaceholders(Cards, el))
      .join("");
    const output = OverView.replace(/{%CARDS%}/g, AllCard);
    res.end(output);
  } else if (pathname === "/product") {
    const prod = dataObj[query.id];
    const output = replacePlaceholders(product, prod);
    res.end(output);
  }
});

httpProtocol.listen(7000, "127.0.0.1", () => {
  console.log("I'm listening");
});
