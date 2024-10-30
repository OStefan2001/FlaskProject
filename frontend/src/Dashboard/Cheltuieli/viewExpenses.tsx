import React, { useEffect, useState } from 'react';
import ExpensesChart from './expensesChart';

interface ViewExpensesProps {
    show: boolean;
    onBack: () => void;
}

const ViewExpenses: React.FC<ViewExpensesProps> = ({ show, onBack }) => {
    const [selectedMonth, setSelectedMonth] = useState<string>('');
    const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
    const [expensesData, setExpensesData] = useState<{
        total_expenses: number;
        expenses_by_category: { [key: string]: { [description: string]: number } };
    } | null>(null);
    const [error, setError] = useState<string | null>(null);

    if (!show) return null;

    const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedMonth(event.target.value);
    };

    const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedYear(Number(event.target.value));
    };

    useEffect(() => {
        const handleFetchExpenses = async () => {
            if (selectedMonth && selectedYear) {
                try {
                    const response = await fetch(`/api/expenses/${selectedMonth}/${selectedYear}`);
                    if (!response.ok) {
                        throw new Error('Eroare la obținerea cheltuielilor!');
                    }
                    const data = await response.json();
                    setExpensesData(data);
                    console.log(data)
                    setError(null);
                } catch (err: any) {
                    setError(err.message);
                }
            }
        };

        handleFetchExpenses();
    }, [selectedMonth, selectedYear]);

    return (
        <div className="container mt-4">
            <div className='text-center mt-2'>
                <h3 className="text-center mb-4">Cheltuielile tale</h3>
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

            {expensesData ? (
                <>
                    <ExpensesChart expensesByCategory={expensesData.expenses_by_category} />
                    <h4 className="text-center mt-4">Total Cheltuieli: {expensesData.total_expenses} RON</h4>
                </>
            ) : (
                <>
                    {selectedMonth === '' ? (
                        <h2>Selectează luna și anul</h2>
                    ) : (
                        <h2>Nu există cheltuieli pentru această lună</h2>
                    )}
                </>
            )}
        </div>
    );
};

export default ViewExpenses;
