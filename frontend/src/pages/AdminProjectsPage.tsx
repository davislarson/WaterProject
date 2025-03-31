import { useEffect, useState } from 'react';
import { Project } from '../types/Project';
import { deleteProject, fetchProjects } from '../api/ProjectsAPI';
import Pagination from '../components/Pagination';
import NewProjectForm from '../components/NewProjectForm';
import EditProjectForm from '../components/EditProjectForm';

function AdminProjectPage() {
   const [projects, setProjects] = useState<Project[]>([]);
   const [pageSize, setPageSize] = useState<number>(10);
   const [pageNumber, setPageNumber] = useState<number>(1);
   const [totalPages, setTotalPages] = useState<number>(0);
   const [error, setError] = useState<string | null>(null);
   const [loading, setLoading] = useState<boolean>(true);
   const [showForm, setShowForm] = useState(false);
   const [editingProject, setEditingProject] = useState<Project | null>(null);

   useEffect(() => {
      const loadProjects = async () => {
         try {
            setLoading(true);
            const data = await fetchProjects(pageSize, pageNumber, []);
            setProjects(data.allProjects);
            setTotalPages(Math.ceil(data.totalNumProjects / pageSize));
         } catch (e) {
            setError((e as Error).message);
         } finally {
            setLoading(false);
         }
      };

      loadProjects();
   }, [pageSize, pageNumber]);

   async function handleDelete(projectId: number) {
      const confirmation = window.confirm('Are you sure you want to delete this project?');
      if (!confirmation) return;
      
      try{
         await deleteProject(projectId);
         setProjects(projects.filter((p) => p.projectId !== projectId));
      }
      catch (e)
      {
         alert('Failed to delete project. Please try again.');
      }
   }

   if (loading) return <p>Loading Projects...</p>;
   if (error) return <p className="text-red-500"> Error: {error}</p>;

   return (
      <>
         <h1>Admin - Projects</h1>

         {showForm ? (
            <NewProjectForm
               onSuccess={() => {
                  setShowForm(false);
                  fetchProjects(pageSize, pageNumber, []).then((data) => setProjects(data.allProjects));
               }}
               onCancel={() => setShowForm(false)}
            />
         ) : (
            <button className="btn btn-success mb-3" onClick={() => setShowForm(true)}>
               Add Project
            </button>
         )}

         {editingProject ? (
            <EditProjectForm
               project={editingProject}
               onSuccess={() => {
                  setEditingProject(null);
                  fetchProjects(pageSize, pageNumber, []).then((data) => setProjects(data.allProjects));
               }}
               onCancel={() => setEditingProject(null)}
            />
         ) : null}

         <table className="table table-striped table-bordered">
            <thead>
               <tr className="table-dark">
                  <th>ID</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Regional Program</th>
                  <th>Impact</th>
                  <th>Phase</th>
                  <th>Status</th>
                  <th>Actions</th>
               </tr>
            </thead>
            <tbody>
               {projects.map((p) => (
                  <tr key={p.projectId}>
                     <td>{p.projectId}</td>
                     <td>{p.projectName}</td>
                     <td>{p.projectType}</td>
                     <td>{p.projectRegionalProgram}</td>
                     <td>{p.projectImpact}</td>
                     <td>{p.projectPhase}</td>
                     <td>{p.projectFunctionalityStatus}</td>
                     <td>
                        <button
                           onClick={() => setEditingProject(p)}
                           className="btn btn-primary w-100 mb-2"
                        >
                           Edit
                        </button>
                        <button
                           onClick={() => handleDelete(p.projectId)}
                           className="btn btn-danger w-100"
                        >
                           Delete
                        </button>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
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

export default AdminProjectPage;
