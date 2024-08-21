import EditBio from "./EditBio";
import EditDiscography from "./EditDiscography";

function AdminDashboard() {
  return (
    <section className="mainContent">
      <h1>Admin Dashboard</h1>
      <EditBio />
      <EditDiscography />
    </section>
  );
}

export default AdminDashboard;
