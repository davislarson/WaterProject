import { useEffect, useState } from 'react';
import { Project } from '../types/Project';
import { useNavigate } from 'react-router-dom';

function ProjectList(props: { selectedCategories: string[] }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      const categoryParams  = props.selectedCategories.map((category) => `projectTypes=${encodeURIComponent(category)}`).join('&');
      const response = await fetch(
        `https://localhost:5000/Water/GetProjects?pageSize=${pageSize}&pageNumber=${pageNumber}${(categoryParams.length) ? `&${categoryParams}` : ''}`,
        {
          credentials: 'include'
        }
      );
      const data = await response.json();
      setProjects(data.allProjects);
      setTotalPages(Math.ceil(data.totalNumProjects / pageSize));
    };
    fetchProjects();
  }, [pageSize, pageNumber, props.selectedCategories]);

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

            <button className='btn btn-success' onClick={() => navigate(`/donate/${p.projectName}/${p.projectId}`)}>Donate</button>
          </div>
        </div>
      ))}
      <br />
      <div>
        <button onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))} disabled={pageNumber === 1}>
          Previous
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => setPageNumber(index + 1)}
            className={pageNumber === index + 1 ? 'active' : ''}
            disabled={pageNumber === index + 1}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => setPageNumber((prev) => Math.min(prev + 1, totalPages))}
          disabled={pageNumber === totalPages}
        >
          Next
        </button>
      </div>
      <br />
      <label>Results Per Page:</label>
      <select
        value={pageSize}
        onChange={(e) => {
          setPageSize(Number(e.target.value));
          setPageNumber(1); // Reset to first page on page size change
        }}
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
      </select>
    </>
  );
}

export default ProjectList;
