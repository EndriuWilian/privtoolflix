export default function Buscando({ terciary = false }) {
    return (
        <div
            className={`flex items-center justify-center h-[500] h-full
                ${terciary ? "bg-terciary dark:bg-terciary-dark" : "bg-primary dark:bg-primary-dark"}
            `}
        >
            <div className="animate-spin rounded-full h-36 w-36 border-b-12 border-secondary dark:border-secondary-dark"></div>
        </div>
    );
}
