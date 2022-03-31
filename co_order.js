"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 13
   Tutorial Case

   Order Form Script
   
   Author: Jessica Banny
   Date:   3/25/2022
   
   Filename: co_order.js
   
   Function List
   =============
   
   calcOrder()
      Calculates the cost of the customer order
      
   formatNumber(val, decimals)
      Format a numeric value, val, using the local
      numeric format to the number of decimal
      places specified by decimals
      
   formatUSACurrency(val)
      Formats val as U.S.A. currency
   
*/

window.addEventListener("load", function(){
   // variable to provide quick refernece to the form object
   let orderForm = document.forms.orderForm;
   // go from the form to the element for the order date and change its value
   orderForm.elements.orderDate.value = new Date().toDateString();
   // adjust the focus when the page loads to the model field
   orderForm.elements.model.focus();
   //call the function to calculate the cost of the order
   calcOrder();



   // create event handlers for the webform controls when the document loads
   orderForm.elements.model.onchange = calcOrder;
   orderForm.elements.qty.onchange = calcOrder;

   // create an array all radio buttons have a name of "protection"
   let planOptions = document.querySelectorAll('input[name="protection"]');
   console.log(planOptions);

   // loop through that array and event handlers to every radio button
   for (let i = 0; i < planOptions.length; i++){   
      planOptions[i].onclick = calcOrder;

   }
});

// definition of the calcOrder() Function
function calcOrder() {
   // re-establishment of the order form variable
   let orderForm = document.forms.orderForm;
   //calculate the initial cost of the order
   let mIndex = orderForm.elements.model.selectedIndex;
   let mCost = orderForm.elements.model.options[mIndex].value;
   let qIndex = orderForm.elements.qty.selectedIndex;
   let quantity = orderForm.elements.qty.options[qIndex].value;

   // Initial cost - model cost x quantity
   let initialCost = mCost * quantity;

   // now write that initial cost to the web form
   orderForm.element.initialCost.value = formatUSCurrency(initialCost);

   
   //Use Css style selectors to retrieve cost of the protection plan
   let pCost = document.querySelector('input[name="protection"]:checked').value * quatity;
   // now write that initial cost to the web form
   orderForm.elements.initialCost.value = initialCost;

   // now write that protection cost to web form
   orderForm.elements.protectionCost.value = formatNumber(pCost, 2);

   // calculate the order subtotal
   orderForm.elements.subtotal.value = formatNumber(initalCost + pCost, 2);

   // calculate the sales tax
   let salesTax = 0.05 * (initialCost + pCost);
   // now write the sales tax amount to the web form
   orderForm.elements.salesTax.value = formatNumber(salesTax, 2);


   // calculate the cost of the total order
   let totalCost = initialCost + pCost + salesTax;
   //now write total cost amount to the webform
   orderForm.elements.totalCost.value = formatUSCurrency(totalCost);

   // Store the order details in hidden fields
   orderForm.elements.modelName.value = orderForm.elements.model.options[mIndex].text;
   orderForm.elements.protectionName.value = document.querySelector('input[name="protection"]:checked').nextSibling.nodeValue;
}

// definition of the format number function
function formatNumber(val, decimals) {
   return val.toLocaleString(undefined, 
      {minimumFractionDigits: decimals,
      maximumFractionDigits: decimals});
}

//definition of the formatUSCurrency() function
function formatUSCurrency(val) {
   return val.toLocaleString("en-US", 
      {style: "currency", currency: "USD"});
}