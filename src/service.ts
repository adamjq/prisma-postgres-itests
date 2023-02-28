import { getPrismaClient } from './client';

const db = getPrismaClient();

export interface Customer {
    id: number
    name: string
    email: string
    address: string
}
  
export interface OrderInput {
customer: Customer
productId: number
quantity: number
}

export async function getCustomers() {
    return db.customer.findMany();
}

export async function getCustomerByEmail(email: string) {
    return db.customer.findUnique({
        where: {
            email,
        },
    });
}

export async function createCustomer(name: string, email: string, address: string) {
    await db.customer.create({
        data: {
            name,
            email,
            address,
        }
    });
}

/**
 * Creates an order with customer.
 * @param input The order parameters
 */
export async function createOrder(input: OrderInput) {
    const { productId, quantity, customer } = input
    const { name, email, address } = customer

    // Get the product
    const product = await db.product.findUnique({
        where: {
        id: productId,
        },
    })

    // If the product is null its out of stock, return error.
    if (!product) return new Error('Out of stock')

    // If the customer is new then create the record, otherwise connect via their unique email
    await db.customerOrder.create({
        data: {
        customer: {
            connectOrCreate: {
            create: {
                name,
                email,
                address,
            },
            where: {
                email,
            },
            },
        },
        orderDetails: {
            create: {
            total: product.price,
            quantity,
            products: {
                connect: {
                id: product.id,
                },
            },
            },
        },
        },
    })
}