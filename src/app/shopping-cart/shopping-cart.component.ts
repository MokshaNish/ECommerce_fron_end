import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { OrderItem } from '../models/OrderItem';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

orderItemList:OrderItem[]=[];
  totalPrice: number =0;


  constructor(private shoppingCartService: ShoppingCartService,
    private route: ActivatedRoute) { }

  ngOnInit() {

   this.shoppingCartService.getAllCartItem().subscribe(orderItem => {
     this.orderItemList=orderItem;
      console.log(this.orderItemList);
    });

    this.getTotalPrice();
  }

  private getTotalPrice() {

    this.totalPrice = 0;

    for(let o of this.orderItemList){
      this.totalPrice += o.product.price * o.quantity + this.totalPrice;
      console.log(this.totalPrice);
    }

}
}