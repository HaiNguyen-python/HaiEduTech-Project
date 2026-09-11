/**
 * @file PtePlaceholder.tsx
 * @description Fallback for unknown /pte/:skill paths - every PTE skill module is
 *   now live, so unmatched slugs are redirected back to the PTE hub.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { Navigate } from "react-router-dom";

const PtePlaceholder = () => <Navigate to="/pte" replace />;

export default PtePlaceholder;
