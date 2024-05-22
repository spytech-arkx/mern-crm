import { useEditCompanyMutation, useGetCompaniesListQuery } from "@/features/api/companies";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


export const CompanyFormEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [company, setCompany] = useState({
      name: '',
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setCompany({ ...company, [name]: value });
    };

    const { cpnybeingedited } = useGetCompaniesListQuery(undefined, {
        selectFromResult: ({ data }) => ({
            cpnybeingedited: data.find((company) => company._id === id),
          }),
    })

    const [editCompany, { isLoading }] = useEditCompanyMutation()
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if(!isLoading) {
        await editCompany({id, company});
        navigate('/companies');
      }
    };

    const { name } = cpnybeingedited;

    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            placeholder={name}
            value={company.name}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Edit Company</button>
      </form>
    );
  };