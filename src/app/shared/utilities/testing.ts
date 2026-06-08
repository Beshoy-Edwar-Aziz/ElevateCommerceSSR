import { TokenInterface } from "../../core/auth/models/token-interface";
import { Cart } from "../../features/cart/models/Cart.interface";
import { OrdersInterface } from "../../features/orders/models/orders-interface";
import { productsInterface } from "../../features/products/models/products-interface";

export let MOCK_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZGJiN2M5NjYxNDEyNTE3MjllZmVjNCIsIm5hbWUiOiJCb3NoIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3ODA4NjczMTMsImV4cCI6MTc4ODY0MzMxM30.dC9FtpV8Uw8ecBQ2lGPF2bmI3bk_vvHhuOe27L-PpP4";
export let MOCK_RETURN_VALUE_TOKEN:TokenInterface={
  completed:true,
  id:'69dbb7c966141251729efec4',
  name:'Bosh',
  userId:2
}
export let MOCK_GET_LOGGED_USER_ORDERS:OrdersInterface = {
__v:1,
_id:'awdwad',
cartItems:[{
  _id:'dawdaw',
  count:2,
price:22,
product:'adw'}],
createdAt:'4454545454',
id:2,
isDelivered:false,
isPaid:false,
paymentMethodType:'cash',
shippingAddress:{
  city:'adaw',
  details:'awdwad',
  phone:'01201493556'
},
shippingPrice:555,
taxPrice:554,
totalOrderPrice:1000,
updatedAt:'2555555',
user:'wadawd'
}
export let MOCK_CART:Cart={
  cartId:'6a1339b3fc33d800120f1efa',
  data:
    {
      cartOwner:'69dbb7c966141251729efec4',
      createdAt:'2026-05-24T17:47:31.289Z',
      totalCartPrice:149,
      updatedAt:'2026-05-24T17:47:31.327Z',
      products:[
        {
                "count": 1,
                "_id": "6a1339b3fc33d800120f1efb",
                "product": {
                    "subcategory": [
                        {
                            "_id": "6407f1bcb575d3b90bf95797",
                            "name": "Women's Clothing",
                            "slug": "women's-clothing",
                            "category": "6439d58a0049ad0b52b9003f"
                        }
                    ],
                    "_id": "6428eb43dc1175abc65ca0b3",
                    "title": "Woman Shawl",
                    "quantity": 220,
                    "imageCover": "https://ecommerce.routemisr.com/Route-Academy-products/1680403266739-cover.jpeg",
                    "category": {
                        "_id": "6439d58a0049ad0b52b9003f",
                        "name": "Women's Fashion",
                        "slug": "women's-fashion",
                        "image": "https://ecommerce.routemisr.com/Route-Academy-categories/1681511818071.jpeg"
                    },
                    "brand": {
                        "_id": "64089bbe24b25627a253158b",
                        "name": "DeFacto",
                        "slug": "defacto",
                        "image": "https://ecommerce.routemisr.com/Route-Academy-brands/1678285758109.png"
                    },
                    "ratingsAverage": 3.7,
                    "id": "6428eb43dc1175abc65ca0b3",
                    slug:'awdwa'
                },
                "price": 149
        },

      ]
    },
    message:'success',
    numOfCartItems:1,
    status:'good'

}
export let MOCK_PRODS:productsInterface[] = [{
    _id:'awdawd',
    brand:{_id:'dawd',image:"awdwad",name:"dad",slug:'daw'},
    category:{_id:'awdawd',image:'dadaw',name:'dawda',slug:'adaw'},
    createdAt:'awdawd',
    description:'adawd',
    id:'awdawd',
    imageCover:'awdaw',
    images:["awdawd"],
    price:255,
    quantity:5,
    ratingsAverage:5,
    ratingsQuantity:5,
    slug:'awdad',
    sold:2555,
    subcategory:[{_id:'dawa',category:'awd',name:'dad',slug:'dawd'}],
    title:'adaw',
    updatedAt:'awdaw'
  }]
