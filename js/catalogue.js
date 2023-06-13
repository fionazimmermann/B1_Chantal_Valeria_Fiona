// get data
const getData = async () => {
  // Daten aus dem Formular für die Datenbank bereitstellen
  const request = {
    group: "b6", // SQL Gruppen Namen
    pw: "298fd54f", // SQL Passwort
    tableName: "produkte", // Name der Tabelle in der SQL Datenbank

    columns: ["name", "preis", "bild"],
    filter: `bild is not null`
  };

  // Speichert die Daten in der Datenbank
  listProducts(await databaseClient.selectData(request));
  // return await databaseClient.selectData(request);
};

const listProducts =  (entities) => {

  for (let i = 0; i < entities[1].length; i++) {
  
    // create dom elements
    let title = document.createElement("h3");
    title.classList.add("product-model")
    let price = document.createElement("span");
    price.classList.add("product-price")
    let priceTag = document.createElement("p");
    priceTag.classList.add("product-price-tag")
    let productInfo = document.createElement("div");
    productInfo.classList.add("product-information")
    let productImg = document.createElement("img");
    productImg.src = entities[1][i].bild;
    productImg.alt = entities[1][i].name;
    let product = document.createElement("div");
  
    // insert data
    priceTag.appendChild(price).innerHTML = entities[1][i].preis;
    priceTag.appendChild(document.createTextNode(".-- CHF"));
    productInfo.appendChild(title).innerHTML = entities[1][i].name;
    productInfo.appendChild(priceTag); //.innerHTML = " CHF";
    product.appendChild(productImg);
    product.appendChild(productInfo);
    document.getElementById("product-catalogue").appendChild(product).classList.add("product");
  }
  
}

getData();