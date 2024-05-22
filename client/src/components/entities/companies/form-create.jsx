import { useCreateCompanyMutation } from "@/features/api/companies";
import { useState } from "react";


export const CompanyForm = () => {
    const [company, setCompany] = useState({
      name: '',
      website: '',
      industry: '',
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setCompany({ ...company, [name]: value });
    };

    const [createCompany, { isLoading, error }] = useCreateCompanyMutation()
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if(!isLoading) {
        await createCompany(company);
        setCompany({
          name: '',
          website: '',
          industry: '',
        });
      }
    };

    if(error) throw error;
  
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={company.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Website:</label>
          <input
            type="url"
            name="website"
            value={company.website}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Industry:</label>
          <input
            type="text"
            name="industry"
            value={company.industry}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add Company</button>
      </form>
    );
  };