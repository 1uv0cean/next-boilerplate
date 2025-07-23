'use client';

import { DataTable, DataTableColumn } from '@/components/ui/data-table';
import { useState } from 'react';

interface DemoSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const DemoSection = ({ title, children, className = '' }: DemoSectionProps) => {
  return (
    <section className={`space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm ${className}`}>
      <h3 className="text-xl font-semibold text-gray-900 border-b border-gray-100 pb-2">{title}</h3>
      {children}
    </section>
  );
};

interface DemoItemProps {
  label: string;
  children: React.ReactNode;
}

const DemoItem = ({ label, children }: DemoItemProps) => {
  return (
    <div className="space-y-3">
      <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">{label}</h4>
      <div className="space-y-4">{children}</div>
    </div>
  );
};

// Sample data
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive' | 'Pending';
  lastLogin: string;
  joinDate: string;
}

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  rating: number;
  featured: boolean;
}

interface Order {
  id: string;
  customer: string;
  amount: number;
  status: 'Completed' | 'Processing' | 'Cancelled' | 'Pending';
  date: string;
  items: number;
}

const users: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', lastLogin: '2024-01-15', joinDate: '2023-06-12' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active', lastLogin: '2024-01-14', joinDate: '2023-08-22' },
  { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Moderator', status: 'Inactive', lastLogin: '2024-01-10', joinDate: '2023-04-15' },
  { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', role: 'User', status: 'Active', lastLogin: '2024-01-16', joinDate: '2023-09-03' },
  { id: 5, name: 'Alex Chen', email: 'alex@example.com', role: 'Admin', status: 'Pending', lastLogin: '2024-01-12', joinDate: '2023-11-28' },
  { id: 6, name: 'Emily Davis', email: 'emily@example.com', role: 'User', status: 'Active', lastLogin: '2024-01-16', joinDate: '2023-07-19' },
  { id: 7, name: 'David Brown', email: 'david@example.com', role: 'Moderator', status: 'Active', lastLogin: '2024-01-13', joinDate: '2023-05-08' },
  { id: 8, name: 'Lisa Garcia', email: 'lisa@example.com', role: 'User', status: 'Inactive', lastLogin: '2024-01-08', joinDate: '2023-10-11' },
];

const products: Product[] = [
  { id: 1, name: 'Laptop Pro', category: 'Electronics', price: 1299, stock: 15, rating: 4.8, featured: true },
  { id: 2, name: 'Wireless Mouse', category: 'Accessories', price: 29.99, stock: 120, rating: 4.5, featured: false },
  { id: 3, name: 'Mechanical Keyboard', category: 'Accessories', price: 79.99, stock: 45, rating: 4.7, featured: true },
  { id: 4, name: '4K Monitor', category: 'Electronics', price: 399, stock: 8, rating: 4.6, featured: false },
  { id: 5, name: 'Webcam HD', category: 'Electronics', price: 89.99, stock: 32, rating: 4.3, featured: false },
  { id: 6, name: 'Desk Lamp', category: 'Furniture', price: 45.50, stock: 67, rating: 4.2, featured: false },
  { id: 7, name: 'Gaming Chair', category: 'Furniture', price: 299, stock: 12, rating: 4.9, featured: true },
  { id: 8, name: 'USB Hub', category: 'Accessories', price: 24.99, stock: 89, rating: 4.1, featured: false },
];

const orders: Order[] = [
  { id: 'ORD-001', customer: 'John Doe', amount: 1299.00, status: 'Completed', date: '2024-01-15', items: 1 },
  { id: 'ORD-002', customer: 'Jane Smith', amount: 109.98, status: 'Processing', date: '2024-01-16', items: 2 },
  { id: 'ORD-003', customer: 'Mike Johnson', amount: 399.00, status: 'Pending', date: '2024-01-16', items: 1 },
  { id: 'ORD-004', customer: 'Sarah Wilson', amount: 344.50, status: 'Completed', date: '2024-01-14', items: 3 },
  { id: 'ORD-005', customer: 'Alex Chen', amount: 79.99, status: 'Cancelled', date: '2024-01-13', items: 1 },
];

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'active':
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'pending':
    case 'processing':
      return 'bg-yellow-100 text-yellow-800';
    case 'inactive':
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getRatingStars = (rating: number) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 0; i < fullStars; i++) {
    stars.push('★');
  }
  if (hasHalfStar) {
    stars.push('☆');
  }
  return stars.join('');
};

const getStockStatus = (stock: number) => {
  if (stock === 0) return { text: 'Out of Stock', color: 'bg-red-100 text-red-800' };
  if (stock < 10) return { text: 'Low Stock', color: 'bg-orange-100 text-orange-800' };
  if (stock < 50) return { text: 'In Stock', color: 'bg-yellow-100 text-yellow-800' };
  return { text: 'Well Stocked', color: 'bg-green-100 text-green-800' };
};

export const DataTableDemo = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<Record<string, string>>({});

  // User table columns
  const userColumns: DataTableColumn<User>[] = [
    {
      key: 'id',
      title: 'ID',
      sortable: true,
      width: '80px',
      render: (value) => <span className="font-mono text-xs">#{value}</span>,
    },
    {
      key: 'name',
      title: 'Name',
      sortable: true,
      filterable: true,
      render: (value) => <span className="font-medium">{value}</span>,
    },
    {
      key: 'email',
      title: 'Email',
      sortable: true,
      filterable: true,
      render: (value) => <span className="text-muted-foreground">{value}</span>,
    },
    {
      key: 'role',
      title: 'Role',
      sortable: true,
      filterable: true,
      render: (value) => (
        <span className={`px-2 py-1 rounded text-xs font-medium ${
          value === 'Admin' ? 'bg-purple-100 text-purple-800' :
          value === 'Moderator' ? 'bg-blue-100 text-blue-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {value}
        </span>
      ),
    },
    {
      key: 'status',
      title: 'Status',
      sortable: true,
      filterable: true,
      render: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(value)}`}>
          {value}
        </span>
      ),
    },
    {
      key: 'lastLogin',
      title: 'Last Login',
      sortable: true,
      render: (value) => <span className="text-sm">{value}</span>,
    },
    {
      key: 'joinDate',
      title: 'Join Date',
      sortable: true,
      render: (value) => <span className="text-sm">{value}</span>,
    },
  ];

  // Product table columns
  const productColumns: DataTableColumn<Product>[] = [
    {
      key: 'name',
      title: 'Product',
      sortable: true,
      filterable: true,
      render: (value, row) => (
        <div className="flex items-center gap-2">
          <span className="font-medium">{value}</span>
          {row.featured && (
            <span className="px-1.5 py-0.5 bg-amber-100 text-amber-800 text-xs rounded font-medium">
              Featured
            </span>
          )}
        </div>
      ),
    },
    {
      key: 'category',
      title: 'Category',
      sortable: true,
      filterable: true,
    },
    {
      key: 'price',
      title: 'Price',
      sortable: true,
      align: 'right',
      render: (value) => <span className="font-medium">${value}</span>,
    },
    {
      key: 'stock',
      title: 'Stock',
      sortable: true,
      align: 'center',
      render: (value) => {
        const status = getStockStatus(value);
        return (
          <div className="text-center">
            <div className="font-medium">{value}</div>
            <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${status.color}`}>
              {status.text}
            </span>
          </div>
        );
      },
    },
    {
      key: 'rating',
      title: 'Rating',
      sortable: true,
      align: 'center',
      render: (value) => (
        <div className="text-center">
          <div className="text-yellow-500 text-sm">{getRatingStars(value)}</div>
          <div className="text-xs text-muted-foreground">{value}/5</div>
        </div>
      ),
    },
  ];

  // Orders table columns
  const orderColumns: DataTableColumn<Order>[] = [
    {
      key: 'id',
      title: 'Order ID',
      sortable: true,
      filterable: true,
      render: (value) => <span className="font-mono text-sm">{value}</span>,
    },
    {
      key: 'customer',
      title: 'Customer',
      sortable: true,
      filterable: true,
      render: (value) => <span className="font-medium">{value}</span>,
    },
    {
      key: 'amount',
      title: 'Amount', 
      sortable: true,
      align: 'right',
      render: (value) => <span className="font-medium">${value.toFixed(2)}</span>,
    },
    {
      key: 'status',
      title: 'Status',
      sortable: true,
      filterable: true,
      render: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(value)}`}>
          {value}
        </span>
      ),
    },
    {
      key: 'date',
      title: 'Date',
      sortable: true,
      render: (value) => <span className="text-sm">{value}</span>,
    },
    {
      key: 'items',
      title: 'Items',
      sortable: true,
      align: 'center',
      render: (value) => <span className="font-medium">{value}</span>,
    },
  ];

  return (
    <div className="max-w-7xl space-y-8">
      <DemoSection title="Filter Modes">
        <div className="space-y-8">
          <DemoItem label="Search Only">
            <DataTable
              data={users}
              columns={userColumns}
              filterMode="search"
              searchPlaceholder="Search users..."
              onRowClick={(user) => setSelectedUser(user)}
              onSearch={(query) => setSearchQuery(query)}
            />
            {selectedUser && (
              <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                <h5 className="font-medium mb-2">Selected User:</h5>
                <p className="text-sm text-muted-foreground">
                  {selectedUser.name} ({selectedUser.email}) - {selectedUser.role}
                </p>
              </div>
            )}
          </DemoItem>

          <DemoItem label="Column Filters Only">
            <DataTable
              data={products.slice(0, 6)}
              columns={productColumns}
              filterMode="column"
              pageSize={4}
              onFilter={(filters) => setFilters(filters)}
            />
          </DemoItem>

          <DemoItem label="Both Search & Column Filters">
            <DataTable
              data={users}
              columns={userColumns.slice(0, 5)}
              filterMode="both"
              searchPlaceholder="Search anything..."
              pageSize={4}
            />
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="Display Modes">
        <div className="space-y-8">
          <DemoItem label="Pagination Mode (Default)">
            <DataTable
              data={products}
              columns={productColumns}
              displayMode="pagination"
              filterMode="search"
              pageSize={4}
            />
          </DemoItem>

          <DemoItem label="Scroll Mode">
            <DataTable
              data={users}
              columns={userColumns}
              displayMode="scroll"
              maxHeight="300px"
              filterMode="search"
              searchPlaceholder="Search users..."
            />
          </DemoItem>

          <DemoItem label="Static Mode (All Data)">
            <DataTable
              data={orders}
              columns={orderColumns}
              displayMode="static"
              filterMode="search"
              searchPlaceholder="Search orders..."
            />
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="Layout Variants">
        <div className="space-y-8">
          <DemoItem label="Card Layout with Scroll">
            <DataTable
              data={users}
              columns={userColumns.slice(0, 4)}
              variant="card"
              displayMode="scroll"
              maxHeight="250px"
              filterMode="search"
            />
          </DemoItem>

          <DemoItem label="Bordered with No Filters">
            <DataTable
              data={products.slice(0, 4)}
              columns={productColumns.slice(0, 4)}
              variant="bordered"
              filterMode="none"
              displayMode="static"
            />
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="Interactive Features">
        <div className="space-y-8">
          <DemoItem label="Event Callbacks">
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground">
                Current search: "{searchQuery}" | Active filters: {Object.keys(filters).length}
              </div>
              <DataTable
                data={products}
                columns={productColumns}
                filterMode="both"
                displayMode="pagination"
                pageSize={3}
                onSearch={(query) => setSearchQuery(query)}
                onFilter={(newFilters) => setFilters(newFilters)}
                onRowClick={(product) => alert(`Clicked: ${product.name}`)}
              />
            </div>
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="States">
        <div className="space-y-8">
          <DemoItem label="Loading State">
            <DataTable
              data={[]}
              columns={userColumns}
              loading={true}
              loadingMessage="Fetching user data..."
            />
          </DemoItem>

          <DemoItem label="Empty State">
            <DataTable
              data={[]}
              columns={orderColumns}
              loading={false}
              filterMode="search"
              emptyMessage="No orders found. Try adjusting your search criteria."
            />
          </DemoItem>
        </div>
      </DemoSection>
    </div>
  );
};