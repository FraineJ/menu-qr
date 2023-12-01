import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import {
  ConfirmationService,
  Message,
  MessageService,
  ConfirmEventType,
  MenuItem,
} from 'primeng/api';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessageService, ConfirmationService, ],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  title = 'menu-restaurant';
  visible = false;
  ShowShoppingCartBool = false;
  productDetail: any;
  shoppingCart: any[] = [];
  inputsFormGroup: any;
  dataForm!: FormGroup;
  total: number = 0;
  pedidos: any[] = [];
  messages: any[] = [];
  menus = [
    {
      id: 1,
      name: 'Chicken McNuggets 4 un',
      description:
        'Elige tu mccombo™ de 10 piezas de pollo apanados acompañados de papas grandes y gaseosa grande a elegir',
      image:
        'https://media.istockphoto.com/id/1206323282/es/foto/hamburguesa-jugosa-sobre-fondo-blanco.jpg?s=612x612&w=0&k=20&c=r2mLaVFZxtRk4MeKpdQLtwTkcctyOpGEP-OxPeyo4_c=',
      price: 45607,
    },
    {
      id: 2,
      name: 'Mccombo Grande Mcnifica',
      description:
        'Elige tu mccombo™ de hamburguesa con carne de res de 125gr, queso cheddar, lechuga, tomate, cebolla, salsa de tomate, mayonesa y mostaza con papas grandes y gaseosa grande a elegir',
      image:
        'https://media.istockphoto.com/id/1206323282/es/foto/hamburguesa-jugosa-sobre-fondo-blanco.jpg?s=612x612&w=0&k=20&c=r2mLaVFZxtRk4MeKpdQLtwTkcctyOpGEP-OxPeyo4_c=',
      price: 45607,
    },
    {
      id: 3,
      name: 'Mccombo Grande Mcbacon',
      description:
        'Elige tu mccombo™ de hamburguesa con dos carnes de res de 50gr c/u, tocineta, queso cheddar, cebolla, salsa de tomate y mostaza con papas grandes y gaseosa grande a elegir',
      image:
        'https://images.rappi.com/products/tmp3078896812093154234684639022.png?e=webp&d=511x511&q=85',
      price: 45607,
    },
    {
      id: 4,
      name: 'Mccombo Grande Mcbacon',
      description:
        'Elige tu mccombo™ de hamburguesa con dos carnes de res de 50gr c/u, tocineta, queso cheddar, cebolla, salsa de tomate y mostaza con papas grandes y gaseosa grande a elegir',
      image:
        'https://images.rappi.com/products/tmp3078896812093154234684639022.png?e=webp&d=511x511&q=85',
      price: 45607,
    },
    {
      id: 4,
      name: 'Mccombo Grande Mcbacon',
      description:
        'Elige tu mccombo™ de hamburguesa con dos carnes de res de 50gr c/u, tocineta, queso cheddar, cebolla, salsa de tomate y mostaza con papas grandes y gaseosa grande a elegir',
      image:
        'https://images.rappi.com/products/tmp3078896812093154234684639022.png?e=webp&d=511x511&q=85',
      price: 45607,
    },
    {
      id: 5,
      name: 'Mccombo Grande Mcbacon',
      description:
        'Elige tu mccombo™ de hamburguesa con dos carnes de res de 50gr c/u, tocineta, queso cheddar, cebolla, salsa de tomate y mostaza con papas grandes y gaseosa grande a elegir',
      image:
        'https://images.rappi.com/products/tmp3078896812093154234684639022.png?e=webp&d=511x511&q=85',
      price: 45607,
    },
  ];
  items: any[] = [];
  visiblePayment = false;
  itemsStep: MenuItem[] = [];
  activeIndex: number = 0;

  constructor(
    private _productService: ProductService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.itemsStep = [
      {
        label: 'Método de Pago',
        routerLink: 'personal',
      },
      {
        label: 'Información Personal',
        routerLink: 'payment',
      },
    ];

    this.items = [
      {
        icon: 'pi pi-refresh',
        command: () => {
          this.showShoppingCart();
        },
      },
    ];
  }

  async initialForms() {
    const arrayGroup: any[] = [];
    const group: any = {};

    for (const variable of this.shoppingCart) {
      group['producto' + variable.id] = new FormControl(1);
    }

    this.inputsFormGroup = new FormGroup(group);
    //variable.category = this.inputsFormGroup; // Asignar el FormGroup a la propiedad "category"
    arrayGroup.push(this.inputsFormGroup);
    this.dataForm = this.inputsFormGroup;
  }

  viewDetailProduct(product: any) {
    console.log(product);
    this.visible = true;
    this.productDetail = product;
  }

  addShoppingCart(product: any) {
    const productoExiste = this.shoppingCart.some(
      (element) => element.id === product.id
    );
    if (!productoExiste) {
      this.shoppingCart.push(product);
      this.total = this.total + product.price;
      let orden = {
        idProducto: product.id,
        cantidad: 1,
        valor: product.price,
      };
      this.pedidos.push(orden);

      this.messageService.add({
        severity: 'success',
        summary: 'Carro de compra',
        detail: 'Producto agregado con éxito',
      });
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Producto ya agregado',
        detail: 'este producto ya ha sido agregado',
      });
    }
  }

  showShoppingCart() {
    this.initialForms().then(() => {
      this.ShowShoppingCartBool = !this.ShowShoppingCartBool;
    });
  }

  payment() {
    this.visiblePayment = true;
  }

  sendOrder() {
    this._productService.createOrder(this.shoppingCart).then((value: any) => {
      console.log(value);
    });
  }

  calcularCantidad(product?: any, cantidad?: any) {
    this.total = 0; // Inicializar el total dentro de la función

    localStorage.setItem('producto' + product.id, cantidad);

    for (let i = 0; i < this.pedidos.length; i++) {
      if (product.id === this.pedidos[i].idProducto) {
        this.pedidos[i].cantidad = cantidad;
      }
    }

    for (let i = 0; i < this.pedidos.length; i++) {
      this.total += this.pedidos[i].valor * this.pedidos[i].cantidad;
    }

    return this.total;
  }

  deleteShoppingCart() {
    this.shoppingCart = [];
    this.pedidos = [];
    this.total = 0;
  }

  confirm1() {
    this.confirmationService.confirm({
      message: 'Estas seguro que deseas vaciar el carro de compras',
      header: 'Vaciar carro',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteShoppingCart();
        this.messageService.add({
          severity: 'success',
          summary: 'Confirmed',
          detail: 'You have accepted',
        });
      },
      reject: (type: any) => {},
    });
  }

  nextPage() {
    if (this.activeIndex < 1) {
      this.activeIndex += 1;
      this.recibirData(event);
    }
  }

  prevPage() {
    if (this.activeIndex == 1) {
      this.activeIndex -= 1;
    }
  }

  recibirData(event: any) {
    let data = event.data;
    localStorage.setItem("formPayment", data);
    this.activeIndex = event.item;
    this._productService.saveInfoPayment(data).then((response) => {
      console.log(response);
    });
  }

  saveInfoUser(event: any) {
    this._productService.saveInfoUser(event).then((response) => {
      this.sendOrder();
      this.visiblePayment = false;
      this.shoppingCart = [];
      this.activeIndex = 0;
      this.messageService.add({
        severity: 'success',
        summary: 'Pedido Enviado',
        detail: 'Pedido enviado con éxito',
      });
    });
  }

  updateItemCurrent(event: any) {
    this.activeIndex = event;
  }
}
