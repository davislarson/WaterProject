import { useEffect, useState } from 'react';
import { Project } from '../types/Project';
import { useNavigate } from 'react-router-dom';
import { fetchProjects } from '../api/ProjectsAPI';
import Pagination from './Pagination';

function ProjectList(props: { selectedCategories: string[] }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const data = await fetchProjects(pageSize, pageNumber, props.selectedCategories);
        setProjects(data.allProjects);
        setTotalPages(Math.ceil(data.totalNumProjects / pageSize));
      } catch (e) {
        setError((e as Error).message);
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, [pageSize, pageNumber, props.selectedCategories]);

  if (loading) return <p>Loading Projects...</p>;
  if (error) return <p className="text-red-500"> Error: {error}</p>;
  return (
    <>
      {projects.map((p) => (
        <div id="projectCard" className="card" key={p.projectId}>
          <h3 className="card-title">{p.projectName}</h3>
          <div className="card-body">
            <ul className="list-unstyled">
              <li>
                <strong>Project Type:</strong> {p.projectType}
              </li>
              <li>
                <strong>Regional Program:</strong> {p.projectRegionalProgram}
              </li>
              <li>
                <strong>Impact:</strong> {p.projectImpact}
              </li>
              <li>
                <strong>Project Phase:</strong> {p.projectPhase}
              </li>
              <li>
                <strong>Project Status:</strong> {p.projectFunctionalityStatus}
              </li>
            </ul>

            <button className="btn btn-success" onClick={() => navigate(`/donate/${p.projectName}/${p.projectId}`)}>
              Donate
            </button>
          </div>
        </div>
      ))}
      <Pagination
        currentPage={pageNumber}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={setPageNumber}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          setPageNumber(1);
        }}
      />
    </>
  );
}

export default ProjectList;
