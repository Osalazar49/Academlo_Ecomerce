

let arrayimages=[{id:1, img:"./img/featured1.png",Price:14,Stock:10,Name:"Hoddies"},{id:2, img:"./img/featured2.png",Price:14,Stock:10,Name:"Shirts"},{id:3, img:"./img/featured3.png",Price:14,Stock:10, Name:"Sweetshirts"}]; 
        
const images=document.querySelector(".images");
const cartShopping = document.querySelector(".cartShopping");
const containerShopping = document.querySelector(".container__shopping");
const contentShopping = document.querySelector(".content_shopping");
const shoppingTotal = document.querySelector(".shoppingTotal");
const btnBuy = document.querySelector("#btnBuy");
const infoQuatityProducts = document.querySelector(".infoQuatityProducts");
const content_Items = document.querySelector(".content_Items");     
        




 let html="";
     

  const order={}; 
  


     for (let i=0; i<arrayimages.length;i++) {
      

       html += ` <div class="shirt">

       <img src="${arrayimages[i].img}"alt="" class="img_shirt1">
      
       <div class="caja">
      
          <ul> 
              <li> <h2>Price: ${arrayimages[i].Price}</h2></li>
              <li> Stock: ${arrayimages[i].Stock}</li>
          </ul>
      
          <p>${arrayimages[i].Name}</p>


          </div>

          <button data-id="${arrayimages[i].id}" class="btn"> + </button>

          </div>`;
          
          
        }

           images.innerHTML=html;  
       


           contentShopping.addEventListener("click", (event) => {
            if (event.target.classList.contains("rest")) {
                const id = parseInt(event.target.parentElement.id);
        
                if (order[id].amount === 1) {
                    const res = confirm("seguro quieres eliminar esto?");
        
                    if (res) {
                        delete order[id];
                    }
                } else {
                    order[id].amount--;
                }
            }
        
            if (event.target.classList.contains("add")) {
                const id = parseInt(event.target.parentElement.id);
        
                if (order[id].Stock > order[id].amount) {
                    order[id].amount++;
                } else {
                    alert("No tenemos disnibilidad");
                }
            }
        
            if (event.target.classList.contains("del")) {
                const id = parseInt(event.target.parentElement.id);
        
                const res = confirm("seguro quieres eliminar esto?");
        
                if (res) {
                    delete order[id];
                }
            }
        
            amountProductInCart();
            printTotalPrice();
            printShoppingCart();
        });
        
     

        


document.addEventListener ("click",function(event) {

    if(event.target.classList.contains("btn")) {
     
       const  idUser=event.target.dataset.id;

         let shirtValue=null;

         for(let i=0; i<arrayimages.length;i++) {

           if(arrayimages[i].id===parseInt(idUser)) { 

             shirtValue=arrayimages[i]; 
          
          
          }
        
        }
        if (order[shirtValue.id]) {

          order[shirtValue.id].amount++;}
          else {
            order[shirtValue.id]=shirtValue;

            order[shirtValue.id].amount= 1; 
          }

          console.log(order); 
            
         printShoppingCart() 
         amountProductInCart()
         printTotalPrice() 

        }})


    content_Items.addEventListener("click", (event) => {
    if (event.target.classList.contains("add_principal")) {
        const id = parseInt(event.target.parentElement.id);

        const [currentProduct] = data.filter((n) => n.id === id);

        if (order[id]) {
            if (order[id].Stock > order[id].amount) {
                order[id].amount++;
            } else {
                alert("No tenemos disnibilidad");
            }
        } else {
            if (!currentProduct.Stock) return alert("No hay en el inventario");
           order[id] = currentProduct;
            order[id].amount = 1;
        }

        amountProductInCart();
        printTotalPrice();
        printShoppingCart();
    }
});


  

        function amountProductInCart() {
          infoQuatityProducts.textContent = Object.values(order).length;
      }
      
          
        function printShoppingCart() {
          const shoppingArray = Object.values(order);
      
          let html = "";
      
          shoppingArray.forEach(({ id, img, Price, Stock,Name, amount }) => {
              html += `
                  <div class="shopping">
                      <div class="shopping__header">
                          <div class="shopping__img">
                              <img src="${img}" alt="${Name}" class=img_sweeters>
                          </div>
                          <div class="shopping__info">
                              <p>nombre: ${Name}</p>
                              <p>precio: ${Price}</p>
                              <p>stock: ${Stock}</p>
                          </div>
                      </div>
      
                      <div class="shopping__actions" id="${id}">
                          <span class="rest">-</span>
                          <b class="amount">${amount}</b>
                          <span class="add">+</span>
                          <i class='bx bxs-trash del'></i>
                      </div>
                  </div>`;
          });
      
          contentShopping.innerHTML = html;
      }
        
      function printTotalPrice() {
        const shoppingArray = Object.values(order);
    
        let suma = 0;
    
        shoppingArray.forEach((n) => {
            suma += n.amount * n.Price;
        });
    
        shoppingTotal.textContent = suma;
    }
      
        


    // printItems(arrayimages);

 
    
    btnBuy.addEventListener("click", () => {
        const res = confirm("Desea solicitar pedido?");
    
        if (res) {
            const shopping = Object.entries(order);
    
            data = data.map((eData) => {
                const productInShopping = shopping.find(
                    (product) => parseInt(product[0]) === eData.id
                );
    
                if (!productInShopping) return eData;
    
                return {
                    ...eData,
                    stock: eData.stock - productInShopping[1].amount,
                };
            });
    
            order = {};
            shoppingTotal.textContent = 0;
            infoQuatityProducts.textContent = 0;
    
            printShoppingCart();
            // printItems(arrayimages);
        }
    });
    
          
          

              
    cartShopping.addEventListener("click", () => {
      containerShopping.classList.toggle("show__shopping");
  });
      
          
          
   
// function printItems(array) {
//   let html = "";

//   array.forEach(({id, img, Price, Stock,Name}) => {
//       html += `
//       <div class="food">
//           <div class="food__img">
//               <img src="${img}" alt="">
//           </div>
//           <div class="food__info">
//               <p class="food__info-name">nombre: ${Name}</p>
//               <p class="food__info-stock">stock: ${Stock}</p>
//               <p class="food__info-price">precio: ${Price}</p>
//           </div>
//           <div class="food__action" id="${id}">
//               <button class="add_principal">Agregar</button>
//           </div>
//       </div>`;
//   });

//   content_Items.innerHTML = html;
// }      
          
     











