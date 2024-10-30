interface raportProps {
    showR: boolean;
    onBackR: () => void;
}

const RaportLunar: React.FC<raportProps> = ({ showR, onBackR }) => {
    if (!showR) return null;
    return (
        <>
            <div className="text-center mt-2">
                <h2>Aici vor fi rapoartele</h2>
                <button className="btn btn-secondary mb-3" onClick={onBackR}>
                    Înapoi
                </button>
            </div>
        </>
    );
}
export default RaportLunar;