import { useState } from 'react';
import { Project } from '../types/Project';
import { updateProject } from '../api/ProjectsAPI';

interface NewProjectFormProps {
   project: Project;
   onSuccess: () => void;
   onCancel: () => void;
}

const NewProjectForm = ({ project, onSuccess, onCancel }: NewProjectFormProps) => {
   const [formData, setFormData] = useState<Project>({ ...project });

   // This will take the event and only change the value that was changed in the specific event
   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   // This will submit the form
   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      await updateProject(formData.projectId, formData);
      onSuccess();
   };

   return (
      <form onSubmit={handleSubmit}>
         <h2>Add New Project</h2>
         <div className="form-grid">
            <label>
               Project Name:
               <input type="text" name="projectName" value={formData.projectName} onChange={handleChange} />
            </label>
            <label>
               Project Type:
               <input type="text" name="projectType" value={formData.projectType} onChange={handleChange} />
            </label>
            <label>
               Regional Program:
               <input
                  type="text"
                  name="projectRegionalProgram"
                  value={formData.projectRegionalProgram}
                  onChange={handleChange}
               />
            </label>
            <label>
               Impact:
               <input type="number" name="projectImpact" value={formData.projectImpact} onChange={handleChange} />
            </label>
            <label>
               Project Phase:
               <input type="text" name="projectPhase" value={formData.projectPhase} onChange={handleChange} />
            </label>
            <label>
               Project Functionality Status:
               <input
                  type="text"
                  name="projectFunctionalityStatus"
                  value={formData.projectFunctionalityStatus}
                  onChange={handleChange}
               />
            </label>
            <button type="submit">Update Project</button>
            <button type="button" onClick={onCancel}>
               Cancel
            </button>
         </div>
      </form>
   );
};
export default NewProjectForm;
