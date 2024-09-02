import { OrganizationList } from "@clerk/nextjs";

const CreateOrganisationPage = () => (
  <OrganizationList
    hidePersonal
    afterSelectPersonalUrl="/organization/:id"
    afterCreateOrganizationUrl="/organization/:id"
  />
);

export default CreateOrganisationPage;