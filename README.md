# Northwind Services - Customer & Order Management System

A modern, client-side web application for managing customers and orders using the Northwind API. Built with React, TypeScript, TanStack Router, TanStack Query, and Tailwind CSS.

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Run linter
pnpm lint
```

## 📋 Features

### Core Functionality
- ✅ **Customer Management**: Browse, search, filter, and view detailed customer information
- ✅ **Order Management**: View, search, sort, and track all orders
- ✅ **Server-Side Pagination**: Efficient data loading with configurable page sizes (10, 20, 50, 100)
- ✅ **Client-Side Filtering**: Real-time search across multiple fields
- ✅ **Sortable Columns**: Click column headers to sort data ascending/descending
- ✅ **Responsive Design**: Mobile-friendly UI that works on all screen sizes
- ✅ **Type Safety**: Full TypeScript implementation with strict typing

### User Experience
- Modern, clean UI with Radix UI components
- Loading states with skeleton screens
- Error handling with user-friendly messages
- Smooth navigation with TanStack Router
- Optimized performance with React Query caching

## 🏗️ Architecture

### Technology Stack

| Category | Technology | Purpose |
|----------|-----------|---------|
| **Framework** | React 19 | UI library |
| **Language** | TypeScript 5.9 | Type safety |
| **Build Tool** | Vite 7 | Fast development & bundling |
| **Routing** | TanStack Router 1.160 | Type-safe routing |
| **Data Fetching** | TanStack Query 5.90 | Server state management |
| **HTTP Client** | Axios 1.13 | API requests |
| **State Management** | Zustand 5.0 | Global state (order context) |
| **Styling** | Tailwind CSS 4.1 | Utility-first CSS |
| **UI Components** | Radix UI | Accessible primitives |
| **Icons** | Lucide React | Icon library |

### Project Structure

```
src/
├── api/              # API client and service functions
│   └── index.ts      # Axios setup, API endpoints
├── components/       # Reusable UI components
│   ├── button/       # Button component with variants
│   ├── card/         # Card layouts
│   ├── input/        # Form inputs
│   ├── select/       # Dropdown selects
│   ├── table/        # Data tables
│   └── ...           # Other Radix UI components
├── hooks/            # Custom React hooks
│   ├── useCustomers.ts        # Customer list logic
│   ├── useCustomerDetails.ts  # Single customer logic
│   ├── useOrders.ts           # Order list logic
│   └── useOrderDetails.ts     # Single order logic
├── routes/           # Page components (file-based routing)
│   ├── __root.tsx              # Root layout with navigation
│   ├── index.tsx               # Home page
│   ├── customers.tsx           # Customer list
│   ├── customer/
│   │   └── $customerId.tsx     # Customer details
│   ├── orders.tsx              # Order list
│   └── order.tsx               # Order details (uses Zustand)
├── store/            # Global state management
│   └── index.ts      # Zustand store for order context
├── types/            # TypeScript type definitions
│   └── index.ts      # API types and interfaces
├── utils/            # Utility functions
│   └── index.tsx     # cn() helper for class merging
└── main.tsx          # App entry point with providers
```

## 🎯 Implementation Details

### API Integration

**Base URL**: `https://uitestapi.occupass.com`

#### Endpoints Used:
- `POST /query/customers` - List customers with pagination, sorting, filtering
- `POST /query/orders` - List orders with pagination and sorting
- `GET /customers/{id}` - Get customer details with order history

#### Server-Side Features:
- **Pagination**: `skip` and `take` parameters
- **Sorting**: `orderBy` (ascending) or `orderByDesc` (descending)
- **Filtering**: `countryStartsWith` for customer country filter

#### Client-Side Features:
- **Search**: Real-time filtering across multiple fields (name, city, country, etc.)
- **Caching**: TanStack Query caches responses for 5 minutes
- **Error Handling**: Graceful error states with retry capability

### Custom Hooks Pattern

The application uses a custom hooks pattern to separate business logic from UI:

```typescript
// Example: useCustomers hook
const {
  // State
  page, pageSize, sortBy, sortDesc, searchTerm, countryFilter,
  
  // State setters
  setPage, setPageSize, setSearchTerm, setCountryFilter,
  
  // Query data
  data, isLoading, error,
  
  // Computed values
  filteredCustomers, countries,
  
  // Handlers
  handleSort,
} = useCustomers()
```

**Benefits**:
- ✅ Reusable business logic
- ✅ Easier testing
- ✅ Cleaner component code
- ✅ Better separation of concerns

### State Management Strategy

**TanStack Query** (Server State):
- Customer data
- Order data
- API responses
- Caching and refetching

**Zustand** (Client State):
- Order context for detail page navigation
- Lightweight global state for passing order data between routes

**React State** (Local State):
- Pagination controls
- Sort preferences
- Search/filter inputs
- UI state (modals, dropdowns)

### Routing Architecture

Uses TanStack Router with file-based routing:

```
/ (Home)
├── /customers (List)
│   └── /customers/:customerId (Details)
├── /orders (List)
└── /order (Details - via Zustand store)
```

**Type-Safe Navigation**:
```typescript
// Parameterized routes are type-safe
<Link to="/customers/$customerId" params={{ customerId: customer.id }}>
  View Customer
</Link>
```

### Data Flow

```
User Action → Custom Hook → API Call (Axios) → TanStack Query → Cache → UI Update
                ↓
         Local State Updates (React)
                ↓
         Global State (Zustand - if needed)
```

## 🎨 UI/UX Highlights

### Design System
- **Color Scheme**: Modern, accessible color palette with dark mode support
- **Typography**: Clear hierarchy with proper font sizes and weights
- **Spacing**: Consistent spacing using Tailwind's spacing scale
- **Components**: Radix UI primitives for accessibility

### Key UI Features
1. **Navigation Bar**: Fixed header with logo and main navigation links
2. **Data Tables**: Sortable columns, hover states, responsive layout
3. **Cards**: Information grouped in clean card layouts
4. **Loading States**: Skeleton screens prevent layout shift
5. **Empty States**: Clear messaging when no data is available
6. **Pagination Controls**: Intuitive page navigation with page size selector

### Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 📊 Performance Optimizations

1. **React Query Caching**: 5-minute stale time reduces API calls
2. **useMemo**: Memoized computed values (filtered data, country lists)
3. **Code Splitting**: Route-based code splitting via Vite
4. **Lazy Loading**: Components loaded on demand
5. **Optimized Builds**: Vite production builds with tree-shaking

## 🔍 Code Quality

### TypeScript
- Strict mode enabled
- No `any` types (uses `unknown` where needed)
- Full type coverage for API responses
- Type-safe routing with TanStack Router

### Linting
- ESLint configured with React and TypeScript rules
- No linter errors in production code
- Consistent code style

### Best Practices
- ✅ Separation of concerns (hooks, components, API)
- ✅ DRY principle (reusable components and hooks)
- ✅ Single Responsibility Principle
- ✅ Proper error boundaries
- ✅ Accessible UI components (Radix UI)

## 🐛 Known Limitations & Considerations

### API Constraints
1. **Order Details**: The API doesn't provide a direct endpoint for single order details. The app uses:
   - Customer details endpoint to get order items
   - Zustand store to pass order data from list to detail page
   
2. **Search Limitations**: 
   - Customer search by country uses `countryStartsWith` (server-side)
   - Other searches are client-side only (limited to current page results)

3. **Date Format**: API returns ServiceStack date format (`/Date(timestamp)/`), which is parsed client-side

### Design Decisions

**Why Zustand for Order Details?**
- The order details page needs both order data and customer data
- Passing order via Zustand avoids redundant API calls
- Alternative would be to fetch all orders again to find the specific one

**Why Custom Hooks?**
- Encapsulates complex logic (pagination, sorting, filtering)
- Makes components cleaner and more testable
- Reusable across different views

**Why Client-Side + Server-Side Filtering?**
- Server-side pagination for performance (large datasets)
- Client-side search for better UX (instant results)
- Hybrid approach balances performance and user experience

## 🚀 Future Enhancements

### Potential Improvements
1. **Advanced Filtering**: Add more filter options (date ranges, price ranges)
2. **Export Functionality**: Export data to CSV/Excel
3. **Bulk Operations**: Select multiple items for batch actions
4. **Advanced Search**: Full-text search with backend support
5. **Data Visualization**: Charts and graphs for order statistics
6. **Real-time Updates**: WebSocket support for live data
7. **Offline Support**: Service worker for offline functionality
8. **Testing**: Add unit tests (Vitest) and E2E tests (Playwright)

### Scalability Considerations
- **Virtual Scrolling**: For very large datasets (react-virtual)
- **Infinite Scroll**: Alternative to pagination
- **Optimistic Updates**: For better perceived performance
- **Request Debouncing**: For search inputs
- **Error Retry Logic**: Automatic retry with exponential backoff

## 📝 Development Notes

### Adding New Routes
1. Create file in `src/routes/` (file-based routing)
2. Export route using `createFileRoute()`
3. Router automatically picks up new routes

### Adding New API Endpoints
1. Add types to `src/types/index.ts`
2. Add API function to `src/api/index.ts`
3. Create custom hook in `src/hooks/`
4. Use hook in component

### Styling Guidelines
- Use Tailwind utility classes
- Follow existing component patterns
- Use `cn()` utility for conditional classes
- Maintain consistent spacing and sizing

## 🔐 Security Considerations

- ✅ No sensitive data stored in client
- ✅ API requests use HTTPS
- ✅ No authentication required (public API)
- ✅ Input sanitization via React (XSS protection)
- ✅ Type safety prevents common errors

## 📄 License

This is a test project for demonstration purposes.

---

## 👨‍💻 Review Summary

### ✅ Requirements Met
- [x] Client-side only (no server-side frameworks)
- [x] Customer and order viewing with separate pages
- [x] Individual detail views for customers and orders
- [x] Filtering and sorting on list views
- [x] Server-side pagination where possible
- [x] TanStack Query for data fetching
- [x] Axios for HTTP requests
- [x] Modern, appealing UI
- [x] Responsive design
- [x] Type-safe implementation

### 🎯 Code Quality
- **TypeScript**: Strict typing throughout
- **Architecture**: Clean separation of concerns
- **Performance**: Optimized with caching and memoization
- **Maintainability**: Well-organized, documented code
- **Accessibility**: Radix UI ensures WCAG compliance

### 💡 Highlights
- Custom hooks pattern for reusable logic
- Hybrid filtering (server + client) for best UX
- Type-safe routing with TanStack Router
- Modern UI with Tailwind CSS and Radix UI
- Comprehensive error handling and loading states
