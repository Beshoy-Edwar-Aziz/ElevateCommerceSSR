import {
  Component,
  DestroyRef,
  ElementRef,
  inject,
  OnInit,
  signal,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { ProductService } from '../../services/product-service';
import { productsInterface } from '../../models/products-interface';
import { ProductCard } from '../product-card/product-card';
import { CartService } from '../../../cart/services/cart-service';
import { UpdateCartNumbersService } from '../../../cart/services/update-cart-numbers-service';
import { ToastrService } from 'ngx-toastr';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import { SearchPipe } from '../../../../shared/pipes/search-pipe';
import { FormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { WishListService } from '../../../wishlist/services/wish-list-service';
@Component({
  selector: 'app-product-list',
  imports: [ProductCard,SearchPipe,FormsModule,TranslatePipe],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList implements OnInit {
  private readonly productService = inject(ProductService);
  private readonly cartService = inject(CartService);
  private readonly countUpdate = inject(UpdateCartNumbersService);
  private readonly toastrService = inject(ToastrService);
  private readonly wishListService = inject(WishListService);
  products = signal<productsInterface[]>([]);
  wishListProds:WritableSignal<productsInterface[]> = signal<productsInterface[]>([]);
  inputValue:string = '';
  private destroy = inject(DestroyRef);
  getAllProds() {
    this.productService
      .getProducts()
      .pipe(takeUntilDestroyed(this.destroy))
      .subscribe({
        next: ({ data }) => {
          this.products.set(data);
        },
        error: (err) => {
          console.log(err);
        }
      });
  }
  addProductToCart(id: string) {
    this.cartService.AddProductToCart(id).pipe(takeUntilDestroyed(this.destroy)).subscribe({
      next: (res) => {
        console.log(res);
        this.countUpdate.cartDetails.emit(res);
        this.toastrService.success(res.message, 'Success');
        this.cartService.cartCounter.set(res.numOfCartItems);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  addProductToWishList(id:string){
    this.wishListService.addToWishList(id).pipe(takeUntilDestroyed(this.destroy)).subscribe({
      next:(res)=>{
        this.toastrService.success(res.message,"Success");
        this.wishListService.wishListAdded.set(res.data);
        this.getProductWishList();
      }
    })
  }
  getProductWishList(){
    this.wishListService.getWishList().pipe(takeUntilDestroyed(this.destroy)).subscribe({
      next:(res)=>{
        this.wishListProds.set(res.data);
      }
    })
  }
  ngOnInit(): void {
    console.log('ngOninit');
    this.getAllProds();
    this.getProductWishList();
  }

}
