import { useEffect, useState } from 'react';

export default function CategoryFilter() {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
         const response = await fetch('https://localhost:5000/Water/GetProjectTypes');
         const data = await response.json();

         setCategories(data);
      }
      catch (error) {
         console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
         <div>
         <h5>Project Types</h5>
         {categories.map((category) => (
            <div key={category}>
               <input type="checkbox" id={category} name={category} value={category} />
               <label htmlFor={category}>{category}</label>
            </div>
         ))}
         <button type="button" onClick={() => console.log('Filter applied')}>
            Apply Filter
         </button>
         <button type="button" onClick={() => console.log('Filter cleared')}>
            Clear Filter
         </button>
      </div>
  )

}
