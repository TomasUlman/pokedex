/**
 * Logo component to display the "PokéDex" logo with each letter wrapped in a span.
 * @returns {JSX.Element} The rendered logo component.
 */
export default function Logo() {
    return (
        <div className="logo">
            {"PokéDex".split("").map((letter, index) => (
                <span key={index} className={`char-${index}`}>
                    {letter}
                </span>
            ))}
        </div>
    );
}
