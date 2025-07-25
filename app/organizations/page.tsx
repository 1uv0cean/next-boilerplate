'use client';

import { Breadcrumb, BreadcrumbItem } from '@/components/ui/Breadcrumb';
import { Button } from '@/components/ui/Button';
import { DataTable, DataTableColumn } from '@/components/ui/DataTable';
import { DateRange, DateRangePicker } from '@/components/ui/DateRangePicker';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Sidebar, SidebarItem } from '@/components/ui/Sidebar';
import { Switch } from '@/components/ui/Switch';
import { Typography } from '@/components/ui/Typography';
import {
  BarChart,
  Building2,
  FileText,
  Filter,
  MoreHorizontal,
  Search,
  Settings,
  Users,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

// Mock data for organizations
const mockOrganizations = [
  {
    id: 'ORG001',
    name: '테크노벨리',
    nameEn: 'TechnoValley',
    businessNumber: '123-45-67890',
    phone: '02-1234-5678',
    address: '서울특별시 강남구 테헤란로 123',
    industry: '정보통신업',
    registrationDate: '2024-01-15',
    approved: true,
    withdrawn: false,
    manager: 'manager1',
  },
  {
    id: 'ORG002',
    name: '글로벌소프트',
    nameEn: 'GlobalSoft',
    businessNumber: '234-56-78901',
    phone: '02-2345-6789',
    address: '서울특별시 서초구 서초대로 456',
    industry: '소프트웨어 개발업',
    registrationDate: '2024-01-20',
    approved: false,
    withdrawn: false,
    manager: 'manager2',
  },
  {
    id: 'ORG003',
    name: '이노베이션랩',
    nameEn: 'Innovation Lab',
    businessNumber: '345-67-89012',
    phone: '02-3456-7890',
    address: '서울특별시 송파구 올림픽로 789',
    industry: '연구개발업',
    registrationDate: '2024-02-01',
    approved: true,
    withdrawn: true,
    manager: 'manager1',
  },
  {
    id: 'ORG004',
    name: '스마트팩토리',
    nameEn: 'SmartFactory',
    businessNumber: '456-78-90123',
    phone: '031-1234-5678',
    address: '경기도 성남시 분당구 판교로 101',
    industry: '제조업',
    registrationDate: '2024-02-15',
    approved: true,
    withdrawn: false,
    manager: 'manager3',
  },
  {
    id: 'ORG005',
    name: '디지털헬스케어',
    nameEn: 'Digital Healthcare',
    businessNumber: '567-89-01234',
    phone: '02-5678-9012',
    address: '서울특별시 마포구 월드컵북로 456',
    industry: '의료업',
    registrationDate: '2024-03-01',
    approved: false,
    withdrawn: false,
    manager: 'manager2',
  },
  {
    id: 'ORG006',
    name: '에코에너지',
    nameEn: 'EcoEnergy',
    businessNumber: '678-90-12345',
    phone: '032-2345-6789',
    address: '인천광역시 연수구 컨벤시아대로 789',
    industry: '신재생에너지업',
    registrationDate: '2024-03-10',
    approved: true,
    withdrawn: false,
    manager: 'manager1',
  },
  {
    id: 'ORG007',
    name: '핀테크솔루션',
    nameEn: 'FinTech Solution',
    businessNumber: '789-01-23456',
    phone: '02-7890-1234',
    address: '서울특별시 중구 명동길 321',
    industry: '금융업',
    registrationDate: '2024-03-20',
    approved: false,
    withdrawn: false,
    manager: 'manager3',
  },
  {
    id: 'ORG008',
    name: '바이오메드',
    nameEn: 'BioMed',
    businessNumber: '890-12-34567',
    phone: '042-3456-7890',
    address: '대전광역시 유성구 대학로 654',
    industry: '바이오산업',
    registrationDate: '2024-04-01',
    approved: true,
    withdrawn: false,
    manager: 'manager2',
  },
  {
    id: 'ORG009',
    name: '클라우드컴퓨팅',
    nameEn: 'Cloud Computing',
    businessNumber: '901-23-45678',
    phone: '051-4567-8901',
    address: '부산광역시 해운대구 센텀중앙로 987',
    industry: '클라우드서비스업',
    registrationDate: '2024-04-15',
    approved: false,
    withdrawn: true,
    manager: 'manager1',
  },
  {
    id: 'ORG010',
    name: '로보틱스코리아',
    nameEn: 'Robotics Korea',
    businessNumber: '012-34-56789',
    phone: '053-5678-9012',
    address: '대구광역시 수성구 알파시티1로 147',
    industry: '로봇제조업',
    registrationDate: '2024-05-01',
    approved: true,
    withdrawn: false,
    manager: 'manager3',
  },
  {
    id: 'ORG011',
    name: 'AI리서치',
    nameEn: 'AI Research',
    businessNumber: '111-22-33444',
    phone: '02-1111-2222',
    address: '서울특별시 관악구 관악로 258',
    industry: 'AI개발업',
    registrationDate: '2023-12-01',
    approved: true,
    withdrawn: false,
    manager: 'manager2',
  },
  {
    id: 'ORG012',
    name: '모빌리티플랫폼',
    nameEn: 'Mobility Platform',
    businessNumber: '222-33-44555',
    phone: '062-2222-3333',
    address: '광주광역시 북구 첨단과기로 369',
    industry: '모빌리티서비스업',
    registrationDate: '2023-11-15',
    approved: false,
    withdrawn: false,
    manager: 'manager1',
  },
];

// Sidebar navigation items
const sidebarItems: SidebarItem[] = [
  {
    id: 'dashboard',
    label: '대시보드',
    icon: <BarChart className="h-4 w-4" />,
    href: '/dashboard',
  },
  {
    id: 'organizations',
    label: '기관 관리',
    icon: <Building2 className="h-4 w-4" />,
    children: [
      {
        id: 'org-list',
        label: '기관 목록',
        href: '/organizations',
      },
      {
        id: 'org-approval',
        label: '승인 관리',
        href: '/organizations/approval',
      },
      {
        id: 'org-reports',
        label: '기관 보고서',
        href: '/organizations/reports',
      },
    ],
  },
  {
    id: 'users',
    label: '사용자 관리',
    icon: <Users className="h-4 w-4" />,
    children: [
      {
        id: 'user-list',
        label: '사용자 목록',
        href: '/users',
      },
      {
        id: 'user-roles',
        label: '권한 관리',
        href: '/users/roles',
      },
      {
        id: 'user-activity',
        label: '활동 로그',
        href: '/users/activity',
      },
    ],
  },
  {
    id: 'settings',
    label: '시스템 설정',
    icon: <Settings className="h-4 w-4" />,
    children: [
      {
        id: 'general-settings',
        label: '일반 설정',
        href: '/settings/general',
      },
      {
        id: 'notification-settings',
        label: '알림 설정',
        href: '/settings/notifications',
      },
      {
        id: 'security-settings',
        label: '보안 설정',
        href: '/settings/security',
      },
    ],
  },
  {
    id: 'reports',
    label: '보고서',
    icon: <FileText className="h-4 w-4" />,
    children: [
      {
        id: 'monthly-report',
        label: '월간 보고서',
        href: '/reports/monthly',
      },
      {
        id: 'usage-stats',
        label: '사용 통계',
        href: '/reports/usage',
      },
      {
        id: 'export-data',
        label: '데이터 내보내기',
        href: '/reports/export',
      },
    ],
  },
];

// Breadcrumb items
const breadcrumbItems: BreadcrumbItem[] = [
  { label: '홈', href: '/' },
  { label: '기관 관리', href: '/organizations' },
  { label: '기관 목록' },
];

// Select options
const approvalOptions = [
  { value: 'all', label: '전체' },
  { value: 'approved', label: '승인' },
  { value: 'pending', label: '대기' },
];

const managerOptions = [
  { value: 'all', label: '전체' },
  { value: 'manager1', label: '관리자1' },
  { value: 'manager2', label: '관리자2' },
  { value: 'manager3', label: '관리자3' },
];

export default function OrganizationsPage() {
  const pathname = usePathname();
  const [dateRange, setDateRange] = useState<DateRange>({ startDate: null, endDate: null });
  const [searchName, setSearchName] = useState('');
  const [approvalFilter, setApprovalFilter] = useState('all');
  const [managerFilter, setManagerFilter] = useState('all');

  // Determine active item based on current pathname
  const getActiveItemFromPath = () => {
    switch (pathname) {
      case '/organizations':
        return 'org-list';
      case '/organizations/approval':
        return 'org-approval';
      case '/organizations/reports':
        return 'org-reports';
      default:
        return 'org-list';
    }
  };

  // Data table columns
  const columns: DataTableColumn[] = [
    {
      key: 'id',
      title: 'ID',
      width: '80px',
      sortable: true,
    },
    {
      key: 'name',
      title: '기관명',
      width: '150px',
      sortable: true,
      render: (value, row) => (
        <div>
          <div className="font-medium">{row.name}</div>
          <div className="text-muted-foreground text-xs">{row.nameEn}</div>
        </div>
      ),
    },
    {
      key: 'businessNumber',
      title: '사업자등록번호',
      width: '140px',
      sortable: true,
    },
    {
      key: 'phone',
      title: '전화번호',
      width: '120px',
    },
    {
      key: 'address',
      title: '주소',
      width: '200px',
      render: (value) => (
        <div className="max-w-[200px] truncate" title={value}>
          {value}
        </div>
      ),
    },
    {
      key: 'industry',
      title: '업종',
      width: '120px',
      sortable: true,
    },
    {
      key: 'registrationDate',
      title: '가입일자',
      width: '100px',
      sortable: true,
    },
    {
      key: 'approved',
      title: '승인 여부',
      width: '100px',
      align: 'center' as const,
      render: (value, row, index) => (
        <Switch
          checked={value}
          onCheckedChange={(checked) => {
            // Handle approval toggle
            console.log(`Toggle approval for ${row.id}:`, checked);
          }}
          customColor={value ? '#22c55e' : undefined}
        />
      ),
    },
    {
      key: 'withdrawn',
      title: '탈퇴 여부',
      width: '100px',
      align: 'center' as const,
      render: (value, row, index) => (
        <Switch
          checked={value}
          onCheckedChange={(checked) => {
            // Handle withdrawal toggle
            console.log(`Toggle withdrawal for ${row.id}:`, checked);
          }}
          customColor={value ? '#ef4444' : undefined}
        />
      ),
    },
    {
      key: 'manager',
      title: '담당자',
      width: '120px',
      render: (value, row, index) => (
        <Select
          value={value}
          options={managerOptions.filter((opt) => opt.value !== 'all')}
          onValueChange={(newValue) => {
            // Handle manager change
            console.log(`Change manager for ${row.id}:`, newValue);
          }}
          size="sm"
        />
      ),
    },
    {
      key: 'actions',
      title: '액션',
      width: '80px',
      align: 'center' as const,
      render: (value, row, index) => (
        <Button variant="ghost" size="sm">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      ),
    },
  ];

  // Filter data based on current filters
  const filteredData = mockOrganizations.filter((org) => {
    // Name search filter
    if (
      searchName &&
      !org.name.toLowerCase().includes(searchName.toLowerCase()) &&
      !org.nameEn.toLowerCase().includes(searchName.toLowerCase())
    ) {
      return false;
    }

    // Approval status filter
    if (approvalFilter !== 'all') {
      if (approvalFilter === 'approved' && !org.approved) return false;
      if (approvalFilter === 'pending' && org.approved) return false;
    }

    // Manager filter
    if (managerFilter !== 'all' && org.manager !== managerFilter) {
      return false;
    }

    // Date range filter
    if (dateRange.startDate || dateRange.endDate) {
      const registrationDate = new Date(org.registrationDate);

      if (dateRange.startDate) {
        const startDate = new Date(dateRange.startDate);
        startDate.setHours(0, 0, 0, 0);
        if (registrationDate < startDate) return false;
      }

      if (dateRange.endDate) {
        const endDate = new Date(dateRange.endDate);
        endDate.setHours(23, 59, 59, 999);
        if (registrationDate > endDate) return false;
      }
    }

    return true;
  });

  return (
    <div className="bg-background flex h-screen">
      {/* Sidebar */}
      <Sidebar
        items={sidebarItems}
        defaultActiveItem={getActiveItemFromPath()}
        header={
          <div className="flex items-center space-x-2">
            <Building2 className="h-6 w-6" />
            <span className="font-semibold">관리 시스템</span>
          </div>
        }
        footer={
          <div className="flex items-center space-x-2">
            <Typography size="xs" weight="semibold" align="right">
              COPYRIGHT © 2025 HMM OCEAN SERVICE All rights Reserved
            </Typography>
          </div>
        }
      />

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Breadcrumbs */}
        <div className="border-border border-b p-4">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-6">
          <div className="space-y-6">
            {/* Page Header */}
            <div>
              <h1 className="text-2xl font-bold tracking-tight">기관 목록</h1>
              <p className="text-muted-foreground">
                등록된 기관들을 조회하고 승인 상태를 관리할 수 있습니다.
              </p>
            </div>

            {/* Filters */}
            <div className="bg-card border-border rounded-lg border p-4">
              <div className="mb-4 flex items-center space-x-2">
                <Filter className="h-4 w-4" />
                <h3 className="font-medium">필터</h3>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                <DateRangePicker
                  label="가입일자"
                  value={dateRange}
                  onDateRangeChange={setDateRange}
                  placeholder="기간 선택"
                />

                <Input
                  label="한글/영문 이름"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  placeholder="기관명 검색"
                  leftIcon={<Search className="h-4 w-4" />}
                  clearable
                />

                <Select
                  label="승인 여부"
                  value={approvalFilter}
                  options={approvalOptions}
                  onValueChange={setApprovalFilter}
                />

                <Select
                  label="담당자"
                  value={managerFilter}
                  options={managerOptions}
                  onValueChange={setManagerFilter}
                />
              </div>

              <div className="mt-4 flex justify-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setDateRange({ startDate: null, endDate: null });
                    setSearchName('');
                    setApprovalFilter('all');
                    setManagerFilter('all');
                  }}
                >
                  필터 초기화
                </Button>
              </div>
            </div>

            {/* Data Table */}
            <div className="bg-card border-border rounded-lg border p-4">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-medium">기관 목록</h3>
                <div className="text-muted-foreground text-sm">총 {filteredData.length}개 기관</div>
              </div>

              <DataTable
                data={filteredData}
                columns={columns}
                filterMode="none"
                displayMode="pagination"
                pageSize={10}
                emptyMessage="조건에 맞는 기관이 없습니다."
                onRowClick={(row) => {
                  console.log('Row clicked:', row);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
