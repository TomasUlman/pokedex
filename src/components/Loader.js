/**
 * Loader component to display a loading spinner.
 * @returns {JSX.Element} The rendered loader component.
 */
export default function Loader() {
    return (
        <div className='spinner-container'>
            <div className='spinner'></div>
        </div>
    );
}