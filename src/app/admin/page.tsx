
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Dashboard } from '@/components/admin/Dashboard';

function DashboardSkeleton() {
    return (
        <div className="space-y-6">
            <div className='flex gap-2'>
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-10 w-32" />
                <Skeleton className="h-10 w-28" />
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Skeleton className="h-28" />
                <Skeleton className="h-28" />
                <Skeleton className="h-28" />
            </div>
            <Skeleton className="h-[400px] w-full" />
        </div>
    );
}


export default function AdminDashboardPage() {
    return (
        <Suspense fallback={<DashboardSkeleton />}>
            <Dashboard />
        </Suspense>
    );
}
