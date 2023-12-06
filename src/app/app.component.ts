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
  providers: [MessageService, ConfirmationService],
  encapsulation: ViewEncapsulation.None,
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
      name: 'Ensalada de lechuga',
      description:
        'Exquisita ensalada fresca con una base de lechuga crujiente, acompañada de jugosos tomates, cebolla tierna para un toque de dulzura y un aliño perfecto de aceite de oliva virgen y vinagre de vino blanco que realza los sabores de cada ingrediente, creando una combinación deliciosa y saludable.',
      image: '../assets/img/ensalada_1.jpg',
      price: 15000,
    },
    {
      id: 2,
      name: 'Ensalada de tomate',
      description:
        'Una cautivadora ensalada de tomate que fusiona la intensidad del pimiento rojo, la frescura de los tomates cherry y la sofisticación de las hojas de rúcula. Complementada con la suavidad de la cebolla blanca, realzada por la armoniosa combinación de vinagre balsámico y aceite de oliva, esta creación culinaria se completa con la textura crujiente de las almendras, ofreciendo una experiencia gastronómica vibrante y llena de matices.',
      image:
        '../assets/img/ensalada_2.jpg',
      price: 25000,
    },
    {
      id: 3,
      name: 'Ensalada de frijoles',
      description:
        'Una ensalada de frijoles que despierta el paladar con una combinación exquisita de frijoles, garbanzos, habichuelas coloradas, pepinos frescos, pimientos vibrantes y la frescura aromática del cilantro. Esta explosión de sabores y texturas se une en una sinfonía deliciosa, donde la cremosidad de los frijoles se entrelaza con la firmeza de los garbanzos y las habichuelas, mientras los pepinos aportan un toque refrescante y los pimientos añaden un matiz picante. La presencia fragante del cilantro completa esta ensalada, creando una experiencia culinaria que celebra la riqueza y variedad de los ingredientes en cada bocado.',
      image:
        '../assets/img/ensalada_3.jpg',
      price: 35000,
    },
    {
      id: 4,
      name: 'Pasta con tocino',
      description:
        'Una deliciosa y reconfortante pasta con tocino que eleva la experiencia culinaria con una explosión de tomates de diferentes variedades. Los jugosos jitomates cherry, la dulzura del jitomate picadilly, la forma periforme del jitomate pera, la intensidad del tomate datterino, la clásica robustez del jitomate bola y la pequeña joya del tomate ciliegino se entrelazan en una sinfonía de colores, sabores y texturas. El tocino, con su sabor ahumado y crujiente, complementa a la perfección la frescura y la acidez de esta mezcla de tomates, creando un plato que cautiva los sentidos con cada bocado. Un festín que celebra la diversidad de los tomates y la indulgencia del tocino en cada exquisita porción de pasta.',
      image:
        '../assets/img/pasta_1.jpg',
      price: 32000,
    },
    {
      id: 5,
      name: 'Pasta con salmón',
      description:
        'Una exquisita experiencia culinaria se despliega con nuestra pasta con salmón, donde la riqueza del salmón se encuentra con la sofisticación de un sofrito compuesto por ajo dorado y aceite de oliva virgen. La frescura del eneldo se suma a esta sinfonía de sabores, aportando una nota herbácea que eleva cada bocado. Un toque final de pimienta negra molida añade un sutil pizarrón de calidez, creando un plato que fusiona ingredientes de alta calidad para deleitar los sentidos con una experiencia gastronómica inolvidable.',
      image:
        '../assets/img/pasta_2.jpeg',
      price: 18000,
    },
    {
      id: 6,
      name: 'Pasta con carne',
      description:
        'Sumérgete en una deliciosa travesía gastronómica con nuestra pasta con carne, donde la sazón auténtica cobra vida. La intensidad de la carne se equilibra con una mezcla aromática de tomate fresco y cebolla, mientras las hojas de laurel aportan su esencia única. El toque de orégano añade una nota herbácea que eleva la complejidad de los sabores. La pimienta negra molida completa esta obra maestra culinaria, proporcionando un toque final de calidez. Una experiencia sensorial que fusiona la tradición con la innovación en cada bocado, transportándote a un deleite de sabores que no querrás olvidar.',
      image:
        '../assets/img/pasta_3.jpg',
      price: 10000,
    },
    {
      id: 7,
      name: 'Pizza de champiñones',
      description:
        'Sumérgete en una experiencia culinaria extraordinaria con nuestra pizza de champiñones, una creación que eleva los sabores clásicos a nuevas alturas. La base de salsa de tomate, rica y sabrosa, sirve como lienzo para una combinación sublime de champiñones frescos, salchichas jugosas y cebollas caramelizadas. Cada bocado es una sinfonía de texturas y sabores, desde la suavidad de los champiñones hasta la intensidad ahumada de las salchichas y el toque dulce de las cebollas. Esta pizza es una obra maestra gastronómica que celebra la armonía perfecta entre ingredientes frescos y la creatividad en cada rebanada.',
      image:
        '../assets/img/pizza_1.jpg',
      price: 42800,
    },
    {
      id: 8,
      name: 'Pizza hawaiana',
      description:
        'Embárcate en un viaje gastronómico tropical con nuestra irresistible pizza hawaiana, donde los sabores se entrelazan para ofrecerte una experiencia única. La base de nuestra pizza está generosamente untada con aceite de oliva y salsa de tomate, creando la plataforma perfecta para la combinación clásica de jamón jugoso, piña fresca y queso mozzarella derretido. Cada bocado es una explosión de sabores, desde la salinidad del jamón hasta la dulzura tropical de la piña, todo armonizado por la cremosidad del queso mozzarella. Esta creación culinaria es un viaje sensorial que transporta tu paladar a la exuberancia de la cocina hawaiana, una experiencia que deleitará tus sentidos en cada rebanada.',
      image:
        '../assets/img/pizza_2.jpg',
      price: 42800,
    },
    {
      id: 9,
      name: 'Pizza de jamón',
      description:
        'Embárcate en un festín de sabores clásicos con nuestra pizza de jamón, donde la simplicidad se transforma en una experiencia culinaria extraordinaria. Una base perfectamente equilibrada de tomate y queso mozzarella proporciona el lienzo ideal para un toque de frescura y cremosidad. El orégano y la pimienta negra añaden una explosión de aromas y sabores, mientras que el jamón York, con su exquisitez salada y textura suave, se convierte en la estrella principal que completa esta deliciosa obra maestra. Cada rebanada es un deleite para el paladar, ofreciendo la combinación perfecta de ingredientes de alta calidad en cada bocado. Una pizza de jamón que eleva la simpleza a la perfección gastronómica.',
      image:
        '../assets/img/pizza_3.jpg',
      price: 42800,
    },
    {
      id: 10,
      name: 'Postress de profiteroles',
      description:
        'Embárcate en un viaje decadente hacia el placer culinario con nuestros exquisitos profiteroles, una obra maestra de la repostería que despierta los sentidos. Cada bocado es una fusión celestial de suaves bolitas de masa rellenas, enriquecidas con un relleno de crema, presentadas en una cascada de chocolate decadente. La preparación meticulosa de la masa con una mezcla armoniosa de leche y mantequilla crea una textura aireada que se derrite en la boca. La esencia de vainilla agrega una nota fragante y reconfortante, mientras que el toque de maíz aporta una sutileza única. Estos profiteroles no son simplemente un postre, son una experiencia gastronómica indulgente que encantará a los amantes del chocolate y la alta repostería. Sumérgete en la opulencia de nuestros profiteroles y descubre un mundo de placeres culinarios refinados.',
      image:
        '../assets/img/postres1.webp',
      price: 42800,
    },
    {
      id: 11,
      name: 'Postres con fresas',
      description:
        'Adéntrate en una experiencia dulce y vibrante con nuestros irresistibles postres con fresas, donde la frescura de las fresas se combina magistralmente con una sinfonía de sabores exquisitos. Cada bocado es una explosión de frescura y dulzura, realzado por la chispeante presencia de jugo de limón, que despierta y equilibra los sabores. La mantequilla aporta una riqueza cremosa y la vainilla añade una nota de elegancia aromática. Para coronar esta delicia, una lluvia de azúcar glass completa la experiencia, creando una textura suave y un toque adicional de dulzura. Nuestros postres con fresas no solo satisfacen el paladar, sino que también celebran la armonía de ingredientes de alta calidad, ofreciendo una experiencia culinaria que cautivará a los amantes de la buena cocina. Sumérgete en la frescura y el encanto de estas creaciones, y deja que cada bocado sea un deleite para tus sentidos.',
      image:
        '../assets/img/postres2.webp',
      price: 42800,
    },
    {
      id: 12,
      name: 'Postres de banana',
      description:
        'Embárcate en un viaje culinario encantador con nuestros irresistibles postres de banana, donde la dulzura natural de las bananas se encuentra con una sinfonía de ingredientes lujosos para crear una experiencia de sabor verdaderamente única. La esencia de vainilla añade una nota cálida y fragante, mientras que la mantequilla aporta una riqueza cremosa que se combina armoniosamente con la suavidad de la crema de leche. La presencia del queso crema agrega una textura aterciopelada y un toque de tangibilidad que eleva cada bocado a la perfección. Pero la magia verdadera se desata con la inclusión de chocolate blanco, que se derrite delicadamente, infundiendo cada porción con una elegancia decadente. Todo esto se remata con una capa de crema de leche para una experiencia indulgente que deleitará incluso a los paladares más exigentes. Estos postres de banana no son simplemente deliciosos, son una oda a la sofisticación y la exquisitez culinaria. Sumérgete en el placer de sabores armoniosos y texturas decadentes con cada delicioso bocado.',
      image:
        '../assets/img/postres3.webp',
      price: 42800,
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
    const data = { order: this.pedidos, total: this.total };

    this._productService.createOrder(data).then((value: any) => {
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

    localStorage.setItem('formPayment', JSON.stringify(data));
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

      localStorage.removeItem('formPayment');
    });
  }

  updateItemCurrent(event: any) {
    this.activeIndex = event;
  }

  getItemCardShopping() {
    return this.shoppingCart.length == 0 ? 0 : this.shoppingCart.length
  }
}
