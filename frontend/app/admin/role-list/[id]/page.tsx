import ApproveAgency from "../../component/approve";

export default function AgencyDetail(props: any) {
  return (
    <>
      <div>{props.params.id}</div>
      <ApproveAgency />
    </>
  );
}
