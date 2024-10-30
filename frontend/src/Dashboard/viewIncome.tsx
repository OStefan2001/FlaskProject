import React, { useEffect, useState } from 'react';
import IncomeChart from './incomeChart'; // Importă componenta IncomeChart

interface ViewIncomeProps {
    show: boolean;
    onBack: () => void;
}

const ViewIncome: React.FC<ViewIncomeProps> = ({ show, onBack }) => {
    const [selectedMonth, setSelectedMonth] = useState<string>('');
    const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
    const [incomeData, setIncomeData] = useState<{ total_income: number; income_by_category: Record<string, number> } | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [totalIncome, setTotalIncome] = useState<boolean>(false);
    if (!show) return null;

    const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedMonth(event.target.value);
    };

    const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedYear(Number(event.target.value));
    };
    useEffect(() => {
        const handleFetchIncome = async () => {
            if (selectedMonth && selectedYear) {
                try {
                    const response = await fetch(`/api/income/${selectedMonth}/${selectedYear}`);
                    if (!response.ok) {
                        throw new Error('Eroare la obținerea veniturilor!');
                    }
                    const data = await response.json();
                    setIncomeData(data);
                    setTotalIncome(data.total_income);
                    setError(null);
                } catch (err: any) {
                    setError(err.message);
                }
            }
        };

        handleFetchIncome();
    }, [selectedMonth, selectedYear]);



    return (
        <div className="container mt-4">
            <div className='text-center mt-2'>
                <h3 className="text-center mb-4">Aceasta este venitul tău</h3>
                <button className="btn btn-secondary mb-3" onClick={onBack}>
                    Înapoi
                </button>
            </div>
            <div className="form-group">
                <label htmlFor="month-selector">Selectează luna:</label>
                <select
                    id="month-selector"
                    className="form-control"
                    value={selectedMonth}
                    onChange={handleMonthChange}
                >
                    <option value="">Alege o lună</option>
                    <option value="1">Ianuarie</option>
                    <option value="2">Februarie</option>
                    <option value="3">Martie</option>
                    <option value="4">Aprilie</option>
                    <option value="5">Mai</option>
                    <option value="6">Iunie</option>
                    <option value="7">Iulie</option>
                    <option value="8">August</option>
                    <option value="9">Septembrie</option>
                    <option value="10">Octombrie</option>
                    <option value="11">Noiembrie</option>
                    <option value="12">Decembrie</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="year-selector">Selectează anul:</label>
                <select
                    id="year-selector"
                    className="form-control"
                    value={selectedYear}
                    onChange={handleYearChange}
                >
                    {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>
            </div>
            {error && <div className="alert alert-danger mt-3">{error}</div>}
            {totalIncome ? (
                <>
                    {incomeData && (
                        <div className="mt-4">
                            <IncomeChart incomeByCategory={incomeData.income_by_category} />
                            <h4 className="text-center mt-4">Total Venit: {incomeData.total_income} RON</h4>
                        </div>
                    )}
                </>) : (
                <> {selectedMonth == '' ? (<><h2>Select month and year first</h2></>) : (<><h2>No income for this month</h2></>)}

                </>
            )}
        </div>
    );
};

export default ViewIncome;
