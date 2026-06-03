import AdminHeader from "../../_componets/Header";
import Sidebar from "../../_componets/Sidebar";

export default function CMSLayout({ children }) {
  return (
    <div className="flex h-screen w-full relative">
      <Sidebar />

      <div className="w-full overflow-y-auto">
        <AdminHeader />
        <main className="p-3">{children}</main>
      </div>
    </div>
  );
}
