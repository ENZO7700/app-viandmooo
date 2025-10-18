
import { Toaster } from "@/components/ui/toaster";
import { DashboardHeader } from "@/components/admin/DashboardHeader";
import { DashboardNav } from "@/components/admin/DashboardNav";
import { AdminProviders } from "@/components/admin/AdminProviders";
import { FirebaseProvider } from "@/firebase/provider";
import { initializeFirebase } from "@/firebase";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { firebaseApp, firestore, auth } = initializeFirebase();

  return (
    <FirebaseProvider firebaseApp={firebaseApp} auth={auth} firestore={firestore}>
        <AdminProviders>
          <div className="flex min-h-screen w-full flex-col bg-background text-foreground">
            <DashboardHeader />
            <div className="flex flex-1">
              <DashboardNav />
              <main className="flex-1 p-4 md:p-6 lg:p-8">
                {children}
              </main>
            </div>
            <Toaster />
          </div>
        </AdminProviders>
    </FirebaseProvider>
  );
}
