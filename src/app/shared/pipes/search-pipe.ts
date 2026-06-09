import { inject, Pipe, PipeTransform } from '@angular/core';
import { ProductService } from '../../features/products/services/product-service';
import { productsInterface } from '../../features/products/models/products-interface';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  private readonly productService = inject(ProductService);
  transform(products:productsInterface[],searchTerm:string) {

    return  products?.filter((value)=>value.title?.toLowerCase()?.includes(searchTerm?.toLowerCase()));
  }
}
