import { Project } from '../types/Project';

interface FetchProjectsResponse {
   allProjects: Project[];
   totalNumProjects: number;
}

const API_URL = 'https://waterproject-davis-backend.azurewebsites.net/Water';

export const fetchProjects = async (
   pageSize: number,
   pageNumber: number,
   selectedCategories: string[]
): Promise<FetchProjectsResponse> => {
   try {
      const categoryParams = selectedCategories
         .map((category) => `projectTypes=${encodeURIComponent(category)}`)
         .join('&');
      const response = await fetch(
         `${API_URL}/GetProjects?pageSize=${pageSize}&pageNumber=${pageNumber}${categoryParams.length ? `&${categoryParams}` : ''}`,
         {
            credentials: 'include',
         }
      );

      if (!response.ok) {
         throw new Error('Failed to fetch projects.');
      }

      const data = await response.json();

      console.log(data);

      return data;
   } catch (e) {
      console.error('Error fetching projects: ', e);
      throw e;
   }
};

export const addProject = async (newProject: Project): Promise<Project> => {
   try {
      const response = await fetch(`${API_URL}/AddProject`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(newProject),
      });

      if (!response.ok) {
         throw new Error('Failed to add project');
      }

      return await response.json();
   } catch (e) {
      console.error('Error adding project: ' + e);
      throw e;
   }
};

export const updateProject = async (projectId: number, updatedProject: Project): Promise<Project> => {
   try {
      const response = await fetch(`${API_URL}/UpdateProject/update/${projectId}`, {
         method: 'PUT',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(updatedProject),
      });

      if (!response.ok) {
         throw new Error('Failed to update project');
      }

      return await response.json();
   } catch (e) {
      console.error('Error updating project: ' + e);
      throw e;
   }
};

export const deleteProject = async (projectId: number): Promise<void> => {
   try {
      const response = await fetch(`${API_URL}/DeleteProject/delete/${projectId}`, {
         method: 'DELETE',
      });

      if (!response.ok) {
         throw new Error('Failed to delete project.');
      }
   } catch (e) {
      console.error('Error deleting project: ' + e);
      throw e;
   }
};
