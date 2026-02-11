import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  private products: Product[] = [
    {
      id: 1,
      reference: 'REF-001',
      name: 'Licencia Basic',
      total: 100000,
      currency: 'COP',
      symbol: '$',
      description: 'Licencia básica para pequeñas empresas',
    },
    {
      id: 2,
      reference: 'REF-002',
      name: 'Licencia Enterprise',
      total: 150000,
      currency: 'COP',
      symbol: '$',
      description:
        'Acceso total por tiempo ilimitado. Pago único sin recurrencia.',
    },
    {
      id: 3,
      reference: 'REF-003',
      name: 'Consultoría Express',
      total: 50000,
      currency: 'COP',
      symbol: '$',
      description: '1 hora de consultoría técnica especializada.',
    },
  ];
  private nextId = 4;

  create(createProductDto: CreateProductDto) {
    const product: Product = {
      id: this.nextId++,
      reference: createProductDto.reference,
      name: createProductDto.name,
      currency: createProductDto.currency,
      total: createProductDto.total,
      symbol: createProductDto.symbol,
      description: createProductDto.description,
    };
    this.products.push(product);
    return product;
  }

  findAll() {
    return this.products.slice();
  }

  findOne(id: number) {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    const idx = this.products.findIndex((p) => p.id === id);
    if (idx === -1) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    const updated: Product = {
      ...this.products[idx],
      ...updateProductDto,
    } as Product;
    this.products[idx] = updated;
    return updated;
  }

  remove(id: number) {
    const idx = this.products.findIndex((p) => p.id === id);
    if (idx === -1) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    const [removed] = this.products.splice(idx, 1);
    return removed;
  }
}
