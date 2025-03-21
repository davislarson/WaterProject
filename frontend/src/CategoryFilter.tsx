import { useEffect, useState } from 'react';
import './css/CategoryFilter.css';

export default function CategoryFilter( props: { setSelections: (selectedCategories: string[]) => void; selectedCategories: string[] }) {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`https://localhost:5000/Water/GetProjectTypes`);
        const data = await response.json();

        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  function handleCheckboxChange({ target }: { target: HTMLInputElement }) {
   const updateCategories = props.selectedCategories.includes(target.value)
     ? props.selectedCategories.filter((x) => x !== target.value)
     : [...props.selectedCategories, target.value];
   props.setSelections(updateCategories);
 }

  return (
    <div className="category-filter">
      <h5>Project Types</h5>
      <div className="category-list">
        {categories.map((category) => (
          <div key={category} className="category-item">
            <input type="checkbox" id={category} name={category} value={category} onChange={handleCheckboxChange} />
            <label htmlFor={category}>{category}</label>
          </div>
        ))}
      </div>
    </div>
  );
}
