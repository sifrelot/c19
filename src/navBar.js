import 'bootstrap/dist/css/bootstrap.min.css'
import PropTypes from 'prop-types'
import './navBar.css'

const NavBar = ({onClickLog, user}) => {
    return (
        <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <div class="collapse navbar-collapse">
                    <div class="navbar-brand">COVID-19</div>
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="/">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/articles">Articles</a>
                        </li>
                    </ul>
                    {user ? <div class="d-flex flex-row justify-content-center" style={{alignItems:'center'}}>
                        <div class="name">Connected as {user.displayName}</div>
                        <div><div class="btn btn-outline-success" type="submit" onClick={onClickLog}>Log Out</div></div>
                        </div> : <div>
                        <div class="btn btn-outline-success" type="submit" onClick={onClickLog}>Login with Google</div>
                    </div> }
                    
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