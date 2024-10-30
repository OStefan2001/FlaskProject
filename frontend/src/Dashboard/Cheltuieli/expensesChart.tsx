import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface IncomeChartProps {
    expensesByCategory: { [key: string]: { [description: string]: number } };
}

const ExpensesChart: React.FC<IncomeChartProps> = ({ expensesByCategory }) => {
    const categories = Object.entries(expensesByCategory);

    return (
        <div className="container mt-4">
            <h3 className="text-center">Distribuția Cheltuielilor pe Categorii</h3>
            <div className="row">
                {categories.map(([category, subcategories]) => {
                    const data = {
                        labels: Object.keys(subcategories),
                        datasets: [
                            {
                                label: category,
                                data: Object.values(subcategories),
                                backgroundColor: [
                                    '#36A2EB',
                                    '#FF6384',
                                    '#FFCE56',
                                    '#FF9F40',
                                    '#4BC0C0',
                                    '#9966FF',
                                    '#FF9F40',
                                ],
                                barThickness: 40, 
                                maxBarThickness: 50, 
                            },
                        ],
                    };

                    return (
                        <div key={category} className="col-md-6" style={{ marginBottom: '20px' }}>
                            <Bar data={data} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ExpensesChart;
