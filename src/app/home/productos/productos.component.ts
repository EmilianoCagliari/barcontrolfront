import { Component } from '@angular/core';

interface ProductoInterface {
  id: Number,
  name: string,
  price: string,
  quantity: Number,
  brand_id: Number,
  type: string,
  initialWeight: string,
  updatedAt: string,
  createdAt: string
}


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {

 data: ProductoInterface[] = [
  {
    "id": 1,
    "name": "Ergonomic Steel Gloves",
    "price": "711.14",
    "quantity": 449,
    "brand_id": 1,
    "type": "Aguardiente",
    "initialWeight": "282.85",
    "updatedAt": "2023-10-23T15:01:59.842Z",
    "createdAt": "2023-10-23T15:01:59.842Z"
  },
  {
    "id": 2,
    "name": "Red Leather Jacket",
    "price": "399.99",
    "quantity": 100,
    "brand_id": 2,
    "type": "Clothing",
    "initialWeight": "800.50",
    "updatedAt": "2023-10-23T15:01:59.842Z",
    "createdAt": "2023-10-23T15:01:59.842Z"
  },
  {
    "id": 3,
    "name": "Classic Black Shoes",
    "price": "149.99",
    "quantity": 200,
    "brand_id": 3,
    "type": "Footwear",
    "initialWeight": "500.75",
    "updatedAt": "2023-10-23T15:01:59.842Z",
    "createdAt": "2023-10-23T15:01:59.842Z"
  },
  {
    "id": 4,
    "name": "Wooden Coffee Table",
    "price": "299.99",
    "quantity": 50,
    "brand_id": 4,
    "type": "Furniture",
    "initialWeight": "120.00",
    "updatedAt": "2023-10-23T15:01:59.842Z",
    "createdAt": "2023-10-23T15:01:59.842Z"
  },
  {
    "id": 5,
    "name": "Stainless Steel Watch",
    "price": "199.99",
    "quantity": 150,
    "brand_id": 5,
    "type": "Watches",
    "initialWeight": "100.50",
    "updatedAt": "2023-10-23T15:01:59.842Z",
    "createdAt": "2023-10-23T15:01:59.842Z"
  },
  {
    "id": 6,
    "name": "Laptop Bag",
    "price": "49.99",
    "quantity": 300,
    "brand_id": 6,
    "type": "Bags",
    "initialWeight": "600.25",
    "updatedAt": "2023-10-23T15:01:59.842Z",
    "createdAt": "2023-10-23T15:01:59.842Z"
  },
  {
    "id": 7,
    "name": "Bluetooth Speaker",
    "price": "89.99",
    "quantity": 100,
    "brand_id": 7,
    "type": "Electronics",
    "initialWeight": "2.50",
    "updatedAt": "2023-10-23T15:01:59.842Z",
    "createdAt": "2023-10-23T15:01:59.842Z"
  },
  {
    "id": 8,
    "name": "Cotton Bed Sheets",
    "price": "29.99",
    "quantity": 300,
    "brand_id": 8,
    "type": "Bedding",
    "initialWeight": "900.10",
    "updatedAt": "2023-10-23T15:01:59.842Z",
    "createdAt": "2023-10-23T15:01:59.842Z"
  },
  {
    "id": 9,
    "name": "Gourmet Coffee Beans",
    "price": "15.99",
    "quantity": 500,
    "brand_id": 9,
    "type": "Coffee",
    "initialWeight": "250.75",
    "updatedAt": "2023-10-23T15:01:59.842Z",
    "createdAt": "2023-10-23T15:01:59.842Z"
  },
  {
    "id": 10,
    "name": "LED Desk Lamp",
    "price": "39.99",
    "quantity": 200,
    "brand_id": 10,
    "type": "Lighting",
    "initialWeight": "2.00",
    "updatedAt": "2023-10-23T15:01:59.842Z",
    "createdAt": "2023-10-23T15:01:59.842Z"
  },
  {
    "id": 11,
    "name": "Designer Sunglasses",
    "price": "79.99",
    "quantity": 100,
    "brand_id": 11,
    "type": "Eyewear",
    "initialWeight": "0.50",
    "updatedAt": "2023-10-23T15:01:59.842Z",
    "createdAt": "2023-10-23T15:01:59.842Z"
  },
  {
    "id": 12,
    "name": "Smartphone Case",
    "price": "9.99",
    "quantity": 500,
    "brand_id": 12,
    "type": "Accessories",
    "initialWeight": "0.25",
    "updatedAt": "2023-10-23T15:01:59.842Z",
    "createdAt": "2023-10-23T15:01:59.842Z"
  },
  {
    "id": 13,
    "name": "Vintage Vinyl Records",
    "price": "29.99",
    "quantity": 200,
    "brand_id": 13,
    "type": "Music",
    "initialWeight": "5.75",
    "updatedAt": "2023-10-23T15:01:59.842Z",
    "createdAt": "2023-10-23T15:01:59.842Z"
  },
  {
    "id": 14,
    "name": "Travel Backpack",
    "price": "69.99",
    "quantity": 150,
    "brand_id": 14,
    "type": "Bags",
    "initialWeight": "700.50",
    "updatedAt": "2023-10-23T15:01:59.842Z",
    "createdAt": "2023-10-23T15:01:59.842Z"
  },
  {
    "id": 15,
    "name": "Stainless Steel Water Bottle",
    "price": "19.99",
    "quantity": 300,
    "brand_id": 15,
    "type": "Drinkware",
    "initialWeight": "0.75",
    "updatedAt": "2023-10-23T15:01:59.842Z",
    "createdAt": "2023-10-23T15:01:59.842Z"
  }
];




}
