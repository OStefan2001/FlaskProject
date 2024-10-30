import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend); // Înregistrează elementele necesare

interface IncomeChartProps {
    incomeByCategory: { [key: string]: number };
}

const IncomeChart: React.FC<IncomeChartProps> = ({ incomeByCategory }) => {
    const data = {
        labels: Object.keys(incomeByCategory),
        datasets: [
            {
                data: Object.values(incomeByCategory),
                backgroundColor: [
                    '#36A2EB', 
                    '#FF6384', 
                    '#FFCE56', 
                    '#FF9F40', 
                    '#4BC0C0', 
                    '#9966FF', 
                    '#FF9F40'  
                ],
            },
        ],
    };
    return (
        <div className="container mt-4">
            <h3 className="text-center">Distribuția Veniturilor pe Categorii</h3>
            <div className="d-flex justify-content-center">
                <div style={{ maxWidth: '500px', width: '100%' }}>
                    <Pie data={data} />
                </div>
            </div>
        </div>
    );
};

export default IncomeChart;
