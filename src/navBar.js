import 'bootstrap/dist/css/bootstrap.min.css'
import PropTypes from 'prop-types'
import './navBar.css'

const NavBar = ({onClickLog, user}) => {
    return (
        <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <div className="collapse navbar-collapse">
                    <div className="navbar-brand">COVID-19</div>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/articles">Articles</a>
                        </li>
                    </ul>
                    {user ? <div className="d-flex flex-row justify-content-center" style={{alignItems:'center'}}>
                        <div className="name">Connected as {user.displayName}</div>
                        <div><div className="btn btn-outline-success" type="submit" onClick={onClickLog}>Log Out</div></div>
                        </div> : <div>
                        <div className="btn btn-outline-success" type="submit" onClick={onClickLog}>Login with Google</div>
                    </div> }
                    
                </div>
            </div>
        </nav>        
    )
}

NavBar.propTypes = {
    onClickLog: PropTypes.func.isRequired,
}

export default NavBar