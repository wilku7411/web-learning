"use strict";

const PLNPrice = 0.033023;

let item;
let itemPrice;
let priceOfItem;

let result = false;
do
{
    item = prompt("What is the item's name?", "coca-cola");
    itemPrice = prompt("What is the item's price?", 120);
    if(item == null || itemPrice == 0)
    {
        break;
    }
    priceOfItem = PLNPrice * itemPrice;

    let feedbackInfo = `Price of ${item} is ${priceOfItem}`; 
    alert(feedbackInfo);
    result = confirm("Do you want to check another item?", [false]);
}
while(result);