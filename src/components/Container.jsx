import { Link } from "react-router-dom"

export default function Container({ children }) {
  return (
    <div className="container">
      <h1 className="text-center mb-4">Web Tugas</h1>
      <div className="row">{children}</div>
      <div className="row">
        <div className="col text-center">
          <Link to="/add-task" className="btn btn-success">
            Tambah Tugas
          </Link>
        </div>
      </div>
    </div>
  );
}
