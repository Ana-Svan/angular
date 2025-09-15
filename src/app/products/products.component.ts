import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../products.model';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { CartService } from '../services/cart.service';
import { SearchPipe } from '../pipe/search.pipe';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule, SearchPipe],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  filteredProducts: Product[] = [];
  showList: boolean = true;
  searchTerm: string = '';
  filters = {
    nuts: false,
    vegetables: false,
    spiceLevel: 0,
    categoryId: null
  };
  spiceLabels = ['Not Chosen', '1', '2', '3', '4'];
  categories: any[] = [];

  constructor(private http: HttpClient, private cartService: CartService) {}

  ngOnInit() {
    this.getAllProducts();
    this.getAllCategories();
  }

  getAllProducts() {
    this.http
      .get<any[]>('https://restaurant.stepprojects.ge/api/Products/GetAll')
      .subscribe({
        next: data => {
          this.filteredProducts = data; 
          console.log('Products:', this.filteredProducts);
        },
        error: err => {
          console.error('Error:', err);
        }
      });
  }
  
  getAllCategories() {
    this.http
      .get<any[]>('https://restaurant.stepprojects.ge/api/Categories/GetAll')
      .subscribe({
        next: data => {
          this.categories = data;
        },
        error: err => {
          console.error('Error:', err);
        }
      });
  }
  
  addToCart(quantity: number, price: number, productId: number) {
     this.cartService.addToCart(quantity, price, productId);
  }

  filterProducts() {
    // Build query params
    let params = new HttpParams()
      .set('vegeterian', this.filters.vegetables.toString())
      .set('nuts', this.filters.nuts.toString());

    if (this.filters.spiceLevel > 0) {  // 0 = "Not Chosen"
      params = params.set('spiciness', this.filters.spiceLevel.toString());
    }

    if (this.filters.categoryId !== null) {
      params = params.set('categoryId', this.filters.categoryId);
    }

    this.http
      .get<any[]>('https://restaurant.stepprojects.ge/api/Products/GetFiltered', { params })
      .subscribe({
        next: data => {
          this.filteredProducts = data;
          console.log('Products:', this.filteredProducts);
        },
        error: err => {
          console.error('Error:', err);
        }
      });
  }

  getSpiceLabel(): string {
     return this.spiceLabels[this.filters.spiceLevel] || 'Not Chosen';
  }

 

}
