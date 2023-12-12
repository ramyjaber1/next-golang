type Product = {
 id?: number;
 name: string;
 description: string;
 cost_price: number;
 selling_price: number;
 quantity: number;
 variant_type_id: number;
 variants: ProductVariant[];
 shop_id: number;
 supplier_id?: number;
 category_id?:number;
 category?:Category;
 image?: string;
 created_at?: Date;
 updated_at?: Date;
};

type Delivery = {
 id?: number;
 name: string;
 managed_by?: string;
 phone: string;
 second_phone?: string;
 image?: string;
 link?: string;
 user_name: string;
 password: string;
 email?: string;
 address?: string;
 pay_after?: string;
 shop_id: number;
 created_at?: Date;
 updated_at?: Date;
};
type VariantType = {
 id?: number;
 name: string;
 shop_id: number;
};
type Variant = {
 id?: number;
 name: string;
 meta: string;
 image: string;
 type_id: number;
 shop_id: number;
};
type ProductVariant = {
 id?: number;
 product_id: number;
 variant_id: number;
 variant: Variant;
 quantity: number;
};
type Bank = {
 id?: number;
 name: string;
 amount: number;
 shop_id: number;
 currency: string;
 created_at?: Date;
};
type Expense = {
 id?: number;
 description: string;
 amount: number;
 date: Date;
 category: string;
 product_id?: number;
 shop_id: number;
 receipt_image?: string;
 user_id: number;
 user?: User;
 bank_id: number;
 bank?: Bank;
};

type Color = {
 id?: number;
 name: string;
 meta: string;
 image?: string;
};
type Size = {
 id?: number;
 name: string;
};
type Customer = {
 id?: number;
 name: string;
 email: string;
 image?: string;
 phone: string;
 note?: string;
 password?: string;
 address_id?: string;
 address?: Address;
 label_id?: number;
 label?: Label;
 shop_id: number;
 created_at?: Date;
 updated_at?: Date;
};

type Category  = {
    id?:number;
    name:string;
    image:string;
    shop_id:number;
}

type ProductStats = {
 id?: number;
 product_id?: number;
 product?: Product;
 shop_id?: number;
 total_sale: number;
 total_profit: number;
};

type Label = {
 id?: number;
 name: string;
 color: string;
 shop_id: number;
};

type User = {
 id: number;
 name: string;
 email: string;
 phone: string;
 address_id: string;
 address: Address;
 created_at?: Date;
 updated_at?: Date;
};

type Order = {
 id?: number;
 total: number;
 note?: string;
 customer_id: number;
 customer?: Customer;
 delivery_id?: number;
 delivery: Delivery;
 shop_id: number;
 bank_id?: number;
 delivery_cost: number;
 order_address_id?: number;
 reference_id: string;
 order_address: OrderAddress;
 image?: string;
 status?: "PENDING" | "DONE" | "CANCELED" | "ONTHEWAY" | "PREPARED";
 order_items: OrderItem[];
 created_at?: Date;
 updated_at?: Date;
};

type OrderItem = {
 id?: number;
 order_id?: number;
 product_id: number;
 name: string;
 variant_id: number;
 variant_name: string;
 variant: ProductVariant;
 availableVariant?: Variant[];
 image?: string;
 cost: number;
 price: number;
 shop_id: number;
 quantity: number;
};

type Address = {
 id?: number;
 country: string;
 city: string;
 area_id: number;
 area?: Area;
 street_name: string;
 building_name: string;
};

type OrderAddress = {
 id?: number;
 country: string;
 city: string;
 area?: string;
 street_name: string;
 building_name: string;
};

type Supplier = {
 id?: number;
 name: string;
 phone: string;
 email: string;
 address: string;
 image?: string;
 products?: Product[];
 shop_id: number;
};

type Area = {
 id?: number;
 name: string;
 delivery_cost: number;
 shop_id: number;
};
type ShopUser = {
 id?: number;
 shop_id: number;
 shop?: Shop;
 user_id: number;
 user?: User;
 role: string;
};
type Shop = {
 id?: number;
 name: string;
 owner_id: number;
 owner?: User;
 users?: User[];
 website?: string;
 status: string;
 image?: string;
};

type Meta = {
 current_page: number;
 limit: number;
 last_page: number;
 total_count: number;
};

type ColumnHeader = {
 name?: string;
 uid?: string;
 sortable?: boolean;
};
