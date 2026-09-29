import { Link } from "react-router-dom"

export default function Header(){
    return (
        <header>
            <h1><Link to="/" className="no-change">Movie Searcher</Link></h1>
            <nav>
                <ul>
                    <li><Link to="/" className="no-change">Home</Link></li>
                    <li><Link to="search" className="no-change">Search</Link></li>
                    <li><Link to="contact" className="no-change">Contact</Link></li>
                </ul>
            </nav>
        </header>
    )
}