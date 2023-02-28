import { getPrismaClient } from '../src/client';
import { Customer, getCustomers, createCustomer, getCustomerByEmail, OrderInput, createOrder} from '../src/service';

const prisma = getPrismaClient();

describe('Customers (e2e)', () => {

    /**
     * Delete all data after each test
     */
    afterEach(async () => {
        await prisma.orderDetails.deleteMany()
        await prisma.product.deleteMany()
        await prisma.category.deleteMany()
        await prisma.customerOrder.deleteMany()
        await prisma.customer.deleteMany()
    })

    afterAll(async () => {
        await prisma.$disconnect()
    })

    it('should create customer', async () => {
        let customers = await getCustomers();
        expect(customers.length).toEqual(0);

        await createCustomer(
            'Harry Potter',
            'harry@gmail.com',
            '1 Privet Drive'
        )

        customers = await getCustomers();
        expect(customers.length).toEqual(1);
    })

    it("should show 'Out of stock' message if productId doesn't exit", async () => {
        const email = 'harry@gmail.com'

        let customer = await getCustomerByEmail(email);
        expect(customer).toEqual(null);

        await createCustomer(
            'Harry Potter',
            'harry@gmail.com',
            '1 Privet Drive'
        )

        customer = await getCustomerByEmail(email) as Customer;
        expect(customer).not.toBeNull();

        // The new orders details
        const order: OrderInput = {
            customer: customer as Customer,
            productId: 3,
            quantity: 1,
        }

        // The productId supplied doesn't exit so the function should return an "Out of stock" message
        await expect(createOrder(order)).resolves.toEqual(new Error('Out of stock'))
    })
})