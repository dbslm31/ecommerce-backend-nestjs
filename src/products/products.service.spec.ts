import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { ProductsRepository } from './products.repository';
import { Product } from '../models/product.model';

describe('ProductsService', () => {
  let service: ProductsService;
  let productRepository: ProductsRepository;

  beforeEach(async () => {
    const mockProductRepository = {
      create: jest.fn().mockResolvedValue({
        id: 1,
        name: 'Product 1',
        description: 'Description of product 1',
        price: 100.0,
        stock: 10,
        img_url: 'http://example.com/img.png',
        is_active: true,
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        { provide: ProductsRepository, useValue: mockProductRepository },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    productRepository = module.get<ProductsRepository>(ProductsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a product', async () => {
    const newProductData = {
      name: 'Product 1',
      description: 'Description of product 1',
      price: 100.0,
      stock: 10,
      img_url: 'http://example.com/img.png',
      is_active: true,
    };

    const product = await service.createProduct(
      newProductData.name,
      newProductData.description,
      newProductData.price,
      newProductData.stock,
      newProductData.img_url,
      newProductData.is_active,
    );

    // Vérifier que la méthode create du repository a été appelée avec les bons arguments
    expect(productRepository.create).toHaveBeenCalledWith(newProductData);

    // Vérifier que la méthode create retourne bien l'objet attendu
    expect(product).toEqual({
      id: 1,
      ...newProductData,
    });
  });
});
