import 'bootstrap/dist/css/bootstrap.min.css'
import PropTypes from 'prop-types'

const NavBar = ({connected, onClickLog}) => {
    let logButton
    if (connected)
        logButton = "Log Out"
    else
        logButton = "Log In"
    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <img src="icon.svg" width="40" height="40"/>
                <a class="navbar-brand me-auto" href="/">COVID-19</a>
                <button class="btn btn-outline-success" type="submit" onClick={onClickLog}>{logButton}</button>
            </div>
        </nav>
    )
}

NavBar.propTypes = {
    connected: PropTypes.bool.isRequired,
    onClickLog: PropTypes.func.isRequired,
}

export default NavBar