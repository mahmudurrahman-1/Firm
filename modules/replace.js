module.exports = (cards, product) => {
  let output = cards.replaceAll(/{%NAME%}/g, product.productName);
  output = output.replaceAll(/{%IMAGE%}/g, product.image);
  if (!product.organic) {
    output = output.replaceAll(/{%NOT_ORGANIC%}/g, "not-organic");
  }
  output = output.replaceAll(/{%DETAILS%}/g, product.description);
  output = output.replaceAll(/{%PRICE%}/g, product.price);
  output = output.replaceAll(/{%QUANTITY%}/g, product.quantity);
  output = output.replaceAll(/{%NUTRIENT%}/g, product.nutrients);
  output = output.replaceAll(/{%COUNTRY%}/g, product.from);
  output = output.replaceAll(/{%ID%}/g, product.id);
  return output;
};
