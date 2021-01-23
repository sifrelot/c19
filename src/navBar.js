import 'bootstrap/dist/css/bootstrap.min.css'
import PropTypes from 'prop-types'

const NavBar = ({connected, onClickLog}) => {
    let logButton
    if (connected)
        logButton = "Log Out"
    else
        logButton = "Log In"
    return (
        <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <a class="navbar-brand">COVID-19</a>
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="/">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/articles">Articles</a>
                        </li>
                    </ul>
                    
                    <button class="btn btn-outline-success" type="submit" onClick={onClickLog}>{logButton}</button>
                </div>
            </div>
        </nav>        
    )
}

NavBar.propTypes = {
    connected: PropTypes.bool.isRequired,
    onClickLog: PropTypes.func.isRequired,
}

export default NavBar