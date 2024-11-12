import { useState } from "react";
import { Table, Col, Row } from 'react-bootstrap';
import './dashboard.css';

interface raportProps {
    showR: boolean;
    onBackR: () => void;
}

const RaportLunar: React.FC<raportProps> = ({ showR, onBackR }) => {
    const [selectedMonth, setSelectedMonth] = useState<string>('');
    const [selectedYear, setSelectedYear] = useState<number>(2024);
    const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedMonth(event.target.value);
    };

    const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedYear(Number(event.target.value));
    };
    if (!showR) return null;
    return (
        <>
            <div className="mt-2">
                <h2>Monthly Reports</h2>
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
                        value={selectedYear ? selectedYear : 2024}
                        onChange={handleYearChange}
                    >
                        {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </div>
                <div className="text-center">
                    <Row className="justify-content-center">
                        <Col md={12}>
                            <Table striped bordered hover className="mt-3 equal-width-table">
                                <thead>
                                    <tr>
                                        <th className="text-center">Venit</th>
                                        <th className="text-center">Cheltuieli</th>
                                        <th className="text-center">Balanta</th>
                                    </tr>
                                </thead>
                            </Table>
                        </Col>
                    </Row>
                </div>
                <div className="text-center">
                    <button className="btn btn-secondary mt-3" onClick={onBackR}>
                        Înapoi
                    </button>
                </div>

            </div>
        </>
    );
}
export default RaportLunar;