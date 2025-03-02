import { Link } from 'react-router-dom';

function BreadcrumbNav({ params }) {
    return (
        <nav className="flex py-3 px-5 text-text-secondary bg-background-tertiary rounded-lg mb-5">
            <Link to="/" className="hover:text-accent-primary transition-colors duration-300">Home</Link>
            <span className="mx-2">/</span>
            <Link to={`/categories/${params.category}`} className="hover:text-accent-primary transition-colors duration-300">{params.category}</Link>
            <span className="mx-2">/</span>
            <span className="text-text-muted">{params.title}</span>
        </nav>
    )
}

export default BreadcrumbNav;