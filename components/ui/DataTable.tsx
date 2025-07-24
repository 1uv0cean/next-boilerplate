'use client';

import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';
import { ArrowLeft, ArrowRight, ChevronDown, ChevronUp, Filter, Search } from 'lucide-react';
import { forwardRef, useMemo, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './Table';

const dataTableVariants = cva('w-full space-y-4', {
  variants: {
    variant: {
      default: '',
      bordered: 'border border-border rounded-lg p-4',
      card: 'bg-card border border-border rounded-lg p-6 shadow-sm',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export type SortDirection = 'asc' | 'desc' | null;

export interface DataTableColumn<T = any> {
  key: string;
  title: string;
  sortable?: boolean;
  filterable?: boolean;
  render?: (value: any, row: T, index: number) => React.ReactNode;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

export type FilterMode = 'search' | 'column' | 'both' | 'none';
export type DisplayMode = 'pagination' | 'scroll' | 'static';

export interface DataTableProps<T = any>
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dataTableVariants> {
  data: T[];
  columns: DataTableColumn<T>[];
  loading?: boolean;

  // Filtering options
  filterMode?: FilterMode;
  searchPlaceholder?: string;

  // Display options
  displayMode?: DisplayMode;
  pageSize?: number;
  maxHeight?: string;

  // Messages
  emptyMessage?: string;
  loadingMessage?: string;

  // Events
  onRowClick?: (row: T, index: number) => void;
  onSearch?: (query: string) => void;
  onFilter?: (filters: Record<string, string>) => void;
}

const DataTable = forwardRef<HTMLDivElement, DataTableProps>(
  (
    {
      className,
      variant,
      data,
      columns,
      loading = false,
      filterMode = 'search',
      searchPlaceholder = 'Search...',
      displayMode = 'pagination',
      pageSize = 10,
      maxHeight = '400px',
      emptyMessage = 'No data available',
      loadingMessage = 'Loading...',
      onRowClick,
      onSearch,
      onFilter,
      ...props
    },
    ref,
  ) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortColumn, setSortColumn] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<SortDirection>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [columnFilters, setColumnFilters] = useState<Record<string, string>>({});

    // Filter data based on search query and column filters
    const filteredData = useMemo(() => {
      let filtered = [...data];

      // Apply search filter
      if (searchQuery.trim()) {
        filtered = filtered.filter((row) =>
          columns.some((column) => {
            const value = row[column.key];
            return String(value || '')
              .toLowerCase()
              .includes(searchQuery.toLowerCase());
          }),
        );
      }

      // Apply column filters
      Object.entries(columnFilters).forEach(([columnKey, filterValue]) => {
        if (filterValue.trim()) {
          filtered = filtered.filter((row) => {
            const value = row[columnKey];
            return String(value || '')
              .toLowerCase()
              .includes(filterValue.toLowerCase());
          });
        }
      });

      return filtered;
    }, [data, searchQuery, columnFilters, columns]);

    // Sort filtered data
    const sortedData = useMemo(() => {
      if (!sortColumn || !sortDirection) return filteredData;

      return [...filteredData].sort((a, b) => {
        const aValue = a[sortColumn];
        const bValue = b[sortColumn];

        if (aValue === null || aValue === undefined) return 1;
        if (bValue === null || bValue === undefined) return -1;

        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
        }

        const aStr = String(aValue).toLowerCase();
        const bStr = String(bValue).toLowerCase();

        if (sortDirection === 'asc') {
          return aStr.localeCompare(bStr);
        } else {
          return bStr.localeCompare(aStr);
        }
      });
    }, [filteredData, sortColumn, sortDirection]);

    // Display data based on mode
    const displayData = useMemo(() => {
      if (displayMode === 'pagination') {
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return sortedData.slice(startIndex, endIndex);
      }
      return sortedData;
    }, [sortedData, currentPage, pageSize, displayMode]);

    const totalPages = Math.ceil(sortedData.length / pageSize);

    const handleSort = (columnKey: string) => {
      const column = columns.find((col) => col.key === columnKey);
      if (!column?.sortable) return;

      if (sortColumn === columnKey) {
        if (sortDirection === 'asc') {
          setSortDirection('desc');
        } else if (sortDirection === 'desc') {
          setSortDirection(null);
          setSortColumn(null);
        } else {
          setSortDirection('asc');
        }
      } else {
        setSortColumn(columnKey);
        setSortDirection('asc');
      }
    };

    const handleColumnFilter = (columnKey: string, value: string) => {
      const newFilters = {
        ...columnFilters,
        [columnKey]: value,
      };
      setColumnFilters(newFilters);
      setCurrentPage(1);
      onFilter?.(newFilters);
    };

    const handleSearch = (value: string) => {
      setSearchQuery(value);
      setCurrentPage(1);
      onSearch?.(value);
    };

    const getSortIcon = (columnKey: string) => {
      if (sortColumn !== columnKey) return null;
      if (sortDirection === 'asc') return <ChevronUp className="h-4 w-4" />;
      if (sortDirection === 'desc') return <ChevronDown className="h-4 w-4" />;
      return null;
    };

    const renderPagination = () => {
      if (displayMode !== 'pagination' || totalPages <= 1) return null;

      const pages = [];
      const maxVisiblePages = 5;
      let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
      let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      return (
        <div className="flex items-center justify-between">
          <div className="text-muted-foreground text-sm">
            Showing {(currentPage - 1) * pageSize + 1} to{' '}
            {Math.min(currentPage * pageSize, sortedData.length)} of {sortedData.length} entries
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="ring-offset-background focus-visible:ring-ring border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-8 w-8 items-center justify-center rounded-md border text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            {pages.map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={cn(
                  'ring-offset-background focus-visible:ring-ring inline-flex h-8 w-8 items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
                  currentPage === page
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                    : 'border-input bg-background hover:bg-accent hover:text-accent-foreground border',
                )}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="ring-offset-background focus-visible:ring-ring border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-8 w-8 items-center justify-center rounded-md border text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      );
    };

    const showSearch = filterMode === 'search' || filterMode === 'both';
    const showColumnFilters = filterMode === 'column' || filterMode === 'both';
    const hasFiltering = filterMode !== 'none';

    if (loading) {
      return (
        <div className={cn(dataTableVariants({ variant }), className)} ref={ref} {...props}>
          <div className="flex items-center justify-center py-8">
            <div className="text-muted-foreground">{loadingMessage}</div>
          </div>
        </div>
      );
    }

    return (
      <div className={cn(dataTableVariants({ variant }), className)} ref={ref} {...props}>
        {/* Search and Filters */}
        {hasFiltering && (
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {showSearch && (
              <div className="relative max-w-sm">
                <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder={searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-10 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
            )}
            {showColumnFilters && (
              <div className="flex items-center space-x-2">
                <Filter className="text-muted-foreground h-4 w-4" />
                <span className="text-muted-foreground text-sm">
                  Filters active: {Object.values(columnFilters).filter(Boolean).length}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Table */}
        <div
          className={cn('rounded-md border', displayMode === 'scroll' && 'overflow-auto')}
          style={displayMode === 'scroll' ? { maxHeight } : undefined}
        >
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <TableHead
                    key={column.key}
                    style={{ width: column.width }}
                    className={cn(
                      column.align === 'center' && 'text-center',
                      column.align === 'right' && 'text-right',
                      column.sortable && 'hover:bg-muted/50 cursor-pointer select-none',
                    )}
                    onClick={() => column.sortable && handleSort(column.key)}
                  >
                    <div className="flex items-center gap-2">
                      {column.title}
                      {column.sortable && (
                        <div className="flex flex-col">{getSortIcon(column.key)}</div>
                      )}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
              {showColumnFilters && (
                <TableRow>
                  {columns.map((column) => (
                    <TableHead key={`filter-${column.key}`} className="p-2">
                      {column.filterable && (
                        <input
                          type="text"
                          placeholder={`Filter ${column.title.toLowerCase()}...`}
                          value={columnFilters[column.key] || ''}
                          onChange={(e) => handleColumnFilter(column.key, e.target.value)}
                          className="border-input bg-background placeholder:text-muted-foreground focus:ring-ring w-full rounded border px-2 py-1 text-xs focus:ring-1 focus:outline-none"
                        />
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              )}
            </TableHeader>
            <TableBody>
              {displayData.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="text-muted-foreground py-8 text-center"
                  >
                    {emptyMessage}
                  </TableCell>
                </TableRow>
              ) : (
                displayData.map((row, index) => (
                  <TableRow
                    key={index}
                    className={cn(onRowClick && 'hover:bg-muted/50 cursor-pointer')}
                    onClick={() => onRowClick?.(row, index)}
                  >
                    {columns.map((column) => (
                      <TableCell
                        key={column.key}
                        className={cn(
                          column.align === 'center' && 'text-center',
                          column.align === 'right' && 'text-right',
                        )}
                      >
                        {column.render
                          ? column.render(row[column.key], row, index)
                          : String(row[column.key] || '')}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {renderPagination()}
      </div>
    );
  },
);

DataTable.displayName = 'DataTable';

export { DataTable, dataTableVariants };
