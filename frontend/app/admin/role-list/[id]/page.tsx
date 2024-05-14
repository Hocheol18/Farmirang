import ApproveAgency from "../../component/approve";

export default function AgencyDetail(props: any) {
  return (
    <>
      <div>
        <p className="text-green-300">접수아이디:</p>
        {props.params.id}
      </div>
      <ApproveAgency agencyId={Number(props.params.id)} />
    </>
  );
}
