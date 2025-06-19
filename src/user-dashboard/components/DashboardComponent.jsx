import TaxFilingCard from "./TaxFilingCard";

export default function DashboardComponent({ company, isCompany, stats }) {
    return (
        <>
            <TaxFilingCard company={company} isCompany={isCompany} stats={stats} />
        </>
    )
}