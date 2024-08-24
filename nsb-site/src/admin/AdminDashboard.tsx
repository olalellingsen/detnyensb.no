import EditBio from "./EditBio";
import EditMusic from "./EditMusic";
import EditConcerts from "./EditConcerts";

function AdminDashboard() {
  return (
    <section className="grid gap-10">
      <h1>Rediger innhold</h1>
      <EditConcerts />
      <EditBio />
      <EditMusic />
    </section>
  );
}

export default AdminDashboard;
