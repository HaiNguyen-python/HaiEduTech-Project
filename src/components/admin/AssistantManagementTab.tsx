import AssistantUserTable from "./AssistantUserTable";
import PayrollSummary from "./PayrollSummary";
import ReceivedReportsTimeline from "./ReceivedReportsTimeline";

// Wraps all three super-admin sections for assistant management.
const AssistantManagementTab = () => (
  <div className="space-y-6">
    <AssistantUserTable />
    <PayrollSummary />
    <ReceivedReportsTimeline />
  </div>
);

export default AssistantManagementTab;
