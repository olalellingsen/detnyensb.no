import EditBio from "./EditBio";
import EditMusic from "./EditMusic";

function AdminDashboard() {
  return (
    <section className="mainContent">
      <h1>Rediger innhold</h1>
      <EditBio />
      <EditMusic />
    </section>
  );
}

export default AdminDashboard;
