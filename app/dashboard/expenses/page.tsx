import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/expenses/table';
import { lusitana } from '@/app/ui/fonts';
import { ExpensesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchInvoicesPages } from '@/app/lib/data';
import { Metadata } from 'next';
import { useState }

export const metadata: Metadata = {
    title: 'Expenses',
};

const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
];

export default async function Page({
    searchParams,
}: {
    searchParams?: {
        query?: string;
        page?: string;
    };
})
const query = searchParams?.query || '';
const currentPage = Number(searchParams?.page) || 1;

const totalPages = await fetchInvoicesPages(query)

const [selectedMonth, setSelectedMonth] = useState<string | null>(null)
const [showMonthDropdown, setShowMonthDropdown] = useState(false)

const handleToggleDropdown = () => {
    setShowMonthDropdown((prev) => !prev)
}

const handleMonthSelect = (month: string) => {
    setSelectedMonth(month)
    setShowMonthDropdown(false)
}

const filteredInvoices = invoices.filter((invoice) => {
    if (!selectedMonth) {
        return true
    }
    const invoiceMonth = new Date(invoice.date).toLocaleString('en-US', { month: 'long' });
    return invoiceMonth === selectedMonth;
});

return (
    <div className="w-full">
        <div className="flex w-full items-center justify-between">
            <h1 className={`${lusitana.className} text-2xl`}>Expenses</h1>
        </div>
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
            <Search placeholder="Search Expenses..." />
        </div>
        <Suspense key={query + currentPage} fallback={<ExpensesTableSkeleton />}>
            <Table query={query} currentPage={currentPage} />
        </Suspense>
        <div className="mt-5 flex w-full justify-center">
            <Pagination totalPages={totalPages} />
        </div>
    </div>
);
}