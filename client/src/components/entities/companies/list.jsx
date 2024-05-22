import { Button } from "@/components/ui/button";
import { useGetCompaniesListQuery } from "@/features/api/companies";
import { Link } from "react-router-dom";

export function CompaniesList() {
  const { data:companies, error, isLoading } = useGetCompaniesListQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    throw error;
  }

  return (
    <ul className="company-list">
      {companies.map((company) => (
        <li key={company.id}>
          <h3>{company.name}</h3>
          <p>
            <strong>Website:</strong> <a href={company.website}>{company.website}</a>
          </p>
          <p>
            <strong>Industry:</strong> {company.industry}
          </p>
          <p>
            <strong>Size:</strong> {company.size}
          </p>
          <p>
            <strong>id:</strong> {company.id},
          </p>
          <Link to={`/companies/${company._id}`}>
          <Button variant="outline">Update Task</Button>
          </Link>

        </li>
      ))}
    </ul>
  );
}
